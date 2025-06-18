// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, onValue, set } from 'firebase/database'
import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
  Button,
  TextareaAutosize,
  Typography,
} from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../../../styles/createTheme'
import ChatMenu from '../../chat/ChatMenu'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

interface Message {
  id: string
  sender: string
  message: string
  timestamp: number
}

interface ChatComponentProps {
  roomId: string
  userName: string // Add userName prop
}

function ChatComponent({ roomId, userName }: ChatComponentProps) {
  const { classes } = useStyles()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const messagesRef = ref(db, `rooms/${roomId}/messages`) // Reference to messages in the specific room

  useEffect(() => {
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val()
      if (isObject(data)) {
        const messagesArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        })) as Message[]
        setMessages(messagesArray)
      } else {
        setMessages([])
      }
    })

    return () => unsubscribe()
  }, [roomId, messagesRef]) // Include roomId in dependency array

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(event.target.value)
  }

  function isObject(value: any): value is object {
    return typeof value === 'object' && value !== null
  }

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessageRef = push(messagesRef)
      set(newMessageRef, {
        sender: userName, // Use userName prop for sender
        message: newMessage,
        timestamp: Date.now(),
        readStatus: false,
      })
      setNewMessage('')
    }
  }

  return (
    <>
      <Box>
        <Box className={classes.header}>
          <Box className={classes.userInHeader}>
            <Avatar
              src={'/img/photo_Elena.jpg'}
              sx={{ width: 50, height: 50 }}
            />
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: 20,
              }}
            >
              {roomId}, {userName} {' is chatting'}
            </Typography>
          </Box>
          <ChatMenu />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <Box className={classes.messagesArea}>
            {messages.map((message: Message) => (
              <Box
                key={message.id}
                sx={{
                  alignSelf:
                    message.sender === userName ? 'flex-end' : 'flex-start',
                  backgroundColor:
                    message.sender === userName ? '#FEDED2' : '#EEEEEE',
                }}
                className={classes.message}
              >
                <Typography className={classes.messageAuthor}>
                  {message.sender}
                  {': '}
                </Typography>
                <Typography className={classes.messageText}>
                  {message.message}
                </Typography>
                <Typography
                  className={classes.messageDate}
                  sx={{
                    textAlign: message.sender === userName ? 'right' : 'left',
                  }}
                >
                  {new Date(message.timestamp).toLocaleString([], {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box className={classes.sendMessageSection}>
            <TextareaAutosize
              minRows={1}
              maxRows={10}
              placeholder={`Type a message as ${userName}`}
              className={classes.textArea}
              value={newMessage}
              onChange={handleInputChange}
            />
            <img src="/img/messages/lol.svg" alt="lol" />
            <Button
              onClick={sendMessage}
              className={classes.sendBtn}
              variant="outlined"
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ChatComponent

const useStyles = makeStyles()({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginTop: -78,
    paddingLeft: 22,
  },
  userInHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
  },
  messagesArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: 31,
    padding: '13px 22px 12px',
    overflow: 'auto',
  },
  message: {
    maxWidth: '85%',
    padding: '12px',
    borderRadius: '10px',
  },
  messageAuthor: {
    fontSize: '11px',
    lineHeight: '18.2px',
    color: theme.palette.text.primary,
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
  sendMessageSection: {
    display: 'flex',
    gap: 20,
    bottom: 0,
    padding: '0 0 40px 15px',
    alignItems: 'end',
  },
  textArea: {
    width: 328,
    backgroundColor: ' #EEEEEE',
    color: theme.palette.text.primary,
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 1.3,
    fontWeight: 400,
    padding: '15px 18px',
    border: 'none',
    borderRadius: 10,
    outline: 'none',
  },
  sendBtn: {
    border: '2px solid  #F1562A',
    borderRadius: 10,
    padding: '6px 40.5px',
    textTransform: 'lowercase',
    fontSize: 16,
    lineHeight: 1.5,
    fontWeight: 600,
  },
})
