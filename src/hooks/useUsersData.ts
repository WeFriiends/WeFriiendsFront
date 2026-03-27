import useSWR from 'swr'
import { getUsersData as fetcher } from 'actions/userServices'
import { UserMiniProfile } from 'common/types/userTypes'

export const useUsersData = (url: string) => {
  const { data, error, isLoading } = useSWR(url, fetcher<UserMiniProfile[]>)

  return {
    data,
    error,
    isLoading,
  }
}
