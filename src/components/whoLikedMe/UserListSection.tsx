import { Box } from '@mui/material'
import { LIKE_ENDPOINTS } from 'actions/endpoints'
import NoticeNoLikes from 'components/noticeNoData/NoticeNoLikes'
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
  const { data: users, isLoading, error } = useUsersData(LIKE_ENDPOINTS.onMe)

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
    return <NoticeNoLikes />
  }

  const likedMeUsers = users.map((user) => ({ ...user, likedMe: true }))

  return (
    <UserMiniCards
      users={likedMeUsers}
      onCardClick={onUserSelect}
      selectedUserId={selectedUserId}
    />
  )
}
