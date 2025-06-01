import useSWR from 'swr'
import { getFriends as fetcher } from 'actions/friendsServices'

export const useNewFriendsList = () => {
  const { data, error } = useSWR('newFriends', fetcher)
  return {
    data,
    error,
    isLoading: !data && !error,
  }
}
export const usePotentialFriendsList = () => {
  const { data, error } = useSWR('profile/search', fetcher)
  return {
    data,
    error,
    isLoading: !data && !error,
  }
}
