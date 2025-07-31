import { useState } from 'react'
import { Box, Grid } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import UserProfile from 'components/userProfile/UserProfile'
import UserProfileButton from 'components/userProfile/UserProfileButton'
import { UserProfileData } from 'types/UserProfileData'
import Friends from 'components/tabsMessagesFriends/Friends'
import { useNavigate } from 'react-router-dom'
import SwipesWithFilters from 'components/swipes/SwipesWithFilters'
import TabsMessagesFriends from '../components/tabsMessagesFriends/TabsMessagesFriends'
import theme from '../styles/createTheme'
import UserProfileWrapperRightCol from '../components/userProfile/UserProfileWrapperRightCol'

const FriendsPage = () => {
  const { classes } = useStyles()

  const [friendsData, setFriendsData] = useState<UserProfileData | null>(null)

  const navigate = useNavigate()

  const selectFriend = (user: UserProfileData) => {
    setFriendsData(user)
  }

  const startChat = () => {
    navigate('/messages')
  }

  const handleCloseFriendProfile = () => {
    setFriendsData(null)
  }

  return (
    <Grid item xs={12} className={classes.twoColumnLayoutWrapper}>
      <Box
        className={`${classes.twoColumnLayoutColLeft} ${
          friendsData ? 'stopScrollHideOnMobile' : ''
        }`}
      >
        <TabsMessagesFriends />
        <Friends onClick={selectFriend} />
      </Box>
      <Box className={classes.twoColumnLayoutColRight}>
        {friendsData ? (
          <Box className={classes.wrapperFriend}>
            <Box className={classes.wrapperFriendMobile}>
              <UserProfileWrapperRightCol
                handleCloseFriendProfile={handleCloseFriendProfile}
              >
                <UserProfile user={friendsData} />
                <UserProfileButton startChat={startChat} />
              </UserProfileWrapperRightCol>
            </Box>
          </Box>
        ) : (
          <Box className={classes.wrapperSwipes}>
            <SwipesWithFilters />
          </Box>
        )}
      </Box>
    </Grid>
  )
}

export default FriendsPage

const useStyles = makeStyles()({
  mainBlock: {
    paddingTop: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 45,
  },
  messageStyle: {
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 1.2,
  },
  friendsPage: {
    display: 'grid',
    gridTemplateColumns: '376px 588px',
    height: '71vh',
    '&> *:nth-of-type(2)': {
      paddingLeft: 118,
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

  wrapperFriend: {
    display: 'flex',
    flexDirection: 'column',
    top: 0,
    right: 0,
    left: 0,
    bottom: 56,
    background: theme.palette.common.white,
    position: 'fixed',
    overscrollBehavior: 'contain',
    overflow: 'auto',
    //maxWidth: 350,
    [theme.breakpoints.up('sm')]: {
      //width: 450,
      //maxWidth: 450,
    },
    [theme.breakpoints.up('md')]: {
      height: '100%',
      position: 'static',
    },
  },
  wrapperFriendMobile: {
    width: 350,
    maxWidth: '100%',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      width: 450,
    },
  },

  wrapperSwipes: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      //position: 'sticky', //todo: good to make both columns sticky
      //top: 0,
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
  friendProfileControlsMobile: {
    paddingTop: 60,
    fontSize: 24,
    lineHeight: 1.5,
    paddingBottom: 31,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
})
