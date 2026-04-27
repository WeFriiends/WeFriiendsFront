import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from 'firebase/firestore'
import type {
  DocumentSnapshot,
  Firestore,
  QueryConstraint,
} from 'firebase/firestore'

const MESSAGES_PER_PAGE = 10

export async function fetchMessagesPage(
  db: Firestore,
  chatId: string,
  cursor?: DocumentSnapshot | null
) {
  const messagesRef = collection(db, 'conversations', chatId, 'messages')

  const constraints: QueryConstraint[] = [
    orderBy('createdAt', 'desc'),
    limit(MESSAGES_PER_PAGE),
  ]

  if (cursor) {
    constraints.push(startAfter(cursor))
  }

  const messagesQuery = query(messagesRef, ...constraints)

  const snapshot = await getDocs(messagesQuery)

  const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null

  return {
    snapshot,
    lastVisible,
    messagesQuery,
  }
}
