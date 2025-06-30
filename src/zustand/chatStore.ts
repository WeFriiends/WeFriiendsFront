import { create } from 'zustand'

interface CachedMessages {
  [roomId: string]: {
    messages: any[]
    timestamp: number
  }
}

interface ChatStore {
  cache: CachedMessages
  setCache: (roomId: string, messages: any[]) => void
  getCachedMessages: (
    roomId: string
  ) => { messages: any[]; timestamp: number } | null
}

export const useChatStore = create<ChatStore>((set, get) => ({
  cache: {},

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
}))
