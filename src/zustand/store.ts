import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {
  createProfile as apiCreateProfile,
  getProfile,
  checkProfile,
  updateProfile,
  deleteProfile,
} from './api'
import {
  UserPicsType,
  Location,
  ProfilePreferences,
} from '../types/FirstProfile'
import { clearLocalStorage } from 'utils/localStorage'
import { usePotentialFriendsStore } from './friendsStore'
import axios, { AxiosResponse } from 'axios'
import { MAX_PROFILE_PHOTOS } from 'data/constants'
import { PHOTO_ENDPOINTS } from 'actions/endpoints'
import { getAuthHeaders } from 'actions/authHeaders'
import { ApiErrorResponse } from 'types/UserProfileData'

const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/api`

interface Profile {
  name: string
  dateOfBirth: string
  location: Location
  photos: string[]
  gender: string
  reasons: string[]
  friendsAgeMin?: number
  friendsAgeMax?: number
  friendsDistance?: number
  preferences?: ProfilePreferences
  _id?: string
}

interface PhotoFields {
  tempPhotos: UserPicsType[]
  cloudUrls: string[]
  setTempPhotos: (photos: UserPicsType[]) => void
  clearTempPhotos: () => void
  addTempPhoto: (photo: UserPicsType) => void
  addTempPhotos: (photos: UserPicsType[]) => void
  replaceTempPhoto: (id: string, newPhoto: UserPicsType) => void
  removeTempPhoto: (id: string) => void
}

type ProfileStore = ProfileState & ProfileActions & PhotoFields

interface ErrorResponse {
  message: string
  status?: number
  details?: any
}

interface ProfileState {
  loading: boolean
  success: boolean
  error: boolean
  data: Profile | null
  hasProfile: boolean | null
  errorData: ErrorResponse | null
}

interface ProfileActions {
  createProfile: (profileData: Omit<Profile, 'photos'>) => Promise<void>
  getProfile: () => Promise<void>
  checkProfile: () => Promise<AxiosResponse | ApiErrorResponse>
  updateProfile: (profileData: Partial<Profile>) => Promise<{ status: number }>
  deleteProfile: () => Promise<void>
  addPhoto: (photo: string) => void
  removePhoto: (photoId: string) => void
  uploadNewPhotos: () => Promise<void>
  deletePhoto: (id: string) => Promise<void>
  addPhotoToData: (photoUrl: string) => void
  removePhotoFromData: (photoUrl: string) => void
  replacePhotoInData: (oldUrl: string, newUrl: string) => void
}

const initialState: ProfileState & {
  tempPhotos: UserPicsType[]
  cloudUrls: string[]
} = {
  loading: true,
  success: false,
  error: false,
  data: null,
  hasProfile: null,
  errorData: null,
  tempPhotos: [],
  cloudUrls: [],
}

export const useProfileStore = create<ProfileStore>()(
  devtools(
    (set, get) => {
      const resetState = () => set({ ...initialState })

      const handleError = (error: any, actionName: string) => {
        console.error(`❌ Error in ${actionName}:`, error)
        set({
          loading: false,
          error: true,
          errorData: {
            message: error.message || 'Unknown error',
            status: error.status,
            details: error.data,
          },
        })
      }

      const fetchData = async (
        apiMethod: () => Promise<any>,
        actionName: string
      ) => {
        resetState()
        try {
          const response = await apiMethod()
          if (response.status >= 200 && response.status < 300) {
            set({ loading: false, success: true, data: response.data })
            return response
          } else {
            console.error(`Unexpected status: ${response.status}`)
          }
        } catch (error) {
          handleError(error, actionName)
          throw new Error('Error in connection with backend or endpoint!')
        }
      }

      return {
        ...initialState,

        setTempPhotos: (photos) => set({ tempPhotos: photos }),
        setCloudUrls: (urls: string[]) => set({ cloudUrls: urls }),
        clearTempPhotos: () => set({ tempPhotos: [] }),

        addTempPhoto: (photo) =>
          set((s) => ({
            tempPhotos: [
              ...s.tempPhotos.filter((p) => p.id !== photo.id),
              photo,
            ],
          })),

        addTempPhotos: (photos) =>
          set((s) => {
            const available = MAX_PROFILE_PHOTOS - s.tempPhotos.length
            return {
              tempPhotos: [...s.tempPhotos, ...photos.slice(0, available)],
            }
          }),

        replaceTempPhoto: (id, newPhoto) =>
          set((s) => {
            const old = s.tempPhotos.find((p) => p.id === id)
            if (old?.url?.startsWith('blob:')) URL.revokeObjectURL(old.url)
            const updated =
              old?.url && !old.url.startsWith('blob:')
                ? { ...newPhoto, replacedUrl: old.url }
                : newPhoto
            return {
              tempPhotos: s.tempPhotos.map((p) => (p.id === id ? updated : p)),
            }
          }),

        removeTempPhoto: (id) =>
          set((s) => {
            const old = s.tempPhotos.find((p) => p.id === id)
            if (old?.url?.startsWith('blob:')) URL.revokeObjectURL(old.url)
            return { tempPhotos: s.tempPhotos.filter((p) => p.id !== id) }
          }),

        createProfile: async (profileData) => {
          set({ loading: true, error: false, success: false })
          try {
            const { tempPhotos } = get()
            await apiCreateProfile({ ...profileData, photos: tempPhotos })
            set({ tempPhotos: [], cloudUrls: [] })
            clearLocalStorage(['userPreferences'])
            set({
              loading: false,
              success: true,
              data: { ...profileData, photos: [] },
            })
          } catch (error) {
            handleError(error, 'createProfile')
          }
        },

        getProfile: async () =>
          await fetchData(() => getProfile(), 'getProfile'),

        checkProfile: async () => {
          set({
            loading: true,
            success: false,
            error: false,
            hasProfile: null,
            errorData: null,
          })
          try {
            const response = await checkProfile()
            if (response.status >= 200 && response.status < 300) {
              const isProfileComplete = response.status === 200
              set({
                loading: false,
                success: true,
                hasProfile: isProfileComplete,
              })
              return response
            } else {
              console.error(`Unexpected status: ${response.status}`)
            }
          } catch (error) {
            throw error
          }
        },

        updateProfile: async (profileData) => {
          const response = await fetchData(
            () => updateProfile(profileData),
            'updateProfile'
          )
          if (
            response &&
            response.status === 200 &&
            (profileData.friendsDistance !== undefined ||
              profileData.friendsAgeMin !== undefined ||
              profileData.friendsAgeMax !== undefined)
          ) {
            const potentialFriendsStore = usePotentialFriendsStore.getState()
            potentialFriendsStore.refreshPotentialFriends()
          }
          return response
        },

        deleteProfile: async () =>
          await fetchData(() => deleteProfile(), 'deleteProfile'),

        addPhoto: (photo: string) => {
          set((state) => {
            if (!state.data) return state
            return {
              data: {
                ...state.data,
                photos: [
                  ...state.data.photos.filter((p) => p !== photo),
                  photo,
                ],
              },
            }
          })
        },

        removePhoto: (photoUrl: string) => {
          set((state) => {
            if (!state.data) return state
            return {
              data: {
                ...state.data,
                photos: [
                  ...(state.data.photos.filter((p) => p !== photoUrl) || []),
                ],
              },
            }
          })
        },

        addPhotoToData: (photoUrl: string) => {
          set((state) => {
            if (!state.data) return state
            return {
              data: {
                ...state.data,
                photos: [...state.data.photos, photoUrl],
              },
            }
          })
        },

        removePhotoFromData: (photoUrl: string) => {
          set((state) => {
            if (!state.data) return state
            return {
              data: {
                ...state.data,
                photos: state.data.photos.filter((p) => p !== photoUrl),
              },
            }
          })
        },

        replacePhotoInData: (oldUrl: string, newUrl: string) => {
          set((state) => {
            if (!state.data) return state
            return {
              data: {
                ...state.data,
                photos: state.data.photos.map((p) =>
                  p === oldUrl ? newUrl : p
                ),
              },
            }
          })
        },

        uploadNewPhotos: async () => {
          const { tempPhotos, addPhotoToData, replacePhotoInData } = get()
          const newPhotos = tempPhotos.filter((p) => p.blobFile)
          if (newPhotos.length === 0) return

          const authHeaders = await getAuthHeaders()

          const formData = new FormData()
          newPhotos.forEach((p) => formData.append('images', p.blobFile!))

          const { data: cloudinaryUrls } = await axios.post<string[]>(
            `${API_BASE}/${PHOTO_ENDPOINTS.upload}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                ...authHeaders,
              },
            }
          )

          for (let i = 0; i < cloudinaryUrls.length; i++) {
            const photoUrl = cloudinaryUrls[i]
            const photo = newPhotos[i]

            if (photo.replacedUrl) {
              await axios.delete(`${API_BASE}/${PHOTO_ENDPOINTS.base}`, {
                data: { photoUrl: photo.replacedUrl },
                headers: authHeaders,
              })
              await axios.post(
                `${API_BASE}/${PHOTO_ENDPOINTS.base}`,
                { photoUrl },
                { headers: authHeaders }
              )
              replacePhotoInData(photo.replacedUrl, photoUrl)
            } else {
              await axios.post(
                `${API_BASE}/${PHOTO_ENDPOINTS.base}`,
                { photoUrl },
                { headers: authHeaders }
              )
              addPhotoToData(photoUrl)
            }
          }
          set({ tempPhotos: [] })
        },

        deletePhoto: async (id: string) => {
          const { tempPhotos, removePhotoFromData } = get()
          const photo = tempPhotos.find((p) => p.id === id)
          if (!photo) return

          if (!photo.blobFile && photo.url) {
            await axios.delete(`${API_BASE}/${PHOTO_ENDPOINTS.base}`, {
              data: { photoUrl: photo.url },
              headers: await getAuthHeaders(),
            })
            removePhotoFromData(photo.url)
          }

          set((s) => ({
            tempPhotos: s.tempPhotos.filter((p) => p.id !== id),
          }))
        },
      }
    },
    { name: 'zustand store' }
  )
)
