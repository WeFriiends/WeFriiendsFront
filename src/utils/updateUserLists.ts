import { mutate } from 'swr'
import { PROFILE_ENDPOINTS, LIKE_ENDPOINTS } from 'actions/endpoints'
import { usePotentialFriendsStore, useMatchesStore } from 'zustand/friendsStore'

export const updateUserListsAfterBlock = (userId: string) => {
  const { potentialFriends, setPotentialFriends } =
    usePotentialFriendsStore.getState()
  const updatedFriends = potentialFriends?.filter((f) => f.id !== userId)
  setPotentialFriends(updatedFriends)

  mutate(PROFILE_ENDPOINTS.nearest)
  mutate(LIKE_ENDPOINTS.onMe)
  useMatchesStore.getState().refreshMatches()

  useMatchesStore.setState((state) => ({
    matches: state.matches?.filter((m) => m.id !== userId),
  }))
}
