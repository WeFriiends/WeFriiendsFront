import { create } from 'zustand'
import { db } from '../components/chatExample/firebase'
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore'

interface CachedMessages {
  [roomId: string]: {
    messages: any[]
    timestamp: number
  }
}

interface Message {
  senderId: string
  receiverId: string
  text: string
  createdAt: any
  seen: boolean
}

interface ChatStore {
  cache: CachedMessages
  setCache: (roomId: string, messages: any[]) => void
  getCachedMessages: (
    roomId: string
  ) => { messages: any[]; timestamp: number } | null
  sendMessage: (
    conversationId: string,
    message: Omit<Message, 'createdAt'>
  ) => Promise<void>
  loading: boolean
  error: Error | null
}

export const useChatStore = create<ChatStore>((set, get) => ({
  cache: {},
  loading: false,
  error: null,

  setCache: (roomId, messages) => {
    set((state) => ({
      cache: {
        ...state.cache,
        [roomId]: {
          messages,
          timestamp: Date.now(),
        },
      },
    }))
  },

  getCachedMessages: (roomId) => {
    const cached = get().cache[roomId]
    if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
      return cached
    }
    return null
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

      set({ loading: false })
    } catch (error) {
      console.error('Error sending message:', error)
      set({
        error: error instanceof Error ? error : new Error(String(error)),
        loading: false,
      })
    }
  },
}))
