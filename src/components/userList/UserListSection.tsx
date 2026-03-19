import { ReactNode } from 'react'
import { Box } from '@mui/material'
import Loader from 'common/svg/Loader'
import { UserMiniCards } from 'common/components/UserMiniCards'
import { UserMiniProfile } from 'common/types/userTypes'

interface UserListSectionProps {
  users?: UserMiniProfile[]
  isLoading: boolean
  error?: Error
  emptyContent: ReactNode
  onUserSelect: (user: UserMiniProfile) => void
  selectedUserId?: string | null
}

export function UserListSection({
  users,
  isLoading,
  error,
  emptyContent,
  onUserSelect,
  selectedUserId = null,
}: UserListSectionProps) {
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
    return <>{emptyContent}</>
  }
  return (
    <UserMiniCards
      users={users}
      onCardClick={onUserSelect}
      selectedUserId={selectedUserId}
    />
  )
}
