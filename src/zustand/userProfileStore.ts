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

// Interface for cached profile with timestamp
interface CachedProfile {
  profile: UserProfile
  timestamp: number
}

interface UserProfilesState {
  profileCache: Record<string, CachedProfile>
  loading: Record<string, boolean>
  error: Record<string, Error | null>
  fetchUserProfile: (
    userId: string,
    forceRefresh?: boolean
  ) => Promise<UserProfile | undefined>
  isCacheValid: (userId: string) => boolean
}

export const useUserProfileStore = create<UserProfilesState>()(
  devtools(
    (set, get) => ({
      profileCache: {},
      loading: {},
      error: {},

      isCacheValid: (userId: string) => {
        const { profileCache } = get()
        const cachedData = profileCache[userId]

        if (!cachedData) return false

        // Cache is valid for 10 minutes (600000 ms)
        const cacheValidityPeriod = 10 * 60 * 1000
        const now = Date.now()

        return now - cachedData.timestamp < cacheValidityPeriod
      },

      fetchUserProfile: async (userId: string, forceRefresh = false) => {
        // If we already have the profile, it's not loading, and we don't need to refresh it
        const { profileCache, loading, isCacheValid } = get()

        if (
          !forceRefresh &&
          profileCache[userId] &&
          !loading[userId] &&
          isCacheValid(userId)
        ) {
          console.log(`♻️Found cached profile for user: ${userId}`)
          return profileCache[userId].profile
        }

        // Set loading state for this userId
        set((state) => ({
          loading: { ...state.loading, [userId]: true },
          error: { ...state.error, [userId]: null },
        }))

        try {
          // console.log(`Fetching profile for user: ${userId}`)

          // Get the authentication token
          const { token } = useAuthStore.getState()
          // console.log(`Token from useAuthStore: ${token ? 'Available' : 'Not available'}`)

          // Fetch the profile with the token
          const profile = await getUserById(userId, token)

          // console.log(`Profile fetched:`, profile)

          // Update the store with the fetched profile and timestamp
          set((state) => ({
            profileCache: {
              ...state.profileCache,
              [userId]: {
                profile,
                timestamp: Date.now(),
              },
            },
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
