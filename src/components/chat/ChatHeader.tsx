import React from 'react'
import { Box, Typography, Avatar, IconButton } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'
import ChatMenu from './ChatMenu'
import { UserChatProfile } from 'types/UserProfileData'

interface ChatHeaderProps {
  selectedChat: UserChatProfile
  onClose: () => void
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ selectedChat, onClose }) => {
  const { classes } = useStyles()

  return (
    <Box className={classes.chatHeader}>
      <IconButton
        disableRipple={true}
        disableFocusRipple={true}
        aria-label="Close chat"
        className={classes.closeChatBack}
        onClick={onClose}
      >
        <img src="/img/messages/arrow-back.svg" alt="Back" />
      </IconButton>

      <Box className={classes.userInHeader}>
        <Avatar className={classes.userAvatar} src={selectedChat.avatar} />
        <Typography className={classes.userName}>
          {selectedChat.name}
          <Box className={classes.userAge} component="span">
            , {selectedChat.age}
          </Box>
        </Typography>
      </Box>

      {/*<Box className={classes.friendsSince}>Your friend from 03.01.2023</Box>*/}

      <Box className={classes.chatMenuDesktop}>
        <ChatMenu icon="/img/messages/menu.svg" />
      </Box>

      <IconButton
        disableRipple={true}
        disableFocusRipple={true}
        className={classes.closeChatCross}
        aria-label="Close chat"
        onClick={onClose}
      >
        <img src="/img/messages/x.svg" alt="Close" />
      </IconButton>
      <Box className={classes.chatMenuMobile}>
        <ChatMenu icon="/img/messages/menu-dots.svg" />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles()({
  chatHeader: {
    backgroundColor: theme.palette.primary.light,
    height: 64,
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.common.white,
    [theme.breakpoints.up('md')]: {
      height: 'auto',
      marginTop: 30,
      padding: 0,
      backgroundColor: theme.palette.common.white,
    },
  },
  userAvatar: {
    width: 32,
    height: 32,
    [theme.breakpoints.up('md')]: {
      width: 50,
      height: 50,
    },
  },
  userName: {
    color: theme.palette.common.white,
    fontWeight: 700,
    fontSize: 18,
    flexGrow: 200,
    [theme.breakpoints.up('md')]: {
      fontWeight: 600,
      fontSize: 20,
      color: theme.palette.primary.main,
    },
  },
  userAge: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'inline',
    },
  },
  userInHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flexGrow: 200,
  },
  /*
    friendsSince: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
        fontSize: 14,
        lineHeight: 1.3,
        color: theme.palette.text.primary,
      },
    },
  */
  closeChatCross: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      width: 34,
      height: 34,
      padding: 0,
      flexGrow: 0,
      marginLeft: 30,
    },
  },
  closeChatBack: {
    padding: 0,
    width: 25,
    flexGrow: 0,
    marginRight: 4,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  chatMenuDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  chatMenuMobile: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
})

export default ChatHeader
