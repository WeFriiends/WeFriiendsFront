import { Timestamp, QueryDocumentSnapshot } from 'firebase/firestore'
import { Message } from 'types/Chat'

export function mapFirestoreDocToMessage(doc: QueryDocumentSnapshot): Message {
  const data = doc.data()

  return {
    messageId: doc.id,
    senderId: data.senderId,
    timestamp:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : new Date().toISOString(),
    message: data.text,
    readStatus: !data.seen,
  }
}
