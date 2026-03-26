import { UserMiniProfile } from 'common/types/userTypes'

export const getNextSelectedUser = (
  users: UserMiniProfile[],
  removedUserIndex: number
): UserMiniProfile | null => {
  if (users.length === 0) {
    return null
  }

  const nextIndex =
    removedUserIndex >= users.length ? users.length - 1 : removedUserIndex

  return users[nextIndex] ?? null
}
