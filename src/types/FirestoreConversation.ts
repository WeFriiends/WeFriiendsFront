import type { Timestamp } from 'firebase/firestore'

/**
 * Shape of a document stored in the Firestore `conversations` collection
 * (as returned by `doc.data()`), not the mapped UI `Conversation` type.
 */
export interface FirestoreConversation {
  participants: string[]
  lastMessage: string
  lastMessageAt: Timestamp
  createdAt: Timestamp
  lastMessageSender?: string
  lastMessageSeen?: boolean
}
