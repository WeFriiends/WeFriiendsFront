import { Box, CircularProgress } from '@mui/material'
import { UserMiniCards } from 'common/components/UserMiniCards'
import { UserMiniProfile } from 'common/types/userTypes'
import NoticeNoLikes from 'components/noticeNoData/NoticeNoLikes'
import { useGetUsersWhoLikedMe } from 'hooks/useGetUsersWhoLikedMe'
import { useWhoLikedMeContext } from 'hooks/useWhoLikedMeContext'

export function MiniCardsSection() {
  const { data, isLoading, error } = useGetUsersWhoLikedMe()
  const { selectedUserId, setSelectedUserId } = useWhoLikedMeContext()

  function handleCardClick(user: UserMiniProfile) {
    setSelectedUserId((id) => (id === user.id ? null : user.id))
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        {error.message}
      </Box>
    )
  }

  if (isLoading || !data) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    )
  }

  if (data.length === 0) {
    return <NoticeNoLikes />
  }

  const likedMeUsers = data.map((user) => ({ ...user, likedUsers: true }))

  return (
    <UserMiniCards
      users={likedMeUsers}
      onCardClick={handleCardClick}
      selectedUserId={selectedUserId}
    />
  )
}
