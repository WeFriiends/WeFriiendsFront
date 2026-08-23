import { useEffect } from 'react'
import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { MessagesBox } from './MessagesBox'
import { ChatHeader } from './ChatHeader'
import { useChatStore } from '../../zustand/chatStore'
import { useConversationsStore } from '../../zustand/conversationsStore'
import { StartChatting } from './StartChatting'
import { ChatInput } from './ChatInput'
import { Conversation } from 'types/Conversation'

interface ChatContainerProps {
  chat: Conversation
}

export function ChatContainer({ chat }: ChatContainerProps) {
  const { classes } = useStyles()
  const { currentChat, loading } = useChatStore()
  const chatData = currentChat || { chatId: '', participants: [], messages: [] }

  // Reset the conversation-level unread indicator (envelope + header dot)
  // whenever this chat is open and the last message came from the other user.
  // Driven by the conversation itself, so it works regardless of which
  // messages are currently loaded in the paginated window.
  useEffect(() => {
    if (chat.messageCount > 0) {
      useConversationsStore
        .getState()
        .markConversationAsRead(chat.conversationRef)
    }
  }, [chat.messageCount, chat.conversationRef])
  return (
    <Box className={classes.container}>
      <ChatHeader chat={chat} />
      <Box className={classes.innerContainer}>
        <>
          {chatData.messages.length === 0 && !loading && <StartChatting />}

          <MessagesBox messages={chatData.messages} />
          <ChatInput chat={chat} chatData={chatData} />
        </>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    top: 0,
    right: 0,
    left: 0,
    bottom: 56,
    background: theme.palette.common.white,
    position: 'fixed',
    [theme.breakpoints.up('md')]: {
      position: 'static',
      height: 'calc(100vh - 170px)',
    },
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px',
    flexGrow: 1,
    padding: '24px 24px',
    marginBottom: '16px',
    minHeight: 0,
    [theme.breakpoints.up('md')]: {
      height: 'calc(100vh - 220px)',
      maxHeight: 'calc(100vh - 240px)',
      padding: 0,
    },
  },
}))
