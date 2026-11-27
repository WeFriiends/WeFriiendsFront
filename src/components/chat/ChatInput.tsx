import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Box, IconButton, TextareaAutosize } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Conversation } from 'types/Conversation'
import { useChatStore } from 'zustand/chatStore'
import { useConversationsStore } from 'zustand/conversationsStore'
import { Chat } from 'types/Chat'
import { useSnackbarStore } from 'zustand/snackbarStore'
import { IconSend } from 'common/svg/IconSend'

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
  const { sendMessage, isMessageSending } = useChatStore()

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

    const textToSend = messageText.trim()

    setMessageText('')

    try {
      await sendMessage(chatId, {
        senderId: userId,
        receiverId: chat.id,
        text: textToSend,
        isSeen: false,
      })
    } catch (error) {
      setMessageText(textToSend)
      useSnackbarStore
        .getState()
        .showSnackbar('Failed to send message', 'error')
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
      <IconButton
        aria-label="Send message"
        onClick={handleSendMessage}
        className={classes.sendBtn}
        disabled={isMessageSending || !messageText.trim()}
      >
        <IconSend />
      </IconButton>
    </Box>
  )
}

const useStyles = makeStyles()((theme) => ({
  sendMessageSection: {
    display: 'flex',
    alignItems: 'flex-end',
    borderRadius: 10,
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.customPalette.colorInputGrey}`,
    [theme.breakpoints.up('md')]: {
      margin: 0,
    },
  },
  textArea: {
    fontFamily: 'Inter',
    fontSize: 20,
    lineHeight: 1.4,
    fontWeight: 400,
    padding: 10,
    outline: 'none',
    flexGrow: 1,
    resize: 'none',
    border: 0,
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    '&::placeholder': {
      color: theme.customPalette.colorPlaceholderText,
      opacity: 1,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 14,
    },
    [theme.breakpoints.up('md')]: {
      padding: 11,
    },
  },
  sendBtn: {
    margin: 4,
    color: theme.palette.secondary.main,
    '&.Mui-disabled': {
      color: theme.customPalette.colorPlaceholderText,
    },
  },
}))
