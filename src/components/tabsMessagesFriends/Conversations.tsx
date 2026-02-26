import { useConversationsStore } from 'zustand/conversationsStore'
import { ConversationItem } from './ConversationItem'
import { NoNewMatchesOrMessages } from './NoNewMatchesOrMessages'

export function Conversations() {
  const { conversations, loading, error } = useConversationsStore()

  if (loading) {
    return <div>Loading conversations...</div>
  }

  if (error) {
    return <div>Error loading conversations: {error.message}</div>
  }

  if (conversations?.length === 0) {
    return (
      <NoNewMatchesOrMessages text="You don't have any conversations. You need to find friends first!" />
    )
  }

  return conversations.map((conversation) => (
    <ConversationItem key={conversation.id} conversation={conversation} />
  ))
}
