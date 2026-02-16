import { ReactNode } from 'react'
import { Box, CircularProgress } from '@mui/material'
import UserProfile from 'components/userProfile/UserProfile'
import { useGetUserById } from 'hooks/useGetUserById'
import { useWhoLikedMeContext } from 'hooks/useWhoLikedMeContext'
import { ProfileCardActions } from './ProfileCardActions'

export function ProfileCardSection() {
  const { selectedUserId } = useWhoLikedMeContext()
  const { data, isLoading } = useGetUserById(selectedUserId)

  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    )
  }

  if (!data) {
    return null
  }

  return (
    <Container>
      <Box>
        <UserProfile user={data} />
        {data && selectedUserId && (
          <ProfileCardActions user={{ ...data, id: selectedUserId }} />
        )}
      </Box>
    </Container>
  )
}

function Container({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        width: { md: 350, sm: 350 },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  )
}
