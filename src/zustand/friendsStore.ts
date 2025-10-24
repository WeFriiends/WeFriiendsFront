import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { UserProfileData } from 'types/UserProfileData'
import {
  getFriends,
  getMatches,
  addLike,
  addDislike,
  addNewFriend,
} from 'actions/friendsServices'
import { FriendsMatch } from 'types/Matches'

// Common types
type LoadingState = {
  isLoading: boolean
  error: Error | null
}

// Matches store types
interface MatchesState extends LoadingState {
  matches: FriendsMatch[] | undefined
  intervalId: number | null
}

interface MatchesActions {
  fetchMatches: () => Promise<void>
  startPeriodicFetching: () => void
  stopPeriodicFetching: () => void
  addFriend: (idFriend: string) => Promise<number | undefined>
}

type MatchesStore = MatchesState & MatchesActions

// Potential friends store types
interface PotentialFriendsState extends LoadingState {
  potentialFriends: UserProfileData[] | undefined
  shouldFetchPotentialFriends: boolean
}

interface PotentialFriendsActions {
  fetchPotentialFriends: () => Promise<void>
  clearPotentialFriends: () => void
  refreshPotentialFriends: () => Promise<void>
  handleLike: (idPotentialFriend: string) => Promise<number | undefined>
  handleDislike: (idPotentialFriend: string) => Promise<number | undefined>
}

type PotentialFriendsStore = PotentialFriendsState & PotentialFriendsActions

/**
 * Helper function to handle errors consistently
 */
const handleError = (error: unknown): Error => {
  return error instanceof Error ? error : new Error(String(error))
}

/**
 * Store for managing matches (existing friends)
 */
export const useMatchesStore = create<MatchesStore>()(
  devtools(
    (set, get) => ({
      // State
      matches: undefined,
      isLoading: false,
      error: null,
      intervalId: null,

      // Actions
      fetchMatches: async () => {
        set({ isLoading: true, error: null })
        try {
          const data = await getMatches('matches')
          set({
            matches: data,
            isLoading: false,
          })
        } catch (error) {
          console.error('Error fetching matches:', error)
          set({
            error: handleError(error),
            isLoading: false,
          })
        }
      },

      startPeriodicFetching: () => {
        // todo: add mechanism of repeating fetching the matches (fetchMatches)
        return
      },

      stopPeriodicFetching: () => {
        // todo: add mechanism of stop repeating fetching the matches (fetchMatches)
        return
      },

      addFriend: async (idFriend: string) => {
        try {
          const status = await addNewFriend(idFriend)
          // Refresh matches data after adding a friend
          get().fetchMatches()
          return status
        } catch (error) {
          console.error('Error adding friend:', error)
          set({ error: handleError(error) })
          return undefined
        }
      },
    }),
    { name: 'matches-store' }
  )
)

/**
 * Store for managing potential friends (people who can become friends)
 */
export const usePotentialFriendsStore = create<PotentialFriendsStore>()(
  devtools(
    (set, get) => ({
      // State
      potentialFriends: undefined,
      isLoading: false,
      error: null,
      shouldFetchPotentialFriends: true,

      // Actions
      fetchPotentialFriends: async () => {
        // Only fetch if we should (initial load or after like/dislike)
        if (!get().shouldFetchPotentialFriends || get().isLoading) {
          return
        }

        // Check if we already have potential friends
        if (get().potentialFriends?.length) {
          return
        }

        set({ isLoading: true, error: null })
        try {
          const data = await getFriends('profile/search')
          set({
            potentialFriends: data,
            isLoading: false,
            shouldFetchPotentialFriends: false,
          })
        } catch (error) {
          console.error('Error fetching potential friends:', error)
          set({
            error: handleError(error),
            isLoading: false,
          })
        }
      },

      clearPotentialFriends: () => {
        set({ potentialFriends: undefined, shouldFetchPotentialFriends: true })
      },

      refreshPotentialFriends: async () => {
        // First clear the current potential friends
        get().clearPotentialFriends()
        // Then fetch new ones
        await get().fetchPotentialFriends()
        // todo: when we have a queue with potential friends and then change the filters, for example ageRange set to very narrow, one of potential friends is still remaining in queue and nothing happens when I push "skip" (dislike), it should disappear from the queue and the queue should become empty
      },

      handleLike: async (idPotentialFriend: string) => {
        try {
          return await addLike(idPotentialFriend)
        } catch (error) {
          console.error('Error adding like:', error)
          set({ error: handleError(error) })
          return undefined
        }
      },

      handleDislike: async (idPotentialFriend: string) => {
        try {
          return await addDislike(idPotentialFriend)
        } catch (error) {
          console.error('Error adding dislike:', error)
          set({ error: handleError(error) })
          return undefined
        }
      },
    }),
    { name: 'potential-friends-store' }
  )
)
