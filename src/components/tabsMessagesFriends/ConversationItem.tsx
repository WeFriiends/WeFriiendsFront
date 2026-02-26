import { Avatar, Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Conversation } from 'types/Conversation'
import { useChatStore } from 'zustand/chatStore'
import { UnreadMessageIndicator } from './UnreadMessageIndicator'

interface ConversationItemProps {
  conversation: Conversation
}

export function ConversationItem({ conversation }: ConversationItemProps) {
  const { classes } = useStyles()
  const { selectedChatId, setSelectedChatId } = useChatStore()

  function handleClick() {
    setSelectedChatId(conversation.id)
  }

  return (
    <button
      key={conversation.id}
      onClick={handleClick}
      className={classes.button}
    >
      <Box
        className={`${classes.conversationBlock} ${
          selectedChatId === conversation.id ? classes.selected : ''
        }`}
      >
        <Avatar src={conversation.avatar} sx={{ width: 66, height: 66 }} />
        <Box className={classes.conversationContent}>
          <Typography className={classes.name}>
            {conversation.name}, {conversation.age}
          </Typography>
          <Typography className={classes.conversationText}>
            {conversation.lastMessage}
          </Typography>
        </Box>
        {conversation.messageCount === '1' && <UnreadMessageIndicator />}
      </Box>
    </button>
  )
}

const useStyles = makeStyles()((theme) => ({
  button: { border: 'none', background: 'none', width: '100%', padding: 0 },
  conversationBlock: {
    display: 'grid',
    gridTemplateColumns: '66px 1fr 30px',
    alignItems: 'center',
    padding: '25px 20px',
    borderBottom: '1px solid #EEE',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: theme.customPalette.authBtnBgHover,
    },
  },
  selected: {
    backgroundColor: theme.customPalette.authBtnBg,
    '&:hover': {
      backgroundColor: theme.customPalette.authBtnBg,
    },
  },
  conversationContent: {
    paddingLeft: 15,
    paddingRight: 19,
    minWidth: 0,
    textAlign: 'left',
  },
  name: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.palette.text.primary,
    lineHeight: '40px',
  },
  conversationText: {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.body2.fontWeight,
    lineHeight: theme.typography.body2.lineHeight,
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))
