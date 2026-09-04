import { mutate } from 'swr'
import { PROFILE_ENDPOINTS, LIKE_ENDPOINTS } from 'actions/endpoints'
import { usePotentialFriendsStore, useMatchesStore } from 'zustand/friendsStore'
import { UserMiniProfile } from 'common/types/userTypes'

const removeUser = (userId: string) => (users: UserMiniProfile[] | undefined) =>
  users?.filter((user) => user.id !== userId)

export const updateUserListsAfterBlock = (userId: string) => {
  const { potentialFriends, setPotentialFriends } =
    usePotentialFriendsStore.getState()
  const updatedFriends = potentialFriends?.filter((f) => f.id !== userId)
  setPotentialFriends(updatedFriends)

  mutate(PROFILE_ENDPOINTS.nearest, removeUser(userId), {
    revalidate: true,
  })
  mutate(LIKE_ENDPOINTS.onMe, removeUser(userId), { revalidate: true })

  useMatchesStore.getState().refreshMatches()

  useMatchesStore.setState((state) => ({
    matches: state.matches?.filter((m) => m.id !== userId),
  }))
}
