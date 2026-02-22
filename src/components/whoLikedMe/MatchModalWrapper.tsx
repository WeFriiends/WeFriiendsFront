import { Match } from 'components/findMatch/Match'
import { useWhoLikedMeContext } from 'hooks/useWhoLikedMeContext'

export function MatchModalWrapper() {
  const { likedUser, setLikedUser } = useWhoLikedMeContext()

  const matchedUser = likedUser && {
    id: likedUser.id,
    avatar: likedUser.photos[0]?.src,
  }

  return <Match matchedUser={matchedUser} onClose={() => setLikedUser(null)} />
}
