import React, { useState } from 'react'
import { Box, Button, TextareaAutosize } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'
import { UserChatProfile } from 'types/UserProfileData'
import DisplayingChat from './DisplayingChat'
import ChatHeader from './ChatHeader'
import { Chat } from 'types/Chat'
import { useChatStore } from '../../zustand/chatStore'
import { useAuth0 } from '@auth0/auth0-react'
import { useConversationsStore } from '../../zustand/conversationsStore'
import { cleanUserId } from '../../utils/userIdUtils'

interface ChatContainerProps {
  selectedChat: UserChatProfile
  onClose: () => void
  messages: Chat
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  selectedChat,
  onClose,
  messages,
}) => {
  const { classes } = useStyles()
  const [messageText, setMessageText] = useState('')
  const { user } = useAuth0()
  const userId = user?.sub || ''
  const sendMessage = useChatStore((state) => state.sendMessage)
  const loading = useChatStore((state) => state.loading)
  const { conversations } = useConversationsStore()

  // Find the conversation with the matching ID to get the conversationRef
  const conversation = conversations.find((conv) => conv.id === selectedChat.id)
  const conversationRef = conversation?.conversationRef

  // Use selectedChat.id as the receiverId
  const receiverId = selectedChat.id

  // Determine chatId - use conversationRef if available, otherwise fall back to messages.chatId
  const chatId = conversationRef || messages.chatId

  const handleSendMessage = async () => {
    if (!messageText.trim() || !receiverId) return

    if (!chatId) {
      console.error('No conversation reference found')
      return
    }

    // Remove "auth0|" prefix from userId for senderId
    const cleanSenderId = cleanUserId(userId)

    try {
      await sendMessage(chatId, {
        senderId: cleanSenderId,
        receiverId: receiverId,
        text: messageText,
        seen: false,
      })

      // Clear the textarea after sending
      setMessageText('')
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  return (
    <Box className={classes.wrapperChat}>
      <Box className={classes.topSpacePlaceholderProfile} />
      <ChatHeader selectedChat={selectedChat} onClose={onClose} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '20px',
          height: 'calc(100% - 200px)',
          flexGrow: 1,
        }}
      >
        {Object.keys(messages).length != 0 &&
          messages.participants.includes(receiverId) && (
            <>
              <DisplayingChat data={messages} userId={userId} />

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
            </>
          )}
      </Box>
    </Box>
  )
}

export default ChatContainer

const useStyles = makeStyles()({
  wrapperChat: {
    display: 'flex',
    flexDirection: 'column',
    top: 0,
    right: 0,
    left: 0,
    bottom: 56,
    background: theme.palette.common.white,
    position: 'fixed',
    [theme.breakpoints.up('md')]: {
      minHeight: 594,
      height: 'calc(100vh - 188px)',
      position: 'static',
      maxHeight: '100vh',
    },
  },
  topSpacePlaceholderProfile: {
    [theme.breakpoints.up('md')]: {
      height: 127,
    },
    [theme.breakpoints.up('lg')]: {
      height: 67,
    },
  },
  sendMessageSection: {
    display: 'flex',
    gap: 10,
    bottom: 0,
    alignItems: 'end',
    paddingBottom: 20,
    margin: '0 20px',
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
})
