import { PROFILE_ENDPOINTS } from 'actions/endpoints'
import NoticeNoUsers from 'components/noticeNoData/NoticeNoUsers'
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
  const {
    data: users,
    isLoading,
    error,
  } = useUsersData(PROFILE_ENDPOINTS.nearest)

  if (users && users.length === 0) {
    return <NoticeNoUsers />
  }

  return (
    <DataStateWrapper
      isLoading={isLoading}
      error={error}
      hasData={!!users && users.length > 0}
    >
      <UserMiniCards
        users={users || []}
        onCardClick={onUserSelect}
        selectedUserId={selectedUserId}
      />
    </DataStateWrapper>
  )
}
