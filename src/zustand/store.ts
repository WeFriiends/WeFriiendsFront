import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {
  createProfile,
  getProfile,
  checkProfile,
  updateProfile,
  deleteProfile,
} from './api'
import { UserPicsType } from '../types/FirstProfile'

interface AuthState {
  token: string | null
  setToken: (token: string) => void
}

interface Profile {
  name: string
  dateOfBirth: string
  location: {
    lat: number
    lng: number
    country?: string
    city?: string
    street?: string
    houseNumber?: string
  }
  photos: UserPicsType[]
  gender: string
  reasons: string[]
  friendsAgeMin?: number
  friendsAgeMax?: number
  friendsDistance?: number
}

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
  createProfile: (profileData: Profile, token: string | null) => Promise<void>
  getProfile: (token: string | null) => Promise<void>
  checkProfile: (token: string | null) => boolean
  updateProfile: (
    profileData: Partial<Profile>,
    token: string | null
  ) => Promise<{ status: number }>
  deleteProfile: (token: string | null) => Promise<void>
  addPhoto: (photo: UserPicsType) => void
  removePhoto: (photoId: string) => void
}

type ProfileStore = ProfileState & ProfileActions

// Initial state
const initialState: ProfileState = {
  loading: true,
  success: false,
  error: false,
  data: null,
  hasProfile: null,
  errorData: null,
}

// Zustand store

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}))

export const useProfileStore = create<ProfileStore>()(
  devtools(
    (set) => {
      const resetState = () => set({ ...initialState })

      const handleError = (error: any, actionName: string) => {
        console.error(`Error in ${actionName}:`, error)
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
        createProfile: async (profileData, token) =>
          await fetchData(
            () => createProfile(profileData, token),
            'createProfile'
          ),

        // It is used everywhere to fetch data from the database and display it on the front-end
        getProfile: async (token) =>
          await fetchData(() => getProfile(token), 'getProfile'),

        // It is used to check if the user has profile data, if the first profile carousel has been filled out and stored to the database
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

        // It is used on the /my-account page to change the address (to be used for more options)
        updateProfile: async (profileData, token) => {
          return await fetchData(
            () => updateProfile(profileData, token),
            'updateProfile'
          )
        },

        // It is used to remove the profile from the MongoDB (not from Auth0)
        deleteProfile: async (token) =>
          await fetchData(() => deleteProfile(token), 'deleteProfile'),

        addPhoto: (photo: UserPicsType) => {
          set((state) => {
            if (!state.data) {
              return state
            }

            return {
              data: {
                ...state.data,
                photos: [
                  ...(state.data.photos?.filter((p) => p.id !== photo.id) ||
                    []),
                  photo,
                ],
              },
            }
          })
        },
        removePhoto: (photoId: string) => {
          set((state) => {
            if (!state.data) {
              return state
            }

            return {
              data: {
                ...state.data,
                photos: [
                  ...(state.data.photos?.filter((p) => p.id !== photoId) || []),
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
