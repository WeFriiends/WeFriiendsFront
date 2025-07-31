import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextareaAutosize,
  Avatar,
  Grid,
} from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import Messages from 'components/tabsMessagesFriends/Messages'
import theme from './../styles/createTheme'
import ChatMenu from 'components/chat/ChatMenu'
import { UserChatProfile } from 'types/UserProfileData'
import StartChatting from 'components/chat/StartChatting'
import DisplayingChat from 'components/chat/DisplayingChat'
import messages from '../components/chat/chat.json'
import SwipesWithFilters from 'components/swipes/SwipesWithFilters'
import TabsMessagesFriends from '../components/tabsMessagesFriends/TabsMessagesFriends'

const MessagesPage = () => {
  const { classes } = useStyles()
  const [selectedChat, setSelectedChat] = useState<UserChatProfile | null>(null)
  const userId = '1'

  const frienId = messages.participants.find((el) => el !== userId)

  const handleClick = (user: UserChatProfile) => {
    setSelectedChat(user)
  }

  const handleCloseChat = () => {
    setSelectedChat(null)
  }

  return (
    <Grid item xs={12} className={classes.twoColumnLayoutWrapper}>
      <Box className={classes.twoColumnLayoutColLeft}>
        <TabsMessagesFriends />
        <Messages onClick={handleClick} />
      </Box>
      <Box className={classes.twoColumnLayoutColRight}>
        <Box className={classes.rightColumn}>
          {selectedChat ? (
            <Box className={classes.wrapperChat}>
              <Box className={classes.chatControlsMobile}>
                <Button onClick={handleCloseChat}>{'<- Back'}</Button>
              </Box>
              <Box className={classes.header}>
                <Box className={classes.userInHeader}>
                  <Avatar
                    src={selectedChat.avatar}
                    sx={{ width: 50, height: 50 }}
                  />
                  <Typography
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      fontSize: 20,
                    }}
                  >
                    {selectedChat.name}, {selectedChat.age}
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
                  height: 'calc(100% - 200px)',
                  flexGrow: 1,
                }}
              >
                {Object.keys(messages).length != 0 &&
                selectedChat?.id === frienId ? (
                  <DisplayingChat data={messages} userId={userId} />
                ) : (
                  <StartChatting />
                )}
                <Box className={classes.sendMessageSection}>
                  <TextareaAutosize
                    minRows={1}
                    maxRows={10}
                    placeholder="Type a message"
                    className={classes.textArea}
                  />
                  <img src="/img/messages/lol.svg" alt="lol" />
                  <Button className={classes.sendBtn} variant="outlined">
                    Send
                  </Button>
                </Box>
              </Box>
            </Box>
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 22,
  },
  userInHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
  },
  chatControlsMobile: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  sendMessageSection: {
    display: 'flex',
    gap: 20,
    bottom: 0,
    alignItems: 'end',
    paddingBottom: 20,
    [theme.breakpoints.up('md')]: {
      padding: '0 0 40px 15px',
    },
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
  wrapperChat: {
    display: 'flex',
    flexDirection: 'column',
    top: 0,
    right: 0,
    left: 0,
    bottom: 56,
    background: theme.palette.common.white,
    position: 'fixed',
    [theme.breakpoints.up('md')]: {
      height: '100%',
      position: 'static',
      minHeight: 635,
    },
  },
  wrapperSwipes: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  rightColumn: {},

  twoColumnLayoutWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
    paddingBottom: 100,
    [theme.breakpoints.up('md')]: {
      alignItems: 'start',
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
})
