import { useState } from 'react'
import { Box, Grid } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import UserProfile from 'components/userProfile/UserProfile'
import { UserProfileButton } from 'components/userProfile/UserProfileButton'
import { UserProfileData } from 'types/UserProfileData'
import { Friends } from 'components/tabsMessagesFriends/Friends'
import { SwipesWithFilters } from 'components/swipes/SwipesWithFilters'
import { TabsMessagesFriends } from '../components/tabsMessagesFriends/TabsMessagesFriends'
import { UserProfileWrapperRightCol } from '../components/userProfile/UserProfileWrapperRightCol'

export default function SwipesPage() {
  const { classes } = useStyles()
  const [friendsData, setFriendsData] = useState<UserProfileData | null>(null)

  const selectFriend = (user: UserProfileData) => {
    setFriendsData(user)
  }

  const handleCloseFriendProfile = () => {
    setFriendsData(null)
  }

  return (
    <Grid item xs={12} className={classes.twoColumnLayoutWrapper}>
      <Box className={classes.twoColumnLayoutColLeft}>
        <TabsMessagesFriends />
        <Friends onClick={selectFriend} />
      </Box>
      <Box className={classes.twoColumnLayoutColRight}>
        <Box className={classes.stickyRightCol}>
          {friendsData ? (
            <UserProfileWrapperRightCol
              handleCloseFriendProfile={handleCloseFriendProfile}
            >
              <UserProfile user={friendsData} />
              <UserProfileButton chatId={friendsData.id} />
            </UserProfileWrapperRightCol>
          ) : (
            <SwipesWithFilters />
          )}
        </Box>
      </Box>
    </Grid>
  )
}

const useStyles = makeStyles()((theme) => ({
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
    display: 'none',
    [theme.breakpoints.up('md')]: {
      width: 400,
      display: 'block',
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
}))
