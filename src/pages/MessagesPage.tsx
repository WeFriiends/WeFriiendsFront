import React, { useState } from 'react'
import { Box, Button, TextareaAutosize, Grid } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import Messages from 'components/tabsMessagesFriends/Messages'
import theme from './../styles/createTheme'
import { UserChatProfile } from 'types/UserProfileData'
import StartChatting from 'components/chat/StartChatting'
import DisplayingChat from 'components/chat/DisplayingChat'
import messages from '../components/chat/chat.json'
import SwipesWithFilters from 'components/swipes/SwipesWithFilters'
import TabsMessagesFriends from '../components/tabsMessagesFriends/TabsMessagesFriends'
import ChatHeader from 'components/chat/ChatHeader'

const MessagesPage = () => {
  const { classes } = useStyles()
  const [selectedChat, setSelectedChat] = useState<UserChatProfile | null>(null)
  const [messageText, setMessageText] = useState('')
  const userId = '1'

  const friendId = messages.participants.find((el) => el !== userId)

  const handleClick = (user: UserChatProfile) => {
    setSelectedChat(user)
  }

  const handleCloseChat = () => {
    setSelectedChat(null)
  }

  const handleSendMessage = () => {
    // Here you would typically send the message to your backend
    // For now, we'll just clear the textarea
    setMessageText('')
  }

  return (
    <Grid item xs={12} className={classes.twoColumnLayoutWrapper}>
      <Box
        className={`${classes.twoColumnLayoutColLeft} ${
          selectedChat ? 'stopScrollHideOnMobile' : ''
        }`}
      >
        <TabsMessagesFriends />
        <Messages onClick={handleClick} />
      </Box>
      <Box className={classes.twoColumnLayoutColRight}>
        <Box className={classes.stickyRightCol}>
          {selectedChat ? (
            <Box className={classes.wrapperChat}>
              <Box className={classes.topSpacePlaceholderProfile} />
              <ChatHeader
                selectedChat={selectedChat}
                onClose={handleCloseChat}
              />
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
                selectedChat?.id === friendId ? (
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
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <Button
                    onClick={handleSendMessage}
                    className={classes.sendBtn}
                  >
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
  sendMessageSection: {
    display: 'flex',
    gap: 10,
    bottom: 0,
    alignItems: 'end',
    paddingBottom: 20,
    margin: '0 20px',
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
      minHeight: 594,
      height: 'calc(100vh - 188px)',
      position: 'static',
      //minHeight: 500,
      maxHeight: '100vh',
    },
  },
  wrapperSwipes: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  topSpacePlaceholderProfile: {
    [theme.breakpoints.up('md')]: {
      height: 127,
    },
    [theme.breakpoints.up('lg')]: {
      height: 67,
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
