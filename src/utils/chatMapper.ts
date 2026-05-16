import { Timestamp, QueryDocumentSnapshot } from 'firebase/firestore'
import { Message } from 'types/Chat'

export function mapFirestoreDocToMessage(doc: QueryDocumentSnapshot): Message {
  const data = doc.data()

  const chatId = doc.ref.parent.parent?.id

  if (!chatId) {
    console.warn(`ChatId not found for message ${doc.id}, using 'unknown'`)
  }

  return {
    messageId: doc.id,
    senderId: data.senderId,
    timestamp:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : new Date().toISOString(),
    message: data.text,
    isSeen: data.isSeen || false,
    chatId: chatId || 'unknown',
  }
}
