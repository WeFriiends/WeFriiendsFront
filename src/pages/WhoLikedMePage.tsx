import { Box, Grid } from '@mui/material'
import { LIKE_ENDPOINTS } from 'actions/endpoints'
import { InfoBar } from 'common/components/InfoBar'
import { AppSnackbar } from 'common/components/AppSnackbar'
import { UserListSection } from 'components/whoLikedMe/UserListSection'
import { UserProfilePanel } from 'components/userProfilePanel/UserProfilePanel'
import { UserProfileButton } from 'components/userProfile/UserProfileButton'
import { Match } from 'components/findMatch/Match'
import { useUserListActions } from 'hooks/useUserListActions'
import { useSnackbar } from 'hooks/useSnackbar'
import { useProfileStore } from 'zustand/store'

export default function WhoLikedMePage() {
  const { data: profile } = useProfileStore()
  const currentUserAvatar = profile?.photos?.[0]
  const currentUserAvatarSrc =
    typeof currentUserAvatar === 'string'
      ? currentUserAvatar
      : currentUserAvatar?.url ?? ''

  const { isOpen, snackbarInfo, showSnackbar, handleCloseSnackbar } =
    useSnackbar()

  const {
    selectedUser,
    setSelectedUser,
    matchedUser,
    handleCloseMatch,
    handleSkip,
    handleBeFriend,
  } = useUserListActions(LIKE_ENDPOINTS.onMe, showSnackbar)

  return (
    <>
      <InfoBar
        title="Your likes list"
        subTitle="These people have already liked you – just like them back and it's a match!"
      />

      <Grid container alignItems="flex-start" gap={16}>
        <Box sx={{ containerType: 'inline-size', flex: 1 }}>
          <UserListSection
            onUserSelect={setSelectedUser}
            selectedUserId={selectedUser?.id ?? null}
          />
        </Box>
        <UserProfilePanel
          selectedUserId={selectedUser?.id ?? null}
          onClose={() => setSelectedUser(null)}
          backLabel="Back to Likes"
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
        open={isOpen}
        message={snackbarInfo?.message ?? null}
        severity={snackbarInfo?.severity}
        onClose={handleCloseSnackbar}
      />
    </>
  )
}
