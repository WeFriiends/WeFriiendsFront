import { Box } from '@mui/material'
import { PROFILE_ENDPOINTS } from 'actions/endpoints'
import NoticeNoUsers from 'components/noticeNoData/NoticeNoUsers'
import { useUsersData } from 'hooks/useUsersData'
import Loader from 'common/svg/Loader'
import { UserMiniCards } from 'common/components/UserMiniCards'
import { UserMiniProfile } from 'common/types/userTypes'

interface UserListSectionProps {
  onUserSelect: (user: UserMiniProfile) => void
  selectedUserId?: string | null
}

export function UserListSection({
  onUserSelect,
  selectedUserId = null,
}: UserListSectionProps) {
  const {
    data: users,
    isLoading,
    error,
  } = useUsersData(PROFILE_ENDPOINTS.nearest)

  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        {error.message}
      </Box>
    )
  }

  if (isLoading || !users) {
    return <Loader />
  }

  if (users.length === 0) {
    return <NoticeNoUsers />
  }

  return (
    <UserMiniCards
      users={users}
      onCardClick={onUserSelect}
      selectedUserId={selectedUserId}
    />
  )
}
