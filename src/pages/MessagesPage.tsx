import { Box, Grid } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Conversations } from 'components/tabsMessagesFriends/Conversations'
import { SwipesWithFilters } from 'components/swipes/SwipesWithFilters'
import { TabsMessagesFriends } from '../components/tabsMessagesFriends/TabsMessagesFriends'
import { ChatContainer } from 'components/chat/ChatContainer'
import { useChatStore } from 'zustand/chatStore'
// import { useConversationsStore  } from 'zustand/conversationsStore'
import { useEffect, useState } from 'react'
import { UserProfileData } from 'types/UserProfileData'
import { getUserById } from 'actions/userServices'
// import { useConversations } from 'zustand/useConversations'
import { NoNewMatchesOrMessages } from 'components/tabsMessagesFriends/NoNewMatchesOrMessages'
import { useConversationsSubscription } from 'zustand/useConversationsSubscription'

// TEMPORARY - NEED TO USE BATCH ENDPOINT
function useGetAllUsers(ids: string[]) {
  const [users, setUsers] = useState<UserProfileData[] | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  console.log(ids)

  useEffect(() => {
    ;(async function () {
      setIsLoading(true)
      try {
        const data = await Promise.all(ids.map((id) => getUserById(id)))
        setUsers(data)
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    })()
  }, [ids.join('')])

  const data =
    users &&
    users.map((user) => ({
      id: user.id,
      name: user.name,
      age: user.age,
      avatar: user.photos[0].src,
    }))

  return { data, isLoading }
}

export function useConversationsWithUserData() {
  // const { data: conversations = [] } = useConversations()
  const { data: conversations } = useConversationsSubscription()
  const { data: users } = useGetAllUsers(
    conversations ? conversations.map((c) => c.id) : []
  )

  return (
    users &&
    conversations &&
    users.map((u, index) => ({
      ...u,
      ...conversations[index],
    }))
  )
}

// Note: subscription to messages is now handled in the chatStore.setSelectedChatId function
// Note: unsubscription on tab/app close is handled globally in chatStore.ts
export default function MessagesPage() {
  const { classes } = useStyles()
  const { selectedChatId } = useChatStore()
  // const { conversations } = useConversationsStore()
  // const { data: users } = useGetAllUsers(conversations.map((c) => c.id))
  const conversations = useConversationsWithUserData() ?? []

  const selectedChat =
    conversations && selectedChatId
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
        {conversations.length === 0 ? (
          <NoNewMatchesOrMessages text="You don't have any conversations. You need to find friends first!" />
        ) : (
          <Conversations data={conversations} />
        )}
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
