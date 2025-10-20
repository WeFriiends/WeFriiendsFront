import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getUserById } from './api'
import { useAuthStore } from './store'

// Define UserProfile interface
export interface UserProfile {
  _id: string
  name: string
  age: number
  zodiacSign: string
  city: string
  distance: number
  likedMe: boolean
  photos: {
    src: string
  }[]
  reasons: string[]
  preferences: {
    questionary: {
      smoking: string
      education: string[]
      children: string
      drinking: string
      pets: string[]
      language: string[]
    }
    interests: string[]
    aboutMe: string
  }
}

interface UserProfilesState {
  profiles: Record<string, UserProfile>
  loading: Record<string, boolean>
  error: Record<string, Error | null>
  fetchUserProfile: (userId: string) => Promise<UserProfile | undefined>
}

export const useUserProfileStore = create<UserProfilesState>()(
  devtools(
    (set, get) => ({
      profiles: {},
      loading: {},
      error: {},

      fetchUserProfile: async (userId: string) => {
        // If we already have the profile and it's not loading, return it
        const { profiles, loading } = get()
        if (profiles[userId] && !loading[userId]) {
          return profiles[userId]
        }

        // Set loading state for this userId
        set((state) => ({
          loading: { ...state.loading, [userId]: true },
          error: { ...state.error, [userId]: null },
        }))

        try {
          console.log(`Fetching profile for user: ${userId}`)

          // Get the authentication token
          const { token } = useAuthStore.getState()
          console.log(
            `Token from useAuthStore: ${token ? 'Available' : 'Not available'}`
          )

          // Fetch the profile with the token
          const profile = await getUserById(userId, token)

          console.log(`Profile fetched:`, profile)

          // Update the store with the fetched profile
          set((state) => ({
            profiles: { ...state.profiles, [userId]: profile },
            loading: { ...state.loading, [userId]: false },
          }))

          return profile
        } catch (error) {
          console.error(`Error fetching profile for user ${userId}:`, error)

          // Update the error state
          set((state) => ({
            loading: { ...state.loading, [userId]: false },
            error: {
              ...state.error,
              [userId]:
                error instanceof Error ? error : new Error(String(error)),
            },
          }))

          return undefined
        }
      },
    }),
    { name: 'user-profile-store' }
  )
)
