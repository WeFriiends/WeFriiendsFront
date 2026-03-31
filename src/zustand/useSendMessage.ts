import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { Message, sendMessage } from './sendMessage'
import { useConversations } from './useConversations'

export function useSendMessage(conversationId: string) {
  const { user } = useAuth0()
  const userId = user?.sub
  const { data: conversations = [] } = useConversations()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const conversation = conversations.find((conv) => conv.id === conversationId)
  const conversationRef = conversation?.conversationRef

  async function onSendMessage(message: Message) {
    if (!userId) {
      return
    }

    if (!conversationRef) {
      console.error('No conversation reference found')
      return
    }

    try {
      setError('')
      setIsLoading(true)
      await sendMessage(userId, conversationId, message)
    } catch (err) {
      console.log('Failed to send message:', err)
      setError('Failed to send message')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    sendMessage: onSendMessage,
    isLoading,
    error,
  }
}
