import { useState } from 'react'
import { AlertColor } from '@mui/material'
import { mutate } from 'swr'
import { addDislike } from 'actions/friendsServices'
import { UserMiniProfile } from 'common/types/userTypes'
import { getNextSelectedUser } from 'helpers/getNextSelectedUser'
import { getApiErrorMessage } from 'helpers/getApiErrorMessage'
import { usePotentialFriendsStore } from 'zustand/friendsStore'

export function useUserListActions(
  swrKey: string,
  showSnackbar: (message: string, severity: AlertColor) => void
) {
  const [selectedUser, setSelectedUser] = useState<UserMiniProfile | null>(null)
  const [matchedUser, setMatchedUser] = useState<{
    id: string
    avatar: string
  } | null>(null)

  const handleCloseMatch = () => setMatchedUser(null)

  const removeUserAndSelectNext = async (userId: string) => {
    let nextSelectedUser: UserMiniProfile | null = null

    const updateUsersList = (currentUsers: UserMiniProfile[] | undefined) => {
      if (!currentUsers) {
        return currentUsers
      }

      const currentIndex = currentUsers.findIndex((user) => user.id === userId)
      const updatedUsers = currentUsers.filter((user) => user.id !== userId)

      nextSelectedUser = getNextSelectedUser(updatedUsers, currentIndex)

      return updatedUsers
    }

    await mutate<UserMiniProfile[]>(swrKey, updateUsersList, {
      revalidate: false,
    })

    setSelectedUser(nextSelectedUser)
  }

  const handleSkip = async () => {
    if (!selectedUser) return
    try {
      await addDislike(selectedUser.id)
      await removeUserAndSelectNext(selectedUser.id)
    } catch (e: unknown) {
      showSnackbar(getApiErrorMessage(e) || 'Failed to skip user', 'error')
    }
  }

  const handleBeFriend = async () => {
    if (!selectedUser) return
    try {
      if (selectedUser.likedMe) {
        setMatchedUser({
          id: selectedUser.id,
          avatar: selectedUser.picture ?? '',
        })
      } else {
        showSnackbar('Friend request sent', 'success')
      }

      await usePotentialFriendsStore.getState().handleLike(selectedUser.id)
      await removeUserAndSelectNext(selectedUser.id)
    } catch (e: unknown) {
      showSnackbar(getApiErrorMessage(e) || 'Failed to add friend', 'error')
    }
  }

  return {
    selectedUser,
    setSelectedUser,
    matchedUser,
    handleCloseMatch,
    handleSkip,
    handleBeFriend,
  }
}
