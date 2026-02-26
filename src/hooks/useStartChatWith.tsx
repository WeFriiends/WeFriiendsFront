import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { useChatStore } from 'zustand/chatStore'
import { useConversationsStore } from 'zustand/conversationsStore'

export function useStartChatWith() {
  const { user } = useAuth0()
  const navigate = useNavigate()
  const createConversation = useConversationsStore(
    (state) => state.createConversation
  )
  const setSelectedChatId = useChatStore((state) => state.setSelectedChatId)

  return async function (id: string) {
    try {
      const currentUserId = user?.sub
      if (currentUserId && id) {
        await createConversation(currentUserId, id)
        setSelectedChatId(id)
      } else {
        console.error('Missing user IDs for chat:', { currentUserId, id })
      }
    } catch (error) {
      console.error('Error starting chat:', error)
    } finally {
      navigate('/messages')
    }
  }
}
