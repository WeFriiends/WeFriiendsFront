import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { db } from '../services/firebase'
import { useConversationsStore } from './conversationsStore'
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
  getDoc,
  getDocs,
  Timestamp,
} from 'firebase/firestore'
import { Chat, Message } from '../types/Chat'

interface FirestoreMessage {
  senderId: string
  receiverId: string
  text: string
  createdAt: any
  seen: boolean
}

interface ChatState {
  currentChat: Chat | null
  // messagesCache: Record<string, Chat>
  messagesCache: Record<string, Chat | undefined>
  loading: boolean
  error: Error | null
  // Map of conversation IDs to unsubscribe functions
  subscriptions: Record<string, () => void>
  // store document subscriptions separately
  conversationSubscriptions: Record<string, () => void>
  // Selected chat ID for decoupled components
  selectedChatId: string | null
  setSelectedChatId: (chatId: string | null) => void
  subscribeToMessages: (conversationId: string) => void
  unsubscribeFromMessages: () => void
  refreshMessages: (conversationId: string) => Promise<void>
  sendMessage: (
    conversationId: string,
    message: Omit<FirestoreMessage, 'createdAt'>
  ) => Promise<void>
}

export const useChatStore = create<ChatState>()(
  devtools(
    (set, get) => ({
      currentChat: null,
      messagesCache: {},
      loading: false,
      error: null,
      subscriptions: {},
      conversationSubscriptions: {},
      selectedChatId: null,

      setSelectedChatId: (chatId) => {
        set({ selectedChatId: chatId })

        // If we have a chat ID, update currentChat and subscribe to messages for that conversation
        if (chatId) {
          const { conversations } = useConversationsStore.getState()
          const conversation = conversations.find((conv) => conv.id === chatId)
          if (conversation && conversation.conversationRef) {
            const { conversationRef } = conversation

            // Check if we have this conversation in the cache
            const { messagesCache } = get()
            const cachedChat = messagesCache[conversationRef]

            if (cachedChat) {
              // If we have the conversation in the cache, update currentChat immediately
              console.log(
                'Using cached messages for conversation:',
                conversationRef
              )
              set({
                currentChat: cachedChat,
                loading: false,
              })
            } else {
              // If we don't have the conversation in the cache, create an empty chat object
              // This will be updated when the subscription receives data from Firebase
              console.log(
                'Creating empty chat object for conversation:',
                conversationRef
              )
              set({
                currentChat: {
                  chatId: conversationRef,
                  participants: [chatId], // Add the selected chat ID as a participant
                  messages: [],
                },
                loading: true,
              })
            }

            // Subscribe to messages for this conversation
            get().subscribeToMessages(conversationRef)
          }
        } else {
          // If we don't have a chat ID, clear the currentChat
          set({ currentChat: null })
        }
      },

      refreshMessages: async (conversationId) => {
        if (!conversationId) {
          console.error('No conversation ID provided for refresh')
          return
        }

        console.log('Refreshing messages for conversation:', conversationId)
        set({ loading: true, error: null })

        try {
          // Create a query for messages in this conversation
          const messagesRef = collection(
            db,
            'conversations',
            conversationId,
            'messages'
          )
          const messagesQuery = query(messagesRef, orderBy('createdAt', 'asc'))

          // Get the messages
          const querySnapshot = await getDocs(messagesQuery)

          // Convert the messages to the format expected by the Chat interface
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
          }) as Message[]

          // Create a Chat object
          const chat: Chat = {
            chatId: conversationId,
            participants: [], // This will be populated from the conversation document
            messages,
          }

          // Get the conversation document to get the participants
          const conversationRef = doc(db, 'conversations', conversationId)
          const conversationDoc = await getDoc(conversationRef)
          if (conversationDoc.exists()) {
            const conversationData = conversationDoc.data()
            chat.participants = conversationData.participants || []
          }

          // Update the cache
          set((state) => ({
            messagesCache: {
              ...state.messagesCache,
              [conversationId]: chat,
            },
            loading: false,
          }))
        } catch (error) {
          console.error('Error refreshing messages:', error)
          set({
            error: error instanceof Error ? error : new Error(String(error)),
            loading: false,
          })
        }
      },

      subscribeToMessages: (conversationId) => {
        const { subscriptions, messagesCache, conversationSubscriptions } =
          get()

        if (conversationSubscriptions[conversationId]) {
          return
        } else {
          const conversationRef = doc(db, 'conversations', conversationId)
          const unsubscribeConversation = onSnapshot(
            conversationRef,
            (docSnapshot) => {
              if (!docSnapshot.exists()) {
                const state = get()

                if (state.subscriptions[conversationId]) {
                  state.subscriptions[conversationId]()
                }

                set((state) => {
                  const newSubscriptions = { ...state.subscriptions }
                  delete newSubscriptions[conversationId]

                  const newConversationSubscriptions = {
                    ...state.conversationSubscriptions,
                  }
                  delete newConversationSubscriptions[conversationId]

                  const newMessagesCache = { ...state.messagesCache }
                  delete newMessagesCache[conversationId]

                  return {
                    subscriptions: newSubscriptions,
                    conversationSubscriptions: newConversationSubscriptions,
                    messagesCache: newMessagesCache,
                    currentChat:
                      state.currentChat?.chatId === conversationId
                        ? null
                        : state.currentChat,
                  }
                })
              }
            }
          )

          set((state) => ({
            conversationSubscriptions: {
              ...state.conversationSubscriptions,
              [conversationId]: unsubscribeConversation,
            },
          }))
        }

        if (subscriptions[conversationId]) {
          if (messagesCache[conversationId]) {
            set({
              currentChat: messagesCache[conversationId],
              loading: false,
            })
          }
          return
        }

        if (!conversationId) {
          console.error('No conversation ID provided for subscription')
          return
        }

        const cachedChat = get().messagesCache[conversationId]
        if (cachedChat) {
          set({
            currentChat: cachedChat,
            loading: false,
          })
        }

        const messagesRef = collection(
          db,
          'conversations',
          conversationId,
          'messages'
        )
        const messagesQuery = query(messagesRef, orderBy('createdAt', 'asc'))

        set({ loading: true, error: null })

        const unsubscribeSnapshot = onSnapshot(
          messagesQuery,
          { includeMetadataChanges: false },
          async (querySnapshot) => {
            try {
              if (querySnapshot.metadata.hasPendingWrites) return

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
              }) as Message[]

              let participants: string[] = []
              const conversationDoc = await getDoc(
                doc(db, 'conversations', conversationId)
              )
              if (conversationDoc.exists()) {
                participants = conversationDoc.data().participants || []
              }

              const chat: Chat = {
                chatId: conversationId,
                participants,
                messages,
              }

              set((state) => ({
                messagesCache: {
                  ...state.messagesCache,
                  [conversationId]: chat,
                },
                currentChat:
                  state.currentChat?.chatId === conversationId
                    ? chat
                    : state.currentChat,
                loading: false,
              }))
            } catch (error) {
              console.error('Error processing messages snapshot:', error)
              set({
                error:
                  error instanceof Error ? error : new Error(String(error)),
                loading: false,
              })
            }
          },
          (error) => {
            console.error('Error in messages snapshot listener:', error)
            set({ error, loading: false })
          }
        )

        set((state) => ({
          subscriptions: {
            ...state.subscriptions,
            [conversationId]: unsubscribeSnapshot,
          },
        }))
      },

      unsubscribeFromMessages: () => {
        const { subscriptions, conversationSubscriptions, currentChat } = get()

        // Отписываемся от всех подписок на сообщения
        Object.values(subscriptions).forEach((unsubscribe) => {
          if (unsubscribe) unsubscribe()
        })

        // отписываемся от всех подписок на документы чатов
        Object.values(conversationSubscriptions).forEach((unsubscribe) => {
          if (unsubscribe) unsubscribe()
        })

        // Store current chat in cache if it exists
        if (currentChat) {
          console.log(
            'Storing messages in cache for conversation:',
            currentChat.chatId
          )
          set((state) => ({
            messagesCache: {
              ...state.messagesCache,
              [currentChat.chatId]: currentChat,
            },
          }))
        }

        set({
          subscriptions: {},
          conversationSubscriptions: {},
          currentChat: null,
        })
      },

      sendMessage: async (conversationId, message) => {
        set({ loading: true, error: null })
        try {
          // Add message to the messages subcollection
          const messagesRef = collection(
            db,
            'conversations',
            conversationId,
            'messages'
          )

          await addDoc(messagesRef, {
            senderId: message.senderId,
            receiverId: message.receiverId,
            text: message.text,
            createdAt: serverTimestamp(),
            seen: false,
          })

          // Update the conversation document with the last message info
          const conversationRef = doc(db, 'conversations', conversationId)
          await updateDoc(conversationRef, {
            lastMessage: message.text,
            lastMessageAt: serverTimestamp(),
            lastMessageSeen: false,
          })

          // We don't need to update the local state here
          // The onSnapshot listener will handle updating the UI when Firebase sends the update
          // This prevents the duplicate message issue
          set({ loading: false })

          // Log for debugging
          console.log(
            '✅ Message sent to Firebase, waiting for snapshot update'
          )
        } catch (error) {
          console.error('❌ Error sending message:', error)
          set({
            error: error instanceof Error ? error : new Error(String(error)),
            loading: false,
          })
        }
      },
    }),
    { name: 'chat-store' }
  )
)

// Track if the app is being closed (not just a tab)
let isAppClosing = false

// Add event listeners to detect when the app is closed vs when a tab is switched
if (typeof window !== 'undefined') {
  // When visibility changes (tab switch, minimize), mark that we're not closing the app
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      isAppClosing = false
    }
  })

  // When page is about to unload and we haven't detected a tab switch,
  // it's likely the app is closing
  window.addEventListener('beforeunload', () => {
    // Get the current store state and unsubscribe if needed
    const store = useChatStore.getState()
    if (Object.keys(store.subscriptions).length > 0 && isAppClosing) {
      console.log('App closing, unsubscribing from all conversations')
      store.unsubscribeFromMessages()
    }
  })

  // Set isAppClosing to true when the page is focused
  // This helps distinguish between tab switching and app closing
  window.addEventListener('focus', () => {
    isAppClosing = true
  })

  // Initialize isAppClosing based on current visibility state
  isAppClosing = document.visibilityState === 'visible'
}
