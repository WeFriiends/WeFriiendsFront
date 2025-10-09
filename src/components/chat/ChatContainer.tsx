import React, { useState } from 'react'
import { Box, Button, TextareaAutosize } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'
import { UserChatProfile } from 'types/UserProfileData'
import StartChatting from './StartChatting'
import DisplayingChat from './DisplayingChat'
import ChatHeader from './ChatHeader'
import { Chat } from 'types/Chat'

interface ChatContainerProps {
  selectedChat: UserChatProfile
  onClose: () => void
  messages: Chat
  userId: string
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  selectedChat,
  onClose,
  messages,
  userId,
}) => {
  const { classes } = useStyles()
  const [messageText, setMessageText] = useState('')

  const friendId = messages.participants.find((el) => el !== userId)

  const handleSendMessage = () => {
    // Here you would typically send the message to your backend
    // For now, we'll just clear the textarea
    setMessageText('')
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
        {Object.keys(messages).length != 0 && selectedChat?.id === friendId ? (
          <DisplayingChat data={messages} userId={userId} />
        ) : (
          <StartChatting />
        )}
        <Box className={classes.sendMessageSection}>
          <TextareaAutosize
            minRows={1}
            maxRows={10}
            placeholder="Type a message"
            className={classes.textArea}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <Button onClick={handleSendMessage} className={classes.sendBtn}>
            Send
          </Button>
        </Box>
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
