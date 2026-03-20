import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Box, Button, TextareaAutosize } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Conversation } from 'types/Conversation'
import { useChatStore } from 'zustand/chatStore'
import { useConversationsStore } from 'zustand/conversationsStore'
import { Chat } from 'types/Chat'

interface ChatInputProps {
  chat: Conversation
  chatData: Chat
}

export function ChatInput({ chat, chatData }: ChatInputProps) {
  const { classes } = useStyles()
  const { user } = useAuth0()
  const userId = user?.sub || ''
  const [messageText, setMessageText] = useState('')
  const { conversations } = useConversationsStore()
  const { sendMessage, loading } = useChatStore()

  async function handleSendMessage() {
    // Find the conversation with the matching ID to get the conversationRef
    const conversation = conversations.find((conv) => conv.id === chat.id)
    const conversationRef = conversation?.conversationRef
    // Determine chatId - use conversationRef if available, otherwise fall back to chatData.chatId
    const chatId = conversationRef || chatData.chatId

    if (!messageText.trim()) {
      return
    }

    if (!chatId) {
      console.error('No conversation reference found')
      return
    }

    try {
      await sendMessage(chatId, {
        senderId: userId,
        receiverId: chat.id,
        text: messageText,
        seen: false,
      })

      setMessageText('')
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  return (
    <Box className={classes.sendMessageSection}>
      <TextareaAutosize
        minRows={1}
        maxRows={10}
        placeholder="Type a message"
        className={classes.textArea}
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
          }
        }}
      />
      <Button
        onClick={handleSendMessage}
        className={classes.sendBtn}
        disabled={loading || !messageText.trim()}
      >
        {loading ? 'Sending...' : 'Send'}
      </Button>
    </Box>
  )
}

const useStyles = makeStyles()((theme) => ({
  sendMessageSection: {
    display: 'flex',
    gap: 10,
    bottom: 0,
    alignItems: 'end',
    [theme.breakpoints.up('md')]: {
      margin: 0,
    },
  },
  textArea: {
    fontFamily: 'Inter',
    fontSize: 20,
    lineHeight: '18px',
    fontWeight: 400,
    padding: 10,
    borderRadius: 10,
    outline: 'none',
    flexGrow: 10,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #C5C5C5',
    '&::placeholder': {
      color: theme.customPalette.colorPlaceholderText,
      opacity: 1,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 14,
    },
    [theme.breakpoints.up('md')]: {
      padding: 11,
      backgroundColor: '#eee',
      color: theme.palette.text.primary,
      border: 0,
    },
  },
  sendBtn: {
    border: '1px solid' + theme.palette.primary.dark,
    width: 86,
    height: 40,
    borderRadius: 10,
    padding: '6px 40.5px',
    textTransform: 'lowercase',
    fontSize: 16,
    lineHeight: '40px',
    fontWeight: 600,
    color: theme.palette.primary.dark,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
  },
}))
