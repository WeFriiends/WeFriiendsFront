import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { db } from '../services/firebase'
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
  Timestamp,
} from 'firebase/firestore'
import { Chat, Message } from '../types/Chat'
import { shouldUseMockData } from '../utils/mockUtils'

interface FirestoreMessage {
  senderId: string
  receiverId: string
  text: string
  createdAt: any
  seen: boolean
}

interface ChatState {
  currentChat: Chat | null
  messagesCache: Record<string, Chat>
  loading: boolean
  error: Error | null
  unsubscribe: (() => void) | null
  subscribeToMessages: (conversationId: string) => void
  unsubscribeFromMessages: () => void
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
      unsubscribe: null,

      subscribeToMessages: (conversationId) => {
        // Check if we already have an active subscription
        if (get().unsubscribe) {
          console.log('Already subscribed to messages, unsubscribing first')
          get().unsubscribeFromMessages()
        }

        // If we're using mock data, don't set up a listener
        if (shouldUseMockData()) {
          console.log('Using mock data, not setting up messages subscription')
          return
        }

        if (!conversationId) {
          console.error('No conversation ID provided for subscription')
          return
        }

        // Check if we have this conversation in the cache
        const cachedChat = get().messagesCache[conversationId]
        if (cachedChat) {
          // console.log('Using cached messages for conversation:', conversationId)
          // todo: cache doesn't work normally, it shouldn't fire "Firebase Messages Snapshot Update" when switching between chats
          // Set currentChat from cache for immediate display
          // set({
          //   currentChat: cachedChat,
          //   loading: false,
          // })
          // Continue to set up the listener to receive updates
        }

        console.log('Subscribing to messages for conversation:', conversationId)

        // Create a query for messages in this conversation
        const messagesRef = collection(
          db,
          'conversations',
          conversationId,
          'messages'
        )
        const messagesQuery = query(messagesRef, orderBy('createdAt', 'asc'))

        // Set up the listener
        set({ loading: true, error: null })

        const unsubscribe = onSnapshot(
          messagesQuery,
          async (querySnapshot) => {
            try {
              console.log('🔥 Firebase Messages Snapshot Update:', {
                totalDocuments: querySnapshot.size,
                documents: querySnapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(),
                })),
              })

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

              // Update both currentChat and cache
              set((state) => ({
                currentChat: chat,
                messagesCache: {
                  ...state.messagesCache,
                  [conversationId]: chat,
                },
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
            set({
              error,
              loading: false,
            })
          }
        )

        // Store the unsubscribe function
        set({ unsubscribe })
        console.log(
          'Successfully subscribed to messages for conversation:',
          conversationId
        )
      },

      unsubscribeFromMessages: () => {
        const { unsubscribe, currentChat } = get()
        if (unsubscribe) {
          console.log('Unsubscribing from messages')

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

          unsubscribe()
          set({ unsubscribe: null, currentChat: null })
        }
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
          const docRef = await addDoc(messagesRef, {
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

          // Update the local cache with the new message
          const { currentChat, messagesCache } = get()

          // Create a new Message object for the sent message
          const newMessage: Message = {
            messageId: docRef.id,
            senderId: message.senderId,
            timestamp: new Date().toISOString(), // Use current time as timestamp
            message: message.text,
            readStatus: false,
          }

          // If we have a current chat and it matches the conversation ID, update it
          if (currentChat && currentChat.chatId === conversationId) {
            const updatedChat: Chat = {
              ...currentChat,
              messages: [...currentChat.messages, newMessage],
            }

            // Update both currentChat and cache
            set({
              currentChat: updatedChat,
              messagesCache: {
                ...messagesCache,
                [conversationId]: updatedChat,
              },
              loading: false,
            })
          }
          // If we have the conversation in cache but it's not the current chat, just update the cache
          else if (messagesCache[conversationId]) {
            const cachedChat = messagesCache[conversationId]
            const updatedChat: Chat = {
              ...cachedChat,
              messages: [...cachedChat.messages, newMessage],
            }

            set({
              messagesCache: {
                ...messagesCache,
                [conversationId]: updatedChat,
              },
              loading: false,
            })
          } else {
            // If we don't have the chat in cache, just set loading to false
            set({ loading: false })
          }
        } catch (error) {
          console.error('Error sending message:', error)
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

// Add event listener for beforeunload to unsubscribe when browser is closed
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    // Get the current store state and unsubscribe if needed
    const store = useChatStore.getState()
    if (store.unsubscribe) {
      console.log('Browser closing, unsubscribing from messages')
      store.unsubscribeFromMessages()
    }
  })
}
