import useSWR from 'swr'
import { getUserById } from 'actions/userServices'

export function useGetUserById(id: string | null) {
  return useSWR(id ? `profile/${id}` : null, () => getUserById(id!))
}
