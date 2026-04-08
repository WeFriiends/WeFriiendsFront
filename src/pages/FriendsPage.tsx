import { useState } from 'react'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import UserProfile from 'components/userProfile/UserProfile'
import { UserProfileButton } from 'components/userProfile/UserProfileButton'
import { UserProfileData } from 'types/UserProfileData'
import { Friends } from 'components/tabsMessagesFriends/Friends'
import { SwipesWithFilters } from 'components/swipes/SwipesWithFilters'
import { TabsMessagesFriends } from '../components/tabsMessagesFriends/TabsMessagesFriends'
import { MobileProfileDrawer } from 'common/components/MobileProfileDrawer'

export default function FriendsPage() {
  const theme = useTheme()
  const { classes } = useStyles()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const [friendsData, setFriendsData] = useState<UserProfileData | null>(null)

  const selectFriend = (user: UserProfileData) => {
    setFriendsData(user)
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
        <Box className={classes.stickyRightCol}>
          {isMdUp && friendsData && (
            <Box className={classes.wrapperFriendDesktop}>
              <UserProfile user={friendsData} />
              <UserProfileButton chatId={friendsData.id} />
            </Box>
          )}

          {!isMdUp && (
            <MobileProfileDrawer
              open={!!friendsData}
              onClose={handleCloseFriendProfile}
            >
              {friendsData && (
                <>
                  <UserProfile user={friendsData} />
                  <UserProfileButton chatId={friendsData.id} />
                </>
              )}
            </MobileProfileDrawer>
          )}
          {!friendsData && isMdUp && (
            <Box>
              <SwipesWithFilters />
            </Box>
          )}
        </Box>
      </Box>
    </Grid>
  )
}

const useStyles = makeStyles()((theme) => ({
  wrapperFriendDesktop: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
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
  stickyRightCol: {
    position: 'sticky',
    top: 0,
  },
}))
