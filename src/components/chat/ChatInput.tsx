import { KeyboardEvent, useState } from 'react'
import { Box, Button, TextareaAutosize } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useSendMessage } from 'zustand/useSendMessage'

interface ChatInputProps {
  chatId: string
}

export function ChatInput({ chatId }: ChatInputProps) {
  const { classes } = useStyles()
  const [messageText, setMessageText] = useState('')
  const { sendMessage, isLoading } = useSendMessage(chatId)

  async function handleSendMessage() {
    if (!messageText.trim()) {
      return
    }

    try {
      await sendMessage({
        receiverId: chatId,
        text: messageText,
      })

      setMessageText('')
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  function handleEnterPress(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
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
        onKeyDown={handleEnterPress}
      />
      <Button
        onClick={handleSendMessage}
        className={classes.sendBtn}
        disabled={isLoading || !messageText.trim()}
      >
        {isLoading ? 'Sending...' : 'Send'}
      </Button>
    </Box>
  )
}

const useStyles = makeStyles()((theme) => ({
  sendMessageSection: {
    display: 'flex',
    gap: 10,
    bottom: 0,
    alignItems: 'end',
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
}))
