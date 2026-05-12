import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Message } from 'types/Chat'
import { useAuth0 } from '@auth0/auth0-react'
import { formatTime } from 'utils/formatTime'
import { scrollbarStyles } from 'styles/globalScrollbar'
import { useEffect, useRef } from 'react'
import { useChatStore } from 'zustand/chatStore'
import Loader from 'common/components/Loader'
import { db } from 'services/firebase'
import { updateDoc, doc } from 'firebase/firestore'
import { useTheme } from '@mui/material/styles'

interface MessagesBoxProps {
  messages: Message[]
}

export function MessagesBox({ messages }: MessagesBoxProps) {
  const { classes } = useStyles()
  const { user } = useAuth0()
  const userId = user?.sub || ''
  const { loading, loadOlderMessages } = useChatStore()
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadOlderMessages()
        }
      },
      { threshold: 1.0 }
    )

    if (topRef.current) observer.observe(topRef.current)

    return () => observer.disconnect()
  }, [loadOlderMessages])

  useEffect(() => {
    bottomRef.current?.scrollIntoView()
  }, [messages, loading])

  useEffect(() => {
    if (!userId || messages.length === 0) return

    const markMessagesAsRead = async () => {
      const unreadMessages = messages.filter(
        (msg) => msg.senderId !== userId && !msg.isSeen
      )

      if (unreadMessages.length === 0) return

      const updates = unreadMessages
        .filter((msg) => msg.chatId)
        .map((msg) =>
          updateDoc(
            doc(db, 'conversations', msg.chatId, 'messages', msg.messageId),
            { isSeen: true }
          )
        )

      if (updates.length === 0) return

      await Promise.all(updates)
    }

    markMessagesAsRead()
  }, [messages, userId])

  return (
    <Box className={classes.messagesArea}>
      {loading && messages.length === 0 && <Loader />}
      <div className={classes.observer} ref={topRef} />
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
              <span>{formatTime(message.timestamp)}</span>

              {isMessageMine && (
                <span className={classes.statusIcons}>
                  {message.isSeen ? (
                    <span className={classes.doubleCheck}>✓✓</span>
                  ) : (
                    <span className={classes.singleCheck}>✓</span>
                  )}
                </span>
              )}
            </Typography>

            <div ref={bottomRef} />
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
    paddingRight: '5px',
    ...(scrollbarStyles(theme) as any),
    [theme.breakpoints.up('md')]: {
      height: '360px',
      minHeight: 'auto',
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
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
    color: theme.palette.text.primary,
    marginTop: 5,
  },
  sentDate: {
    textAlign: 'right',
  },
  receivedDate: {
    textAlign: 'left',
  },
  observer: {
    height: '10px',
    minHeight: '10px',
  },
  statusIcons: {
    marginLeft: '8px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  },
  singleCheck: {
    color: theme.palette.text.primary,
    fontSize: '14px',
  },
  doubleCheck: {
    color: theme.palette.primary.main,
    fontSize: '14px',
  },
}))
