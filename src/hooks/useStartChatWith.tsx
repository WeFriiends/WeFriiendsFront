import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { useChatStore } from 'zustand/chatStore'
import { createConversation } from 'zustand/createConversation'

export function useStartChatWith() {
  const { user } = useAuth0()
  const navigate = useNavigate()
  const setSelectedChatId = useChatStore((state) => state.setSelectedChatId)

  return async function (id: string) {
    try {
      const currentUserId = user?.sub
      if (!currentUserId) {
        return
      }
      await createConversation(currentUserId, id)
      setSelectedChatId(id)
      navigate('/messages')
    } catch (error) {
      console.error('Error starting chat:', error)
    }
  }
}
