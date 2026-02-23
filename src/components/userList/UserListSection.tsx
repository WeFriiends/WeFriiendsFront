import { ReactNode } from 'react'
import { Box } from '@mui/material'
import Loader from 'common/svg/Loader'
import { UserMiniCards } from 'common/components/UserMiniCards'
import { useUsersData } from 'hooks/useUsersData'

interface UserListSectionProps {
  endpoint: string
  emptyContent: ReactNode
}

export function UserListSection({
  endpoint,
  emptyContent,
}: UserListSectionProps) {
  const { data, isLoading, error } = useUsersData(endpoint)

  //TODO: implement onCardClick
  const onCardClick = (userId: string) => {
    console.log('Card clicked with userId:', userId)
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        {error.message}
      </Box>
    )
  }

  if (isLoading || !data) {
    return <Loader />
  }

  if (data.length === 0) {
    return <>{emptyContent}</>
  }
  return <UserMiniCards users={data} onCardClick={onCardClick} />
}
