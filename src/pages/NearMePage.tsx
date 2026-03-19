import { useState } from 'react'
import { Box, Grid, AlertColor } from '@mui/material'
import { mutate } from 'swr'
import { InfoBar } from 'common/components/InfoBar'
import { UserListSection } from 'components/userList/UserListSection'
import NoticeNoUsers from 'components/noticeNoData/NoticeNoUsers'
import { UserProfilePanel } from 'components/userProfilePanel/UserProfilePanel'
import { UserProfileButton } from 'components/userProfile/UserProfileButton'
import { Match } from 'components/findMatch/Match'
import { PROFILE_ENDPOINTS } from 'actions/endpoints'
import { addDislike, addLike } from 'actions/friendsServices'
import { AppSnackbar } from 'common/components/AppSnackbar'
import { UserMiniProfile } from 'common/types/userTypes'
import { useUsersData } from 'hooks/useUsersData'
import { useMatchesStore } from 'zustand/friendsStore'
import { useProfileStore } from 'zustand/store'

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

export default function NearMePage() {
  const [selectedUser, setSelectedUser] = useState<UserMiniProfile | null>(null)
  const [matchedUser, setMatchedUser] = useState<{
    id: string
    avatar: string
  } | null>(null)
  const [snackbarInfo, setSnackbarInfo] = useState<{
    message: string
    severity: AlertColor
  } | null>(null)
  const {
    data: users,
    isLoading,
    error,
  } = useUsersData(PROFILE_ENDPOINTS.nearest)
  const { data: profile } = useProfileStore()
  const { addFriend } = useMatchesStore()
  const currentUserAvatar = profile?.photos?.[0]
  const currentUserAvatarSrc =
    typeof currentUserAvatar === 'string'
      ? currentUserAvatar
      : currentUserAvatar?.url ?? ''

  const handleCloseSnackbar = () => setSnackbarInfo(null)
  const handleCloseMatch = () => setMatchedUser(null)

  const removeUserAndSelectNext = async (userId: string) => {
    let nextSelectedUser: UserMiniProfile | null = null

    await mutate<UserMiniProfile[]>(
      PROFILE_ENDPOINTS.nearest,
      (currentUsers) => {
        if (!currentUsers) {
          return currentUsers
        }

        const currentIndex = currentUsers.findIndex(
          (user) => user.id === userId
        )
        const updatedUsers = currentUsers.filter((user) => user.id !== userId)

        nextSelectedUser = getNextSelectedUser(updatedUsers, currentIndex)

        return updatedUsers
      },
      { revalidate: false }
    )

    setSelectedUser(nextSelectedUser)
  }

  const handleSkip = async () => {
    if (!selectedUser) return
    try {
      await addDislike(selectedUser.id)
      await removeUserAndSelectNext(selectedUser.id)
    } catch (e: unknown) {
      setSnackbarInfo({
        message: e instanceof Error ? e.message : 'Failed to skip user',
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
        message: e instanceof Error ? e.message : 'Failed to add friend',
        severity: 'error',
      })
    }
  }

  return (
    <>
      <InfoBar
        title="Near by"
        subTitle="These people near you – just like them and see if it's a match!"
      />
      <Grid container alignItems="flex-start" gap={16}>
        <Box sx={{ containerType: 'inline-size', flex: 1 }}>
          <UserListSection
            users={users}
            isLoading={isLoading}
            error={error}
            emptyContent={<NoticeNoUsers />}
            onUserSelect={setSelectedUser}
            selectedUserId={selectedUser?.id ?? null}
          />
        </Box>
        <UserProfilePanel
          selectedUserId={selectedUser?.id ?? null}
          onClose={() => setSelectedUser(null)}
          backLabel="Back to Near by"
          actions={
            <UserProfileButton skip={handleSkip} beFriend={handleBeFriend} />
          }
        />
      </Grid>
      <Match
        matchedUser={matchedUser}
        currentUserAvatar={currentUserAvatarSrc}
        onClose={handleCloseMatch}
      />

      <AppSnackbar
        open={!!snackbarInfo}
        message={snackbarInfo?.message || null}
        severity={snackbarInfo?.severity || 'error'}
        onClose={handleCloseSnackbar}
      />
    </>
  )
}
