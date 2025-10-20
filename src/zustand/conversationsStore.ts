import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { UserLastMessage } from 'types/UserLastMessage'
import mockAxiosInstance from '../mocks/mockAxiosInstance'
import { shouldUseMockData } from '../utils/mockUtils'
import { db } from '../components/chatExample/firebase'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
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
}

export const useConversationsStore = create<ConversationsState>()(
  devtools(
    (set, get) => ({
      conversations: [],
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
          console.log('Using active subscription for conversations data')
          return
        }

        // If we don't need to refetch, return early
        if (!get().shouldRefetch(userId)) {
          console.log('Using cached conversations data')
          return
        }

        set({ loading: true, error: null })

        try {
          // Check if we should use mock data
          if (shouldUseMockData()) {
            const response = await mockAxiosInstance.get<UserLastMessage[]>(
              'lastMessages'
            )
            set({
              conversations: response.data,
              loading: false,
              lastFetched: Date.now(),
            })
            return
          }

          if (!userId) {
            console.error('No user ID provided')
            set({ conversations: [], loading: false })
            return
          }

          // Remove "auth0|" prefix from user ID if it exists
          const cleanCurrentUserId = userId.replace('auth0|', '')

          // Get conversations where the current user is a participant
          const conversationsRef = collection(db, 'conversations')
          const conversationsQuery = query(
            conversationsRef,
            where('participants', 'array-contains', cleanCurrentUserId),
            orderBy('lastMessageAt', 'desc')
          )
          const userConversations: UserLastMessage[] = []

          // Execute the query
          const querySnapshot = await getDocs(conversationsQuery)

          console.log('Firebase Query Results:', {
            totalDocuments: querySnapshot.size,
            documents: querySnapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            })),
          })

          // Get the userProfileStore instance
          const userProfileStore = useUserProfileStore.getState()

          // Process the results
          for (const doc of querySnapshot.docs) {
            const conversationData = doc.data()
            // console.log('Processing conversation document:', {id: doc.id, data: conversationData,})

            // Get the other participant's ID
            const otherParticipantId = conversationData.participants.find(
              (participantId: string) => participantId !== cleanCurrentUserId
            )

            // Add "auth0|" prefix if it's not already there
            const fullUserId = otherParticipantId.startsWith('auth0|')
              ? otherParticipantId
              : `auth0|${otherParticipantId}`

            // Fetch the user profile
            // console.log(`Fetching profile for user: ${fullUserId}`)
            const profile = await userProfileStore.fetchUserProfile(fullUserId)

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
            }

            // console.log(`Created UserLastMessage with profile data:`, {userId: fullUserId, hasProfile: !!profile, userMessage,})

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
          console.log(
            'Already subscribed to conversations, skipping subscription'
          )
          return
        }

        // If we're using mock data, don't set up a listener
        if (shouldUseMockData()) {
          console.log(
            'Using mock data, not setting up conversation subscription'
          )
          return
        }

        if (!userId) {
          console.error('No user ID provided for subscription')
          return
        }

        console.log('Subscribing to conversations for user:', userId)

        // Remove "auth0|" prefix from user ID if it exists
        const cleanCurrentUserId = userId.replace('auth0|', '')

        // Create a query for conversations where the current user is a participant
        const conversationsRef = collection(db, 'conversations')
        const conversationsQuery = query(
          conversationsRef,
          where('participants', 'array-contains', cleanCurrentUserId),
          orderBy('lastMessageAt', 'desc')
        )

        // Set up the listener
        set({ loading: true, error: null })

        const unsubscribe = onSnapshot(
          conversationsQuery,
          async (querySnapshot) => {
            try {
              console.log('Firebase Snapshot Update:', {
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
                console.log('Processing conversation document:', {
                  id: doc.id,
                  data: conversationData,
                })

                // Get the other participant's ID
                const otherParticipantId = conversationData.participants.find(
                  (participantId: string) =>
                    participantId !== cleanCurrentUserId
                )

                // Add "auth0|" prefix if it's not already there
                const fullUserId = otherParticipantId.startsWith('auth0|')
                  ? otherParticipantId
                  : `auth0|${otherParticipantId}`

                // Fetch the user profile
                // console.log(`Fetching profile for user: ${fullUserId}`)
                const profile = await userProfileStore.fetchUserProfile(
                  fullUserId
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
                }

                console.log(`Created UserLastMessage with profile data:`, {
                  userId: fullUserId,
                  hasProfile: !!profile,
                  userMessage,
                })

                userConversations.push(userMessage)
              }

              console.log(
                'Final processed user conversations:',
                userConversations
              )
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
        console.log(
          'Successfully subscribed to conversations for user:',
          userId
        )
      },

      unsubscribeFromConversations: () => {
        const { unsubscribe } = get()
        if (unsubscribe) {
          console.log('Unsubscribing from conversations')
          unsubscribe()
          set({ unsubscribe: null })
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
      console.log('Browser closing, unsubscribing from conversations')
      store.unsubscribeFromConversations()
    }
  })
}
