export interface Chat {
  chatId: string
  participants: string[]
  messages: Message[]
}

export interface Message {
  messageId: string
  senderId: string
  timestamp: string
  message: string
  deliveryError?: boolean
  isSeen: boolean
  chatId: string
}
