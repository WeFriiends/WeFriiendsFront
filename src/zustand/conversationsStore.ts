import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { UserLastMessage } from 'types/UserLastMessage'
import { db } from '../services/firebase'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { useUserProfileStore } from './userProfileStore'

interface ConversationsState {
  conversations: UserLastMessage[]
  loading: boolean
  error: Error | null
  lastFetched: number | null
  unsubscribe: (() => void) | null
  fetchConversations: (userId?: string) => Promise<void>
  shouldRefetch: (userId?: string) => boolean
  subscribeToConversations: (userId: string) => void
  unsubscribeFromConversations: () => void
  createConversation: (currentUserId: string, userId: string) => Promise<string>
  setConversationSeen: (
    currentUserId: string,
    userId: string
  ) => Promise<string>
}

export const useConversationsStore = create<ConversationsState>()(
  devtools(
    (set, get) => ({
      conversations: [] as UserLastMessage[],
      loading: false,
      error: null,
      lastFetched: null,
      unsubscribe: null,

      shouldRefetch: (userId?: string) => {
        const state = get()

        // If there's no userId, we can't fetch conversations
        if (!userId) {
          return false
        }

        // If we've never fetched before, we should fetch
        if (state.lastFetched === null) {
          return true
        }

        // If we have conversations but they're older than 5 minutes, we should refetch
        // const fiveMinutesInMs = 5 * 60 * 1000
        // if (Date.now() - state.lastFetched > fiveMinutesInMs) {
        //   return true
        // }

        // If we have no conversations, we should fetch
        if (state.conversations.length === 0) {
          return true
        }

        // Otherwise, we don't need to refetch
        return false
      },

      fetchConversations: async (userId?: string) => {
        // If there's an active subscription, return early as the subscription will handle updates
        if (get().unsubscribe) {
          // console.log('Using active subscription for conversations data')
          return
        }

        // If we don't need to refetch, return early
        if (!get().shouldRefetch(userId)) {
          // console.log('Using cached conversations data')
          return
        }

        set({ loading: true, error: null })

        try {
          if (!userId) {
            console.error('No user ID provided')
            set({ conversations: [] as UserLastMessage[], loading: false })
            return
          }

          const currentUserId = userId

          // Get conversations where the current user is a participant
          const conversationsRef = collection(db, 'conversations')
          const conversationsQuery = query(
            conversationsRef,
            where('participants', 'array-contains', currentUserId),
            orderBy('lastMessageAt', 'desc')
          )
          const userConversations: UserLastMessage[] = []

          // Execute the query
          const querySnapshot = await getDocs(conversationsQuery)

          // console.log('🔥 Firebase Query Results:', {
          //   totalDocuments: querySnapshot.size,
          //   documents: querySnapshot.docs.map((doc) => ({
          //     id: doc.id,
          //     data: doc.data(),
          //   })),
          // })

          // Get the userProfileStore instance
          const userProfileStore = useUserProfileStore.getState()

          // Process the results
          for (const doc of querySnapshot.docs) {
            const conversationData = doc.data()
            // console.log('Processing conversation document:', {id: doc.id, data: conversationData,})

            // Get the other participant's ID
            const otherParticipantId = conversationData.participants.find(
              (participantId: string) => participantId !== currentUserId
            )

            // Fetch the user profile
            // console.log(`Fetching profile for user: ${otherParticipantId}`)
            const profile = await userProfileStore.fetchUserProfile(
              otherParticipantId
            )

            // Create a UserLastMessage object with profile data if available
            const userMessage: UserLastMessage = {
              id: otherParticipantId,
              avatar:
                profile?.photos?.[0]?.src ||
                conversationData.participantAvatar ||
                `/img/placeholders/girl-big.svg`,
              name:
                profile?.name || conversationData.participantName || `Friend`,
              age:
                profile?.age?.toString() ||
                conversationData.participantAge ||
                `--`,
              lastMessage: conversationData.lastMessage || '',
              messageCount:
                conversationData.lastMessageSeen === false ? '1' : '0',
              conversationRef: doc.id,
              lastMessageSeen:
                conversationData.lastMessageSeen !== undefined
                  ? conversationData.lastMessageSeen
                  : false,
            }

            // console.log(`Created UserLastMessage with profile data:`, {userId: otherParticipantId, hasProfile: !!profile, userMessage,})

            userConversations.push(userMessage)
          }

          console.log('Final processed user conversations:', userConversations)
          set({
            conversations: userConversations,
            loading: false,
            lastFetched: Date.now(),
          })
        } catch (error) {
          console.error('Error fetching data for conversations:', error)
          set({
            error: error instanceof Error ? error : new Error(String(error)),
            loading: false,
          })
        }
      },

      subscribeToConversations: (userId) => {
        // Check if we already have an active subscription
        if (get().unsubscribe) {
          // console.log(
          //   'Already subscribed to conversations, skipping subscription'
          // )
          return
        }

        if (!userId) {
          console.error('No user ID provided for subscription')
          return
        }

        // console.log('Subscribing to conversations for user:', userId)

        const currentUserId = userId

        // Create a query for conversations where the current user is a participant
        const conversationsRef = collection(db, 'conversations')
        const conversationsQuery = query(
          conversationsRef,
          where('participants', 'array-contains', currentUserId),
          orderBy('lastMessageAt', 'desc')
        )

        // Set up the listener
        set({ loading: true, error: null })

        const unsubscribe = onSnapshot(
          conversationsQuery,
          async (querySnapshot) => {
            try {
              console.log('🔥 Firebase Snapshot Update:', {
                totalDocuments: querySnapshot.size,
                documents: querySnapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(),
                })),
              })

              // Get the userProfileStore instance
              const userProfileStore = useUserProfileStore.getState()
              const userConversations: UserLastMessage[] = []

              // Process the results
              for (const doc of querySnapshot.docs) {
                const conversationData = doc.data()
                // console.log('Processing conversation document:', {
                //   id: doc.id,
                //   data: conversationData,
                // })

                // Get the other participant's ID
                const otherParticipantId = conversationData.participants.find(
                  (participantId: string) => participantId !== currentUserId
                )

                // Fetch the user profile
                // console.log(`Fetching profile for user: ${otherParticipantId}`)
                const profile = await userProfileStore.fetchUserProfile(
                  otherParticipantId
                )

                // Create a UserLastMessage object with profile data if available
                const userMessage: UserLastMessage = {
                  id: otherParticipantId,
                  avatar:
                    profile?.photos?.[0]?.src ||
                    conversationData.participantAvatar ||
                    `/img/placeholders/girl-big.svg`,
                  name:
                    profile?.name ||
                    conversationData.participantName ||
                    `Friend`,
                  age:
                    profile?.age?.toString() ||
                    conversationData.participantAge ||
                    `--`,
                  lastMessage: conversationData.lastMessage || '',
                  messageCount:
                    conversationData.lastMessageSeen === false ? '1' : '0',
                  conversationRef: doc.id,
                  lastMessageSeen:
                    conversationData.lastMessageSeen !== undefined
                      ? conversationData.lastMessageSeen
                      : false,
                }

                // console.log(`Created UserLastMessage with profile data:`, {
                //   userId: otherParticipantId,
                //   hasProfile: !!profile,
                //   userMessage,
                // })

                userConversations.push(userMessage)
              }

              // console.log(
              //   'Final processed user conversations:',
              //   userConversations
              // )
              set({
                conversations: userConversations,
                loading: false,
                lastFetched: Date.now(),
              })
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
        // console.log(
        //   'Successfully subscribed to conversations for user:',
        //   userId
        // )
      },

      unsubscribeFromConversations: () => {
        const { unsubscribe } = get()
        if (unsubscribe) {
          // console.log('Unsubscribing from conversations')
          unsubscribe()
          set({ unsubscribe: null })
        }
      },

      createConversation: async (currentUserId, userId) => {
        set({ loading: true, error: null })
        try {
          if (!currentUserId || !userId) {
            console.error('Missing user IDs for chat connection')
          }

          // Create conversation ID by sorting user IDs and joining with "_"
          const sortedUserIds = [currentUserId, userId].sort()
          const conversationId = sortedUserIds.join('_')

          // Get a reference to the conversation document
          const conversationRef = doc(db, 'conversations', conversationId)

          // Check if the document already exists
          const docSnap = await getDoc(conversationRef)

          // Only create the document if it doesn't exist
          if (!docSnap.exists()) {
            // Create a conversation document in Firestore
            await setDoc(conversationRef, {
              participants: [currentUserId, userId],
              lastMessage: 'Chat just has been created.',
              lastMessageAt: serverTimestamp(),
              lastMessageSender: currentUserId,
              lastMessageSeen: false,
              createdAt: serverTimestamp(),
            })
            // console.log('Conversation document created successfully')
          } else {
            // console.log(
            //   'Conversation document already exists, skipping creation'
            // )
          }

          set({ loading: false })
          return conversationId
        } catch (error) {
          console.error('Error creating chat connection:', error)
          set({
            error: error instanceof Error ? error : new Error(String(error)),
            loading: false,
          })
          throw error
        }
      },

      setConversationSeen: async (currentUserId, userId) => {
        try {
          if (!currentUserId || !userId) {
            console.error('Missing user IDs for setConversationSeen')
            return ''
          }

          // Conversation ID: те же самые sorted user IDs
          const sortedUserIds = [currentUserId, userId].sort()
          const conversationId = sortedUserIds.join('_')

          const conversationRef = doc(db, 'conversations', conversationId)

          // Проверяем, существует ли документ
          const docSnap = await getDoc(conversationRef)
          if (!docSnap.exists()) {
            console.error('Conversation does not exist:', conversationId)
            return conversationId
          }

          // Обновляем только одно поле (не затираем весь документ)
          await updateDoc(conversationRef, {
            lastMessageSeen: true,
          })

          console.log(`✅ lastMessageSeen set to true for ${conversationId}`)

          // Можно сразу обновить локальный store, чтобы UI отразил seen
          set((state) => ({
            conversations: state.conversations.map((conv) =>
              conv.conversationRef === conversationId
                ? { ...conv, lastMessageSeen: true, messageCount: '0' }
                : conv
            ),
          }))

          return conversationId
        } catch (error) {
          console.error('❌ Error setting lastMessageSeen:', error)
          set({
            error: error instanceof Error ? error : new Error(String(error)),
          })
          throw error
        }
      },
    }),
    { name: 'conversations-store' }
  )
)

// Add event listener for beforeunload to unsubscribe when browser is closed
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    // Get the current store state and unsubscribe if needed
    const store = useConversationsStore.getState()
    if (store.unsubscribe) {
      //console.log('Browser closing, unsubscribing from conversations')
      store.unsubscribeFromConversations()
    }
  })
}
