import { Box, Grid } from '@mui/material'
import { InfoBar } from 'components/userList/components/InfoBar'
import { userListConfigs } from './UserListPage.config'
import { UserListSection } from 'components/userList/UserListSection'

interface UserListPageProps {
  view: keyof typeof userListConfigs
}

export default function UserListPage({ view }: UserListPageProps) {
  const { title, subTitle, endpoint, emptyContent } = userListConfigs[view]
  return (
    <>
      <InfoBar title={title} subTitle={subTitle} />
      <Grid container alignItems="flex-start" gap={16}>
        <Box sx={{ containerType: 'inline-size', flex: 1 }}>
          <UserListSection endpoint={endpoint} emptyContent={emptyContent} />
        </Box>
      </Grid>
    </>
  )
}
