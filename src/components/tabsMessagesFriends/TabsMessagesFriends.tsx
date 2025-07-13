import * as React from 'react'
import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
// import { useNewFriendsList } from 'hooks/useFriendsList'  *temporarily commented out - until API for the new friends list is added*
import { Link, useLocation } from 'react-router-dom'
import theme from '../../styles/createTheme'

const TabsMessagesFriends: React.FC = () => {
  const { classes } = useStyles()
  const location = useLocation()
  const { pathname } = location

  // const { data: friendsList } = useNewFriendsList() *temporarily commented out - until API for the new friends list is added*
  const friendsList = [] // temporary solution, until API for the new friends list is added

  const getColor = (tab: 'messages' | 'friends'): string => {
    const active = (tab === 'messages' ? '/messages' : '/friends') === pathname

    return active ? theme.palette.primary.dark : theme.palette.text.primary
  }

  return (
    <>
      <Box className={classes.tabsBlock}>
        <Link
          // todo: remove temporary link to mock when work with real api data
          to="/messages?fill"
          style={{
            color: getColor('messages'),
          }}
          className={classes.labelStyle}
        >
          Messages
        </Link>
        <Link
          // todo: remove temporary link to mock when work with real api data
          to="/friends?fill"
          style={{
            color: getColor('friends'),
          }}
          className={classes.labelStyle}
        >
          {`New friends (${friendsList?.length})`}
        </Link>
      </Box>
    </>
  )
}

export default TabsMessagesFriends

const useStyles = makeStyles()({
  labelStyle: {
    textTransform: 'capitalize',
    fontSize: 22,
    lineHeight: 1.25,
    fontWeight: 500,
    textDecoration: 'none',
    cursor: 'pointer',
    [theme.breakpoints.up('md')]: {
      fontSize: 24,
    },
  },
  tabsBlock: {
    paddingBottom: '35px',
    paddingTop: '60px',
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: 380,
    [theme.breakpoints.up('lg')]: {
      paddingTop: 0,
    },
  },
})
