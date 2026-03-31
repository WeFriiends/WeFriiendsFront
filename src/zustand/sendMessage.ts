import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { db } from 'services/firebase'

export interface Message {
  receiverId: string
  text: string
}

export async function sendMessage(
  senderId: string,
  conversationId: string,
  message: Message
) {
  const batch = writeBatch(db)

  const messageDoc = doc(
    collection(db, 'conversations', conversationId, 'messages')
  )
  const conversationDoc = doc(db, 'conversations', conversationId)

  batch.set(messageDoc, {
    senderId: senderId,
    receiverId: message.receiverId,
    text: message.text,
    createdAt: serverTimestamp(),
    seen: false,
  })

  batch.update(conversationDoc, {
    lastMessage: message.text,
    lastMessageAt: serverTimestamp(),
    lastMessageSeen: false,
  })

  await batch.commit()
}
