import useSWR from 'swr'
import { getUsersWhoLikedMe } from 'actions/whoLikedMeService'

export function useGetUsersWhoLikedMe() {
  return useSWR('likes-on-me', getUsersWhoLikedMe)
}
