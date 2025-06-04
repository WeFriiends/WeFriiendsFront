import * as React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useNewFriendsList } from 'hooks/useFriendsList'
import { Link, Outlet, useLocation } from 'react-router-dom'
import theme from '../../styles/createTheme'
import Messages from './Messages'
import { useEffect, useState } from 'react'
import Friends from './Friends'
import SwipesWithFilters from 'components/swipes/SwipesWithFilters'

const TabsMessagesFriends: React.FC = () => {
  const { classes } = useStyles()
  const location = useLocation()
  const { pathname } = location
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const { data: friendsList } = useNewFriendsList()

  // local status for mobile
  const [mobileTab, setMobileTab] = useState<'messages' | 'friends'>('messages')

  useEffect(() => {
    if (isMobile && pathname === '/messages') {
      setMobileTab('messages')
    }
  }, [pathname, isMobile])

  const showTabs = !isMobile || pathname === '/messages'
  const showContent =
    !isMobile || pathname === '/friends' || pathname === '/messages'

  const getColor = (tab: 'messages' | 'friends'): string => {
    const active = isMobile
      ? mobileTab === tab
      : (tab === 'messages' ? '/messages' : '/friends') === pathname

    return active ? theme.palette.primary.dark : theme.palette.text.primary
  }

  const handleOpenChatPage = () => {
    // TODO:  Open page for chat between two users
  }

  const handleShowFriendProfile = () => {
    // TODO: Open page with friends profile
  }
  return (
    <Box sx={{ maxWidth: '1024px', margin: '0 auto' }}>
      {showTabs && (
        <Box className={classes.tabsBlock}>
          {isMobile ? (
            <Box
              onClick={() => setMobileTab('messages')}
              style={{
                color: getColor('messages'),
              }}
              className={classes.labelStyle}
            >
              Messages
            </Box>
          ) : (
            <Link
              to="/messages"
              style={{
                color: getColor('messages'),
                paddingRight: '60px',
              }}
              className={classes.labelStyle}
            >
              Messages
            </Link>
          )}
          {/* New Friends Tab */}
          {isMobile ? (
            <Box
              onClick={() => setMobileTab('friends')}
              style={{
                color: getColor('friends'),
                cursor: 'pointer',
              }}
              className={classes.labelStyle}
            >
              {`New friends (${friendsList?.length})`}
            </Box>
          ) : (
            <Link
              to="/friends"
              style={{
                color: getColor('friends'),
              }}
              className={classes.labelStyle}
            >
              {`New friends (${friendsList?.length})`}
            </Link>
          )}
        </Box>
      )}
      {/*  Content: for mobile, we render components directly, for desktop - via Outlet */}
      {showContent &&
        (isMobile ? (
          pathname === '/messages' ? (
            mobileTab === 'messages' ? (
              <Messages onClick={handleOpenChatPage} />
            ) : (
              <Friends onClick={handleShowFriendProfile} />
            )
          ) : pathname === '/friends' ? (
            <SwipesWithFilters />
          ) : null
        ) : (
          <Outlet />
        ))}
    </Box>
  )
}

export default TabsMessagesFriends

const useStyles = makeStyles()({
  labelStyle: {
    textTransform: 'capitalize',
    fontSize: 22,
    lineHeight: 1.5,
    fontWeight: 500,
    textDecoration: 'none',
    paddingRight: '60px',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '25px',
    },
  },
  removeIndicator: {
    display: 'none',
  },
  tabsBlock: {
    maxWidth: '419px',
    paddingBottom: '38px',
    paddingTop: '10px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '40px',
    },
  },
})
