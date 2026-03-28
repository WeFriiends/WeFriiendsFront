import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Message } from 'types/Chat'
import { useAuth0 } from '@auth0/auth0-react'
import { formatTimestamp } from 'utils/formatTimestamp'

interface MessagesBoxProps {
  messages: Message[]
}

export function MessagesBox({ messages }: MessagesBoxProps) {
  const { classes } = useStyles()
  const { user } = useAuth0()
  const userId = user?.sub || ''
  return (
    <Box className={classes.messagesArea}>
      {messages.map((message) => {
        const isMessageMine = message.senderId === userId
        return (
          <Box
            key={message.messageId}
            className={`${classes.message} ${
              isMessageMine ? classes.sentMessage : classes.receivedMessage
            }`}
          >
            <Typography className={classes.messageText}>
              {message.message}
            </Typography>
            <Typography
              className={`${classes.messageDate} ${
                isMessageMine ? classes.sentDate : classes.receivedDate
              }`}
            >
              {formatTimestamp(message.timestamp)}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}

const useStyles = makeStyles()((theme) => ({
  messagesArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flex: 1,
    overflow: 'auto',
    overscrollBehavior: 'contain',
    [theme.breakpoints.up('md')]: {
      maxHeight: 'calc(100vh - 500px)',
      minHeight: 400,
    },
  },
  message: {
    maxWidth: '85%',
    padding: '12px',
    borderRadius: '10px',
    wordWrap: 'break-word',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FEDED2',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEEEEE',
  },
  messageText: {
    fontSize: '14px',
    lineHeight: '18.2px',
    color: theme.palette.text.primary,
  },
  messageDate: {
    fontSize: '12px',
    lineHeight: '15.6px',
    color: 'rgba(68, 68, 68, 0.8)',
    marginTop: 5,
  },
  sentDate: {
    textAlign: 'right',
  },
  receivedDate: {
    textAlign: 'left',
  },
}))
