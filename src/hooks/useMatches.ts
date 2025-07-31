import useSWR from 'swr'
import { getMatches as fetcher } from 'actions/friendsServices'

export const useMatches = () => {
  const { data, error } = useSWR('matches', fetcher)
  return {
    data,
    error,
    isLoading: !data && !error,
  }
}
