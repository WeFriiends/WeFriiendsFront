import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { UserProfileData } from 'types/UserProfileData'
import { getFriends, addLike, addDislike } from 'actions/friendsServices'

// import { useProfileStore } from './store'

interface PotentialFriendsState {
  potentialFriends: UserProfileData[] | undefined
  loading: boolean
  error: Error | null
  fetchPotentialFriends: () => Promise<void>
  clearPotentialFriends: () => void
  handleLike: (idPotentialFriend: string) => Promise<number | undefined>
  handleDislike: (idPotentialFriend: string) => Promise<number | undefined>
  shouldFetchPotentialFriends: boolean
}

export const usePotentialFriendsStore = create<PotentialFriendsState>()(
  devtools(
    (set, get) => ({
      potentialFriends: undefined,
      loading: false,
      error: null,
      shouldFetchPotentialFriends: true,

      fetchPotentialFriends: async () => {
        // Only fetch if we should (initial load or after like/dislike)
        if (!get().shouldFetchPotentialFriends || get().loading) {
          return
        }

        // Check if we already have potential friends
        if (get().potentialFriends?.length) {
          return
        }

        set({ loading: true, error: null })
        try {
          const data = await getFriends('profile/search')
          set({
            potentialFriends: data,
            loading: false,
            shouldFetchPotentialFriends: false,
          })
        } catch (error) {
          console.error('Error fetching potential friends:', error)
          set({
            error: error instanceof Error ? error : new Error(String(error)),
            loading: false,
          })
        }
      },

      clearPotentialFriends: () => {
        set({ potentialFriends: undefined, shouldFetchPotentialFriends: true })
      },

      handleLike: async (idPotentialFriend: string) => {
        return await addLike(idPotentialFriend)
      },

      handleDislike: async (idPotentialFriend: string) => {
        return await addDislike(idPotentialFriend)
      },
    }),
    { name: 'potential-friends-store' }
  )
)
