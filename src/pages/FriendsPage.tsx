import { useState } from 'react'
import { Box, Grid } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import UserProfile from 'components/userProfile/UserProfile'
import UserProfileButton from 'components/userProfile/UserProfileButton'
import { UserProfileData } from 'types/UserProfileData'
import Friends from 'components/tabsMessagesFriends/Friends'
import { useNavigate } from 'react-router-dom'
import Swipes from 'components/swipes/Swipes'
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
    <Grid container spacing={3}>
      <Grid item xs={12} className={classes.twoColumnLayoutWrapper}>
        <Friends onClick={selectFriend} />
        {friendsData ? (
          <Box className={classes.twoColumnLayoutColLeft}>
            <UserProfile user={friendsData} />
            <UserProfileButton startChat={startChat} />
          </Box>
        ) : (
          <Box className={classes.twoColumnLayoutColRight}>
            <Swipes />
          </Box>
        )}
      </Grid>
    </Grid>
  )
}

export default FriendsPage

const useStyles = makeStyles()({
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
    width: 350,
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
