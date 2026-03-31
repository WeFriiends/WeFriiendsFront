import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Conversation } from 'types/Conversation'
import { db } from '../services/firebase'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  QueryDocumentSnapshot,
} from 'firebase/firestore'

interface ConversationsState {
  conversations: Conversation[]
  loading: boolean
  error: Error | null
  unsubscribe: (() => void) | null
  subscribeToConversations: (userId: string) => void
  unsubscribeFromConversations: () => void
  createConversation: (currentUserId: string, userId: string) => Promise<string>
}

export const useConversationsStore = create<ConversationsState>()(
  devtools(
    (set, get) => ({
      conversations: [] as Conversation[],
      loading: false,
      error: null,
      unsubscribe: null,

      subscribeToConversations: (userId) => {
        // Check if we already have an active subscription
        if (get().unsubscribe) {
          return
        }

        if (!userId) {
          console.error('No user ID provided for subscription')
          return
        }

        // Create a query for conversations where the current user is a participant
        const conversationsQuery = getConversationQuery(userId)

        set({ loading: true, error: null })

        const unsubscribe = onSnapshot(
          conversationsQuery,
          async (querySnapshot) => {
            try {
              const conversations = querySnapshot.docs.map((doc) =>
                getConversationData(userId, doc)
              )
              set({ conversations, loading: false })
            } catch (error) {
              console.error('Error processing conversation snapshot:', error)
              set({
                error:
                  error instanceof Error ? error : new Error(String(error)),
                loading: false,
              })
            }
          },
          (error) => {
            console.error('Error in conversation snapshot listener:', error)
            set({
              error,
              loading: false,
            })
          }
        )
        // Store the unsubscribe function
        set({ unsubscribe })
      },
    }),
    { name: 'conversations-store' }
  )
)

export function getConversationData(
  userId: string,
  doc: QueryDocumentSnapshot
) {
  const conversationData = doc.data()
  // Get the other participant's ID
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

export function getConversationQuery(userId: string) {
  const conversationsRef = collection(db, 'conversations')
  return query(
    conversationsRef,
    where('participants', 'array-contains', userId),
    orderBy('lastMessageAt', 'desc')
  )
}
