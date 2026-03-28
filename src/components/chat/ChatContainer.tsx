import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { MessagesBox } from './MessagesBox'
import { ChatHeader } from './ChatHeader'
import { useChatStore } from '../../zustand/chatStore'
import { StartChatting } from './StartChatting'
import { ChatInput } from './ChatInput'
import { Conversation } from 'types/Conversation'

interface ChatContainer {
  chat: Conversation
}

export function ChatContainer({ chat }: ChatContainer) {
  const { classes } = useStyles()
  const { currentChat } = useChatStore()
  const chatData = currentChat || { chatId: '', participants: [], messages: [] }
  return (
    <Box className={classes.container}>
      <Box className={classes.topSpacePlaceholderProfile} />
      <ChatHeader chat={chat} />
      <Box className={classes.innerContainer}>
        {chatData && Object.keys(chatData).length !== 0 && (
          <>
            {chatData.messages.length === 0 && <StartChatting />}
            <MessagesBox messages={chatData.messages} />
            <ChatInput chat={chat} chatData={chatData} />
          </>
        )}
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
    },
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px',
    flexGrow: 1,
    padding: '24px 24px',
    height: 'calc(100vh - 500px)',
  },
  topSpacePlaceholderProfile: {
    [theme.breakpoints.up('md')]: {
      height: 127,
    },
    [theme.breakpoints.up('lg')]: {
      height: 67,
    },
  },
}))
