import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useConversationsStore } from 'zustand/conversationsStore'

export function useFetchConversations() {
  const { userId: urlUserId } = useParams<{ userId: string }>()
  const { conversations, fetchConversations, loading, error } =
    useConversationsStore()

  useEffect(() => {
    if (urlUserId) {
      fetchConversations()
    }
  }, [urlUserId, fetchConversations])

  return { conversations, loading, error }
}
