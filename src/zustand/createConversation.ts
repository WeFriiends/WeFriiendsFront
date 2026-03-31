import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from 'services/firebase'

export async function createConversation(
  currentUserId: string,
  userId: string
) {
  const sortedUserIds = [currentUserId, userId].sort()
  const conversationId = sortedUserIds.join('_')

  const conversationRef = doc(db, 'conversations', conversationId)
  const docSnap = await getDoc(conversationRef)

  if (!docSnap.exists()) {
    await setDoc(conversationRef, {
      participants: [currentUserId, userId],
      lastMessage: 'Chat just has been created.',
      lastMessageAt: serverTimestamp(),
      lastMessageSender: currentUserId,
      lastMessageSeen: false,
      createdAt: serverTimestamp(),
    })
  }

  return conversationId
}
