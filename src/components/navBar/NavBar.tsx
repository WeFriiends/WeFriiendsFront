import React, { useEffect, useState } from 'react'
import {
  Avatar,
  BottomNavigation,
  Box,
  Typography,
  Button,
} from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useActivePage } from '../../context/activePageContext'
import theme from '../../styles/createTheme'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore, useProfileStore } from '../../zustand/store'
import IconChat from './../../common/svg/IconChat'
import IconLightning from './../../common/svg/IconLightning'
import IconII from './../../common/svg/IconII'
import IconProfile from './../../common/svg/IconProfile'
import IconNearMe from './../../common/svg/IconNearMe'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { useConversationsStore } from '../../zustand/conversationsStore'

const NavBar = () => {
  const { classes } = useStyles()
  const { activePage, setNewActivePage } = useActivePage()
  const navigate = useNavigate()
  const { data: profile, loading } = useProfileStore()
  const [isNewMessage, setIsNewMessage] = useState(false)

  const conversations = useConversationsStore((state) => state.conversations)
  const currentUserId = useAuthStore((s) => s.currentUserId)

  useEffect(() => {
    if (
      conversations.some(
        (conversation) =>
          !conversation.lastMessageSeen &&
          conversation.lastMessageSender !== currentUserId
      )
    ) {
      setIsNewMessage(true)
    } else {
      setIsNewMessage(false)
    }
  }, [conversations, currentUserId])

  return (
    <>
      <Box component="header" className={classes.header}>
        <Box className={classes.logo}>
          <Box component="img" src="/img/logo.svg" alt="logo"></Box>
        </Box>
        <BottomNavigation
          value={activePage}
          onChange={(event, newValue) => {
            setNewActivePage(newValue)
          }}
          className={classes.navList}
        >
          <BottomNavigationAction
            value="nearme"
            component={Link}
            to="/near-me"
            icon={
              <IconNearMe
                color={
                  activePage === 'nearme'
                    ? theme.palette.primary.main
                    : theme.customPalette.colorNavIcon
                }
              />
            }
            sx={{
              width: { xs: 20, lg: 31 },
              height: { xs: 24, lg: 37 },
            }}
            disableRipple
            disableTouchRipple
          />
          <BottomNavigationAction
            value="wholikedyou"
            component={Link}
            to="/who-liked-you"
            icon={
              <IconLightning
                color={
                  activePage === 'wholikedyou'
                    ? theme.palette.primary.main
                    : theme.customPalette.colorNavIcon
                }
              />
            }
            sx={{
              width: { xs: 20, lg: 26 },
              height: { xs: 27, lg: 38 },
            }}
            disableRipple
            disableTouchRipple
          />
          <BottomNavigationAction
            value="friends"
            component={Link}
            to="/swipes"
            icon={
              <IconII
                color={
                  activePage === 'friends'
                    ? theme.palette.primary.main
                    : theme.customPalette.colorNavIcon
                }
              />
            }
            sx={{
              width: { xs: 15, lg: 32 },
              height: { xs: 25, lg: 50 },
            }}
            disableRipple
            disableTouchRipple
          />
          <BottomNavigationAction
            value="chat"
            component={Link}
            to="/messages"
            icon={
              <IconChat
                flickering={isNewMessage}
                color={
                  activePage === 'chat'
                    ? theme.palette.primary.main
                    : theme.customPalette.colorNavIcon
                }
              />
            }
            sx={{
              width: { xs: 25, lg: 30 },
              height: { xs: 25, lg: 30 },
            }}
            disableRipple
            disableTouchRipple
          />
          <BottomNavigationAction
            value="profile"
            component={Link}
            to="/my-account"
            icon={
              <IconProfile
                color={
                  activePage === 'profile'
                    ? theme.palette.primary.main
                    : theme.customPalette.colorNavIcon
                }
              />
            }
            sx={{
              width: { xs: 24, lg: 24 },
              height: { xs: 26, lg: 26 },
            }}
            disableRipple
            disableTouchRipple
          />
        </BottomNavigation>
        <Button
          variant="text"
          disableRipple
          onClick={() => {
            navigate('/my-account')
            setNewActivePage('profile')
          }}
          className={`${classes.userDetails} ${
            activePage === 'profile' && classes.userDetailsActive
          }`}
        >
          <Avatar
            src={
              typeof profile?.photos?.[0] === 'string'
                ? profile?.photos?.[0]
                : profile?.photos?.[0]?.url ?? '/img/placeholders/girl-big.svg'
            }
            sx={{ width: 56, height: 56 }}
          ></Avatar>
          {!loading ? (
            <Typography className={classes.name}>
              {profile?.name || 'Loading...'}
            </Typography>
          ) : (
            <Typography className={classes.name}>Loading...</Typography>
          )}
        </Button>
      </Box>
      <Box component="main" className={classes.main}>
        <Outlet />
      </Box>
    </>
  )
}

export default NavBar

const useStyles = makeStyles()({
  logo: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  },
  header: {
    bottom: -1,
    right: 0,
    left: 0,
    zIndex: 999,
    background: theme.palette.common.white,
    [theme.breakpoints.down('lg')]: {
      position: 'fixed',
      minHeight: 60,
      boxShadow: '0 0 7px 1px rgba(179, 179, 179, 0.14)',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '30px 30px 80px',
      margin: '0 auto',
      maxWidth: 1024,
    },
  },
  main: {
    margin: '0 auto',
    maxWidth: 1024,
    padding: '0 30px',
    [theme.breakpoints.down('lg')]: {
      padding: '0 20px',
    },
  },
  name: {
    fontSize: 32,
    fontWeight: 600,
    lineHeight: '40px',
    color: '#F1562A',
    paddingLeft: 25,
    position: 'relative',
    wordBreak: 'break-word',
  },
  navList: {
    display: 'flex',
    flexGrow: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 20px',
    [theme.breakpoints.up('lg')]: {
      maxWidth: 420,
      margin: '0 50px',
    },
    '& a': {
      minWidth: 60,
    },
    '& a:hover svg path': {
      fill: theme.palette.primary.main,
    },
    '& a:last-child': {
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },
  },
  userDetails: {
    display: 'none',
    textDecoration: 'none',
    maxWidth: 285,
    textTransform: 'none',
    textAlign: 'left',
    maxHeight: 56,
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      alignItems: 'center',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: -35,
      left: -20,
      right: 0,
      bottom: -40,
      zIndex: 0,
      borderRadius: '0 0 10px 10px',
      transition: '0.3s background-color',
    },
    '&:hover:before': {
      backgroundColor: '#FFF1EC',
    },
  },
  userDetailsActive: {
    position: 'relative',
    '&:before': {
      backgroundColor: '#FFF1EC',
    },
  },
})
