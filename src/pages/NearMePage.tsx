import { Box, Grid } from '@mui/material'
import { InfoBar } from 'common/components/InfoBar'
import { UserListSection } from 'components/userList/UserListSection'
import NoticeNoUsers from 'components/noticeNoData/NoticeNoUsers'
import { UserProfilePanel } from 'components/userProfilePanel/UserProfilePanel'
import { UserProfileButton } from 'components/userProfile/UserProfileButton'
import { Match } from 'components/findMatch/Match'
import { PROFILE_ENDPOINTS } from 'actions/endpoints'
import { AppSnackbar } from 'common/components/AppSnackbar'
import { useUsersData } from 'hooks/useUsersData'
import { useUserListActions } from 'hooks/useUserListActions'
import { useSnackbar } from 'hooks/useSnackbar'
import { useProfileStore } from 'zustand/store'

export default function NearMePage() {
  const {
    data: users,
    isLoading,
    error,
  } = useUsersData(PROFILE_ENDPOINTS.nearest)

  const { data: profile } = useProfileStore()
  const currentUserAvatar = profile?.photos?.[0]
  const currentUserAvatarSrc =
    typeof currentUserAvatar === 'string'
      ? currentUserAvatar
      : currentUserAvatar?.url ?? ''

  const { snackbarInfo, showSnackbar, handleCloseSnackbar } = useSnackbar()

  const {
    selectedUser,
    setSelectedUser,
    matchedUser,
    handleCloseMatch,
    handleSkip,
    handleBeFriend,
  } = useUserListActions(PROFILE_ENDPOINTS.nearest, showSnackbar)

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
