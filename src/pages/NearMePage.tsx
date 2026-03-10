import { useState } from 'react'
import { Box, Grid, AlertColor } from '@mui/material'
import { InfoBar } from 'common/components/InfoBar'
import { UserListSection } from 'components/userList/UserListSection'
import NoticeNoUsers from 'components/noticeNoData/NoticeNoUsers'
import { UserProfilePanel } from 'components/userProfilePanel/UserProfilePanel'
import { UserProfileButton } from 'components/userProfile/UserProfileButton'
import { addDislike, addNewFriend } from 'actions/friendsServices'
import { AppSnackbar } from 'common/components/AppSnackbar'

export default function NearMePage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [snackbarInfo, setSnackbarInfo] = useState<{
    message: string
    severity: AlertColor
  } | null>(null)

  const handleCloseSnackbar = () => setSnackbarInfo(null)

  const handleSkip = async () => {
    if (!selectedUserId) return
    try {
      await addDislike(selectedUserId)
      setSnackbarInfo({
        message: 'User skipped successfully',
        severity: 'success',
      })
    } catch (e: any) {
      setSnackbarInfo({
        message: e.response?.data?.message || 'Failed to skip user',
        severity: 'error',
      })
    }
  }

  const handleBeFriend = async () => {
    if (!selectedUserId) return
    try {
      await addNewFriend(selectedUserId)
      setSnackbarInfo({ message: 'Friend request sent', severity: 'success' })
    } catch (e: any) {
      setSnackbarInfo({
        message: e.response?.data?.message || 'Failed to add friend',
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
            endpoint="profile/nearest"
            emptyContent={<NoticeNoUsers />}
            onUserSelect={setSelectedUserId}
            selectedUserId={selectedUserId}
          />
        </Box>
        <UserProfilePanel
          selectedUserId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
          actions={
            <UserProfileButton skip={handleSkip} beFriend={handleBeFriend} />
          }
        />
      </Grid>

      <AppSnackbar
        open={!!snackbarInfo}
        message={snackbarInfo?.message || null}
        severity={snackbarInfo?.severity || 'error'}
        onClose={handleCloseSnackbar}
      />
    </>
  )
}
