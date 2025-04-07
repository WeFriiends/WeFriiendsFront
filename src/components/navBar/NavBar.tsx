import React, { useEffect } from 'react'
import {
  Avatar,
  BottomNavigation,
  Box,
  Typography,
  Button,
} from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useActivePage } from '../../context/activePageContext'
import { generateNavigationConfig } from '../../helpers/navigationConfigHelper'
import { NavigationItems } from '../navigationItems/NavigationItems'
import theme from '../../styles/createTheme'
import { Outlet, useNavigate } from 'react-router-dom'
import { useProfileStore } from '../../zustand/store'

const NavBar = () => {
  const { classes } = useStyles()
  const { activePage, setNewActivePage } = useActivePage()
  const navigationConfig = generateNavigationConfig()
  const navigate = useNavigate()
  const { data: profile, loading } = useProfileStore()

  // Set current active menu item if we open the corresponding link
  useEffect(() => {
    const currentNavigationItem = navigationConfig.filter(
      (NavigationItem) => NavigationItem.linkTo === window.location.pathname
    )
    currentNavigationItem.length > 0 &&
      setNewActivePage(currentNavigationItem[0].value)
  }, [navigationConfig, setNewActivePage])

  return (
    <>
      <Box component="header" className={classes.header}>
        <Box className={classes.logo}>
          <Box component="img" src="/img/logo.svg" alt="logo"></Box>
        </Box>
        <BottomNavigation
          value={activePage}
          onChange={(event, newValue) => setNewActivePage(newValue)}
          className={classes.navList}
        >
          {NavigationItems({
            activePage,
            navigationConfig,
          })}
        </BottomNavigation>
        <Button
          variant="text"
          disableRipple
          onClick={() => navigate('/my-account')}
          className={`${classes.userDetails} ${
            activePage === 'profile' && classes.userDetailsActive
          }`}
        >
          <Avatar
            src={
              typeof profile?.photos?.[0] === 'string'
                ? profile?.photos?.[0]
                : profile?.photos?.[0]?.url ?? '/img/placeholders/girl_big.svg'
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
    bottom: 0,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 10,
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
