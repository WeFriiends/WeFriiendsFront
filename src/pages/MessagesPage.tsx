import React, { useEffect, useCallback } from 'react'
import { Box, Grid } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import Conversations from 'components/tabsMessagesFriends/Conversations'
import theme from './../styles/createTheme'
import SwipesWithFilters from 'components/swipes/SwipesWithFilters'
import TabsMessagesFriends from '../components/tabsMessagesFriends/TabsMessagesFriends'
import ChatContainer from 'components/chat/ChatContainer'
import { useParams, useNavigate } from 'react-router-dom'
import { useConversationsStore } from 'zustand/conversationsStore'
import { useChatStore } from 'zustand/chatStore'

const MessagesPage = () => {
  const { classes } = useStyles()
  const { userId: urlUserId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const { conversations, fetchConversations } = useConversationsStore()
  const { setSelectedChatId } = useChatStore()

  // Function to find a conversation by shortened userId in URL (first 8 characters)
  const findConversationByShortId = useCallback(
    (shortId: string) => {
      // This implementation checks if the conversation id starts with or includes the 8-character shortId
      return conversations.find((conversation) =>
        conversation.id.startsWith(shortId)
      )
    },
    [conversations]
  )

  useEffect(() => {
    // Fetch conversations if we have a userId in the URL
    if (urlUserId) {
      fetchConversations()
    }
  }, [urlUserId, fetchConversations])

  useEffect(() => {
    // If we have a userId in the URL and conversations are loaded, find the matching conversation
    if (urlUserId && conversations.length > 0) {
      const matchedConversation = findConversationByShortId(urlUserId)

      if (matchedConversation) {
        // Set the selected chat ID in the chatStore
        setSelectedChatId(matchedConversation.id)

        // Clean the URL by removing the userId parameter without reloading the page
        navigate('/messages', { replace: true })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlUserId, conversations, setSelectedChatId])

  const handleCloseChat = () => {
    // Clear the selected chat ID in the chatStore
    setSelectedChatId(null)
    // We don't unsubscribe when closing chat, only when tab/app is closed
  }

  // Note: subscription to messages is now handled in the chatStore.setSelectedChatId function
  // Note: unsubscription on tab/app close is handled globally in chatStore.ts

  // Get the selectedChatId from the chatStore to determine UI state
  const { selectedChatId } = useChatStore()

  return (
    <Grid item xs={12} className={classes.twoColumnLayoutWrapper}>
      <Box
        className={`${classes.twoColumnLayoutColLeft} ${
          selectedChatId ? 'stopScrollHideOnMobile' : ''
        }`}
      >
        <TabsMessagesFriends />
        <Conversations />
      </Box>
      <Box className={classes.twoColumnLayoutColRight}>
        <Box className={classes.stickyRightCol}>
          {selectedChatId ? (
            <ChatContainer onClose={handleCloseChat} />
          ) : (
            <Box className={classes.wrapperSwipes}>
              <SwipesWithFilters />
            </Box>
          )}
        </Box>
      </Box>
    </Grid>
  )
}
export default MessagesPage

const useStyles = makeStyles()({
  filters: {
    fontSize: 24,
    lineHeight: 1.5,
    color: '#262626',
    textAlign: 'right',
    display: 'block',
    paddingRight: 20,
    textDecorationColor: '#262626',
    paddingBottom: 35,
  },
  wrapperSwipes: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },

  twoColumnLayoutWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
    paddingBottom: 100,
    [theme.breakpoints.up('md')]: {
      alignItems: 'stretch',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    [theme.breakpoints.up('lg')]: {
      paddingBottom: 0,
    },
  },
  twoColumnLayoutColLeft: {
    width: '100%',
    marginBottom: 50,
    maxWidth: '100%',
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
    '&.stopScrollHideOnMobile': {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
  },
  twoColumnLayoutColRight: {
    width: 350,
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 450,
    },
    [theme.breakpoints.up('md')]: {
      width: 450,
    },
  },
  stickyRightCol: {
    position: 'sticky',
    top: 0,
  },
})
