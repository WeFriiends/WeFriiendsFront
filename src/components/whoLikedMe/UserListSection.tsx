import { LIKE_ENDPOINTS } from 'actions/endpoints'
import NoticeNoLikes from 'components/noticeNoData/NoticeNoLikes'
import { useUsersData } from 'hooks/useUsersData'
import { DataStateWrapper } from 'common/components/DataStateWrapper'
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

  if (users && users.length === 0) {
    return <NoticeNoLikes />
  }

  const likedMeUsers = users
    ? users.map((user) => ({ ...user, likedMe: true }))
    : []

  return (
    <DataStateWrapper
      isLoading={isLoading}
      error={error}
      hasData={!!users && users.length > 0}
    >
      <UserMiniCards
        users={likedMeUsers}
        onCardClick={onUserSelect}
        selectedUserId={selectedUserId}
      />
    </DataStateWrapper>
  )
}
