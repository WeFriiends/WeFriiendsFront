import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {
  createProfile as apiCreateProfile,
  getProfile,
  checkProfile,
  updateProfile,
  deleteProfile,
} from './api'
import { UserPicsType, Location, UserPreferences } from '../types/FirstProfile'
import { clearLocalStorage } from 'utils/localStorage'

interface AuthState {
  token: string | null
  setToken: (token: string) => void
}

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
  userPreferences?: UserPreferences
}

interface PhotoFields {
  tempPhotos: UserPicsType[]
  cloudUrls: string[]
  setTempPhotos: (photos: UserPicsType[]) => void
  clearTempPhotos: () => void
  addTempPhoto: (photo: UserPicsType) => void
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
  createProfile: (
    profileData: Omit<Profile, 'photos'>,
    token: string | null
  ) => Promise<void>
  getProfile: (token: string | null) => Promise<void>
  checkProfile: (token: string | null) => boolean
  updateProfile: (
    profileData: Partial<Profile>,
    token: string | null
  ) => Promise<{ status: number }>
  deleteProfile: (token: string | null) => Promise<void>
  addPhoto: (photo: string) => void
  removePhoto: (photoId: string) => void
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

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}))

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
            status: error.response?.status,
            details: error.response?.data,
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

        removeTempPhoto: (id) =>
          set((s) => ({
            tempPhotos: s.tempPhotos.filter((p) => p.id !== id),
          })),

        createProfile: async (profileData, token) => {
          set({ loading: true, error: false, success: false })

          try {
            const { tempPhotos } = get()

            await apiCreateProfile(
              {
                ...profileData,
                photos: tempPhotos,
              },
              token || ''
            )

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

        getProfile: async (token) =>
          await fetchData(() => getProfile(token), 'getProfile'),

        checkProfile: async (token) => {
          set({
            loading: true,
            success: false,
            error: false,
            hasProfile: null,
            errorData: null,
          })
          try {
            const response = await checkProfile(token)
            if (response.status >= 200 && response.status < 300) {
              set({ loading: false, success: true, hasProfile: response.data })
              return response
            } else {
              console.error(`Unexpected status: ${response.status}`)
            }
          } catch (error) {
            handleError(error, 'checkProfile')
            throw new Error('Error in connection with backend or endpoint!')
          }
        },

        updateProfile: async (profileData, token) => {
          return await fetchData(
            () => updateProfile(profileData, token),
            'updateProfile'
          )
        },

        deleteProfile: async (token) =>
          await fetchData(() => deleteProfile(token), 'deleteProfile'),

        addPhoto: (photo: string) => {
          set((state) => {
            if (!state.data) {
              return state
            }
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
            if (!state.data) {
              return state
            }
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
      }
    },
    { name: 'zustand store' }
  )
)
