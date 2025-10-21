import * as React from 'react'
import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Link, useLocation } from 'react-router-dom'
import theme from '../../styles/createTheme'
import { useMatchesStore } from 'zustand/friendsStore'

const TabsMessagesFriends: React.FC = () => {
  const { classes } = useStyles()
  const location = useLocation()
  const { pathname } = location
  const { matches: friendsList } = useMatchesStore()

  return (
    <>
      <Box className={classes.tabsBlock}>
        <Link
          to="/messages"
          style={{
            color:
              pathname === '/messages'
                ? theme.palette.primary.dark
                : theme.palette.text.primary,
          }}
          className={classes.labelStyle}
        >
          Messages
        </Link>
        <Link
          to="/friends"
          style={{
            color:
              pathname === '/friends' || pathname === '/swipes'
                ? theme.palette.primary.dark
                : theme.palette.text.primary,
          }}
          className={classes.labelStyle}
        >
          {`New friends (${friendsList?.length || 0})`}
        </Link>
      </Box>
    </>
  )
}

export default TabsMessagesFriends

const useStyles = makeStyles()({
  labelStyle: {
    textTransform: 'capitalize',
    fontSize: 18,
    lineHeight: 1.25,
    fontWeight: 500,
    textDecoration: 'none',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      fontSize: 22,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 24,
    },
  },
  tabsBlock: {
    paddingBottom: 35,
    paddingTop: 30,
    gap: 10,
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: 250,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 60,
      maxWidth: 335,
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 370,
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: 0,
    },
  },
})
