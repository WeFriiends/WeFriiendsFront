import { Box, Grid } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Conversations } from 'components/tabsMessagesFriends/Conversations'
import { SwipesWithFilters } from 'components/swipes/SwipesWithFilters'
import { TabsMessagesFriends } from '../components/tabsMessagesFriends/TabsMessagesFriends'
import { ChatContainer } from 'components/chat/ChatContainer'
import { useChatStore } from 'zustand/chatStore'
import { useConversationsStore } from 'zustand/conversationsStore'

// Note: subscription to messages is now handled in the chatStore.setSelectedChatId function
// Note: unsubscription on tab/app close is handled globally in chatStore.ts
export default function MessagesPage() {
  const { classes } = useStyles()
  const { selectedChatId } = useChatStore()
  const { conversations } = useConversationsStore()
  const selectedChat = selectedChatId
    ? conversations.find((conv) => conv.id === selectedChatId)
    : null
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
          {selectedChat && <ChatContainer chat={selectedChat} />}
          {!selectedChat && (
            <Box className={classes.wrapperSwipes}>
              <SwipesWithFilters />
            </Box>
          )}
        </Box>
      </Box>
    </Grid>
  )
}

const useStyles = makeStyles()((theme) => ({
  twoColumnLayoutWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    [theme.breakpoints.up('md')]: {
      alignItems: 'stretch',
      flexDirection: 'row',
    },
    [theme.breakpoints.up('lg')]: {
      paddingBottom: 0,
    },
    '& > *': {
      flex: 1,
    },
  },
  twoColumnLayoutColLeft: {
    maxWidth: '100%',
    '&.stopScrollHideOnMobile': {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
  },
  twoColumnLayoutColRight: {
    maxWidth: '100%',
  },
  stickyRightCol: {
    position: 'sticky',
    top: 0,
  },
  wrapperSwipes: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
}))
