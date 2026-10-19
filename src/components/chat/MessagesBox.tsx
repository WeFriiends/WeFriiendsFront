import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Message } from 'types/Chat'
import { useAuth0 } from '@auth0/auth0-react'
import { formatTime, formatMessageDate } from 'utils/formatTime'
import { scrollbarStyles } from 'styles/globalScrollbar'
import { useEffect, useRef, useLayoutEffect } from 'react'
import { useChatStore } from 'zustand/chatStore'
import Loader from 'common/components/Loader'
import { db } from 'services/firebase'
import { updateDoc, doc } from 'firebase/firestore'
import { SingleCheck } from 'common/svg/SingleCheck'
import { DoubleCheck } from 'common/svg/DoubleCheck'
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
  const containerRef = useRef<HTMLDivElement>(null)

  const prevMessagesLengthRef = useRef(messages.length)
  const scrollHeightBeforeLoadRef = useRef(0)
  const isAtBottomRef = useRef(true)

  const theme = useTheme()

  const handleScroll = () => {
    const container = containerRef.current
    if (!container) return

    const distanceToBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight
    isAtBottomRef.current = distanceToBottom <= 50
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && containerRef.current && !loading) {
          scrollHeightBeforeLoadRef.current = containerRef.current.scrollHeight
          loadOlderMessages()
        }
      },
      { threshold: 0 }
    )

    const currentTopRef = topRef.current
    if (currentTopRef) {
      observer.observe(currentTopRef)
    }

    return () => {
      if (currentTopRef) {
        observer.unobserve(currentTopRef)
      }
    }
  }, [loadOlderMessages, loading])

  const isFirstMountRef = useRef(true)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const currentLength = messages.length
    const hasLoadedOlderMessages = scrollHeightBeforeLoadRef.current > 0
    const lastMessage = messages[messages.length - 1]
    const isOwnMessage = lastMessage?.senderId === userId

    if (hasLoadedOlderMessages) {
      const heightDifference =
        container.scrollHeight - scrollHeightBeforeLoadRef.current
      container.scrollTop += heightDifference
      scrollHeightBeforeLoadRef.current = 0
    } else if (isFirstMountRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: 'auto' })
      isFirstMountRef.current = false
    } else {
      const hasNewMessages = currentLength > prevMessagesLengthRef.current
      if (hasNewMessages) {
        if (isOwnMessage || isAtBottomRef.current) {
          bottomRef.current?.scrollIntoView({ behavior: 'auto' })
        }
      }
    }

    prevMessagesLengthRef.current = currentLength
  }, [messages, userId])

  useEffect(() => {
    if (!userId || messages.length === 0) return

    const markMessagesAsRead = async () => {
      const unreadMessages = messages.filter(
        (msg) => msg.senderId !== userId && !msg.isSeen
      )

      if (unreadMessages.length === 0) return

      const updates = unreadMessages.map((msg) =>
        updateDoc(
          doc(db, 'conversations', msg.chatId, 'messages', msg.messageId),
          { isSeen: true }
        )
      )

      try {
        await Promise.all(updates)
      } catch (error) {
        console.error('Failed to mark messages as read:', error)
      }
    }

    markMessagesAsRead()
  }, [messages, userId])

  const groupedMessages = messages.reduce<
    { date: string; messages: Message[] }[]
  >((groups, message) => {
    const date = formatMessageDate(message.timestamp)
    const lastGroup = groups[groups.length - 1]

    if (lastGroup?.date === date) {
      lastGroup.messages.push(message)
    } else {
      groups.push({ date, messages: [message] })
    }

    return groups
  }, [])

  return (
    <Box
      ref={containerRef}
      onScroll={handleScroll}
      className={classes.messagesArea}
    >
      {loading && messages.length === 0 && <Loader />}

      <div className={classes.observer} ref={topRef} />

      {groupedMessages.map((group) => (
        <Box key={`${group.date}`} className={classes.messageGroup}>
          <Typography className={classes.dateDivider}>{group.date}</Typography>

          {group.messages.map((message) => {
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
                        <DoubleCheck color={theme.palette.primary.main} />
                      ) : (
                        <SingleCheck color={theme.palette.text.primary} />
                      )}
                    </span>
                  )}
                </Typography>
              </Box>
            )
          })}
        </Box>
      ))}

      <div ref={bottomRef} />
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
  messageGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  dateDivider: {
    margin: '16px 0',
    fontSize: '12px',
    color: theme.palette.text.secondary,
    textAlign: 'center',
  },
  message: {
    maxWidth: '85%',
    padding: '12px',
    borderRadius: '10px',
    wordWrap: 'break-word',
    gap: '10px',
    [theme.breakpoints.up('md')]: {
      gap: '14px',
    },
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
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
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
    marginLeft: '2px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2px',
    verticalAlign: 'middle',
    lineHeight: 1,
  },
}))
