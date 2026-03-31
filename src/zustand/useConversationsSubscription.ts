import useSWRSubscription from 'swr/subscription'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore'
import { db } from 'services/firebase'
import { useAuth0 } from '@auth0/auth0-react'
import { useProfileStore } from './store'
import { Conversation } from 'types/Conversation'

type ConversationsKey = ['conversations', string] | null

export function useConversationsSubscription() {
  const { user } = useAuth0()
  const { hasProfile } = useProfileStore()

  const userId = user?.sub && hasProfile ? user.sub : undefined

  const { data, error } = useSWRSubscription<
    Conversation[],
    Error,
    ConversationsKey
  >(userId ? ['conversations', userId] : null, ([, userId], { next }) => {
    const conversationsRef = collection(db, 'conversations')
    const conversationsQuery = query(
      conversationsRef,
      where('participants', 'array-contains', userId),
      orderBy('lastMessageAt', 'desc')
    )

    const unsubscribe = onSnapshot(
      conversationsQuery,
      async (querySnapshot) => {
        try {
          const conversations = querySnapshot.docs.map((doc) =>
            getConversationData(userId, doc)
          )
          next(null, conversations)
        } catch (error) {
          next(error instanceof Error ? error : new Error(String(error)))
        }
      },
      (error) => next(error)
    )

    return () => unsubscribe()
  })

  return {
    data,
    error,
    loading: data === undefined && !error,
  }
}

function getConversationData(userId: string, doc: QueryDocumentSnapshot) {
  const conversationData = doc.data()
  const otherParticipantId = conversationData.participants.find(
    (participantId: string) => participantId !== userId
  )
  return {
    id: otherParticipantId,
    lastMessage: conversationData.lastMessage,
    conversationRef: doc.id,
    lastMessageSeen: conversationData.lastMessageSeen ?? false,
  }
}
