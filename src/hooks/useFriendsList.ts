import useSWR from 'swr'
import { getFriends as fetcher } from 'actions/friendsServices'

export const usePotentialFriendsList = () => {
  const { data, error } = useSWR('profile/search', fetcher)
  return {
    data,
    error,
    isLoading: !data && !error,
  }
}
