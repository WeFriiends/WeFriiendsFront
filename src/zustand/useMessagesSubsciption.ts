import useSWRSubscription from 'swr/subscription'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore'
import { db } from 'services/firebase'

export function useMessagesSubscription(conversationId?: string) {
  const { data, error } = useSWRSubscription(
    conversationId ? ['messages', conversationId] : null,
    ([, conversationId], { next }) => {
      const messagesRef = collection(
        db,
        'conversations',
        conversationId,
        'messages'
      )
      const messagesQuery = query(messagesRef, orderBy('createdAt', 'asc'))

      const unsubscribe = onSnapshot(
        messagesQuery,
        { includeMetadataChanges: false },
        async (querySnapshot) => {
          try {
            if (querySnapshot.metadata.hasPendingWrites) {
              return
            }

            const messages = querySnapshot.docs.map((doc) => {
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
            })

            next(null, {
              chatId: conversationId,
              messages,
            })
          } catch (err) {
            next(err instanceof Error ? err : new Error(String(err)))
          }
        },
        (err) => {
          next(err instanceof Error ? err : new Error(String(err)))
        }
      )

      return () => unsubscribe()
    }
  )

  return {
    currentChat: data,
    error,
    loading: !!conversationId && data === undefined && !error,
  }
}
