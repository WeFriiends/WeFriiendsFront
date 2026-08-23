import type { FirestoreConversation } from 'types/FirestoreConversation'

export const isConversationUnread = (
  data: FirestoreConversation,
  currentUserId: string
): boolean =>
  data.lastMessageSeen === false && data.lastMessageSender !== currentUserId
