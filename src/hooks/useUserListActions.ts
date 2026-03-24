import { useState } from 'react'
import { AlertColor } from '@mui/material'
import { mutate } from 'swr'
import { addDislike, addLike } from 'actions/friendsServices'
import { UserMiniProfile } from 'common/types/userTypes'
import { useMatchesStore } from 'zustand/friendsStore'
import { getApiErrorMessage } from 'helpers/getApiErrorMessage'

const getNextSelectedUser = (
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

export function useUserListActions(swrKey: string) {
  const [selectedUser, setSelectedUser] = useState<UserMiniProfile | null>(null)
  const [matchedUser, setMatchedUser] = useState<{
    id: string
    avatar: string
  } | null>(null)
  const [snackbarInfo, setSnackbarInfo] = useState<{
    message: string
    severity: AlertColor
  } | null>(null)

  const { addFriend } = useMatchesStore()

  const handleCloseSnackbar = () => setSnackbarInfo(null)
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
      setSnackbarInfo({
        message: getApiErrorMessage(e) || 'Failed to skip user',
        severity: 'error',
      })
    }
  }

  const handleBeFriend = async () => {
    if (!selectedUser) return
    try {
      if (selectedUser.likedUsers) {
        const status = await addFriend(selectedUser.id)

        if (!status) {
          throw new Error('Failed to add friend')
        }

        setMatchedUser({
          id: selectedUser.id,
          avatar: selectedUser.picture ?? '',
        })
      } else {
        await addLike(selectedUser.id)
        setSnackbarInfo({ message: 'Friend request sent', severity: 'success' })
      }

      await removeUserAndSelectNext(selectedUser.id)
    } catch (e: unknown) {
      setSnackbarInfo({
        message: getApiErrorMessage(e) || 'Failed to add friend',
        severity: 'error',
      })
    }
  }

  return {
    selectedUser,
    setSelectedUser,
    matchedUser,
    handleCloseMatch,
    snackbarInfo,
    handleCloseSnackbar,
    handleSkip,
    handleBeFriend,
  }
}
