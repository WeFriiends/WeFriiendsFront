export interface Conversation {
  id: string
  lastMessage: string
  conversationRef: string
  lastMessageSeen: boolean
}

export interface ConversationUserData {
  avatar: string
  name: string
  age: string
}
