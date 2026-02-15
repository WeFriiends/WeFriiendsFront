import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { useConversationsStore } from 'zustand/conversationsStore'

export function useStartChatWith() {
  const { user } = useAuth0()
  const navigate = useNavigate()
  const createConversation = useConversationsStore(
    (state) => state.createConversation
  )

  return async function (id: string) {
    try {
      const currentUserId = user?.sub

      if (currentUserId && id) {
        await createConversation(currentUserId, id)
        navigate(`/messages/${id}`)
      } else {
        console.error('Missing user IDs for chat:', { currentUserId, id })
        navigate('/messages')
      }
    } catch (error) {
      console.error('Error starting chat:', error)
      navigate('/messages')
    }
  }
}
