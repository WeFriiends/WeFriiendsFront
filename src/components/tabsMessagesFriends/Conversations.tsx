import { ConversationItem } from './ConversationItem'
import { NoNewMatchesOrMessages } from './NoNewMatchesOrMessages'
import { useFetchConversations } from './hooks/useFetchConversations'

export function Conversations() {
  const { conversations, loading, error } = useFetchConversations()

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
