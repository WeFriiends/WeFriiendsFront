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

  return (
    <Grid item xs={12} className={classes.twoColumnLayoutWrapper}>
      <Box className={classes.twoColumnLayoutColLeft}>
        <TabsMessagesFriends />
        <Friends onClick={selectFriend} />
      </Box>
      <Box className={classes.twoColumnLayoutColRight}>
        {friendsData ? (
          <Box sx={{ paddingRight: '20px' }}>
            <UserProfile user={friendsData} />
            <UserProfileButton startChat={startChat} />
          </Box>
        ) : (
          <Box>
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

  twoColumnLayoutWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
    paddingBottom: 100,
    [theme.breakpoints.up(850)]: {
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
    order: 2,
    [theme.breakpoints.up(850)]: {
      order: 1,
      width: 350,
    },
  },
  twoColumnLayoutColRight: {
    width: 350,
    maxWidth: '100%',
    order: 1,
    [theme.breakpoints.up('sm')]: {
      width: 450,
    },
    [theme.breakpoints.up(850)]: {
      width: 450,
      order: 2,
    },
  },
})
