import { useAuth0 } from '@auth0/auth0-react'
import useSWR from 'swr'
import { Conversation } from 'types/Conversation'

export function useConversations() {
  const { user } = useAuth0()
  const userId = user?.sub

  return useSWR<Conversation[]>(userId ? ['conversations', userId] : null)
}
