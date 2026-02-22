import { AxiosError } from 'axios'
import { addDislike, addNewFriend } from 'actions/friendsServices'
import { UserProfileButton } from 'components/userProfile/UserProfileButton'
import { useWhoLikedMeContext } from 'hooks/useWhoLikedMeContext'
import { UserProfileData } from 'types/UserProfileData'
import { useGetUsersWhoLikedMe } from 'hooks/useGetUsersWhoLikedMe'

interface ProfileCardActionsProps {
  user: UserProfileData
}

export function ProfileCardActions({ user }: ProfileCardActionsProps) {
  const { data } = useGetUsersWhoLikedMe()
  const { setSelectedUserId, setLikedUser } = useWhoLikedMeContext()

  function onLastUser() {
    if (data?.length === 0) {
      setSelectedUserId(null)
    }
  }

  async function handleBeFriend() {
    try {
      await addNewFriend(user.id)
      setLikedUser(user)
      onLastUser()
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.log(error.response.data.message)
      }
    }
  }

  function handleSkip() {
    addDislike(user.id)
    onLastUser()
  }

  return <UserProfileButton skip={handleSkip} beFriend={handleBeFriend} />
}
