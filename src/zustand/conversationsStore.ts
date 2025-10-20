import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { UserLastMessage } from 'types/UserLastMessage'
import mockAxiosInstance from '../mocks/mockAxiosInstance'
import { shouldUseMockData } from '../utils/mockUtils'
import { db } from '../components/chatExample/firebase'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { useUserProfileStore } from './userProfileStore'

interface ConversationsState {
  conversations: UserLastMessage[]
  loading: boolean
  error: Error | null
  fetchConversations: (userId?: string) => Promise<void>
}

export const useConversationsStore = create<ConversationsState>()(
  devtools(
    (set) => ({
      conversations: [],
      loading: false,
      error: null,

      fetchConversations: async (userId?: string) => {
        set({ loading: true, error: null })

        try {
          // Check if we should use mock data
          if (shouldUseMockData()) {
            const response = await mockAxiosInstance.get<UserLastMessage[]>(
              'lastMessages'
            )
            set({ conversations: response.data, loading: false })
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
            console.log('Processing conversation document:', {
              id: doc.id,
              data: conversationData,
            })

            // Get the other participant's ID
            const otherParticipantId = conversationData.participants.find(
              (participantId: string) => participantId !== cleanCurrentUserId
            )

            // Add "auth0|" prefix if it's not already there
            const fullUserId = otherParticipantId.startsWith('auth0|')
              ? otherParticipantId
              : `auth0|${otherParticipantId}`

            // Fetch the user profile
            console.log(`Fetching profile for user: ${fullUserId}`)
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

            console.log(`Created UserLastMessage with profile data:`, {
              userId: fullUserId,
              hasProfile: !!profile,
              userMessage,
            })

            userConversations.push(userMessage)
          }

          console.log('Final processed user conversations:', userConversations)
          set({ conversations: userConversations, loading: false })
        } catch (error) {
          console.error('Error fetching data for conversations:', error)
          set({
            error: error instanceof Error ? error : new Error(String(error)),
            loading: false,
          })
        }
      },
    }),
    { name: 'conversations-store' }
  )
)
