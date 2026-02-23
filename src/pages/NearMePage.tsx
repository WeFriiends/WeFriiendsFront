import { Box, Grid } from '@mui/material'
import { InfoBar } from 'common/components/InfoBar'
import { UserListSection } from 'components/userList/UserListSection'
import NoticeNoUsers from 'components/noticeNoData/NoticeNoUsers'

export default function NearMePage() {
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
          />
        </Box>
      </Grid>
    </>
  )
}
