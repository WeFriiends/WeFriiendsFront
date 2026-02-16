import { Box, CircularProgress } from '@mui/material'
import { UserMiniCards } from 'common/components/UserMiniCards'
import NoticeNoLikes from 'components/noticeNoData/NoticeNoLikes'
import { useGetUsersWhoLikedMe } from 'hooks/useGetUsersWhoLikedMe'
import { useWhoLikedMeContext } from 'hooks/useWhoLikedMeContext'

export function MiniCardsSection() {
  const { data, isLoading, error } = useGetUsersWhoLikedMe()
  const { setSelectedUserId } = useWhoLikedMeContext()

  function handleCardClick(userId: string) {
    setSelectedUserId((id) => (id === userId ? null : userId))
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

  return <UserMiniCards users={data} onCardClick={handleCardClick} />
}
