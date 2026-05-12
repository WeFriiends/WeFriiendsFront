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
  readStatus: boolean
  deliveryError?: boolean
  isSeen: boolean
  chatId: string
}
