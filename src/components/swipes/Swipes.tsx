import { Box, Button, Typography } from '@mui/material'
import { Match } from 'components/findMatch/Match'
import UserProfile from 'components/userProfile/UserProfile'
import { UserProfileButton } from 'components/userProfile/UserProfileButton'
import { useEffect, useState, useRef } from 'react'
import { makeStyles } from 'tss-react/mui'
import { emptyProfile, UserProfileData } from 'types/UserProfileData'
import NoMoreMatchesDialog from 'pages/NoMoreMatchesDialog'
import theme from '../../styles/createTheme'
import { usePotentialFriendsStore, useMatchesStore } from 'zustand/friendsStore'
import { useProfileStore } from 'zustand/store'
import Loader from 'common/svg/Loader'

const Swipes = () => {
  const { classes } = useStyles()
  const [noPotentialFriends, setNoPotentialFriends] = useState(true)
  const [friendsData, setFriendsData] = useState<UserProfileData>(emptyProfile)
  const [currentPotentialFriend, setCurrentPotentialFriend] =
    useState<UserProfileData>(emptyProfile)
  const [matchedUser, setMatchedUser] = useState<{
    id: string
    avatar: string
  } | null>(null)

  const {
    potentialFriends,
    handleLike,
    handleDislike,
    fetchPotentialFriends,
    isLoading,
  } = usePotentialFriendsStore()

  const { addFriend } = useMatchesStore()
  const { data: profile } = useProfileStore()

  // Fetch potential friends when profile is loaded
  useEffect(() => {
    if (profile) {
      fetchPotentialFriends()
    }
  }, [profile, fetchPotentialFriends])

  useEffect(() => {
    if (!potentialFriends?.length) {
      return
    }
    setNoPotentialFriends(false)
    setFriendsData(potentialFriends[0])
    setCurrentPotentialFriend(potentialFriends[0])
  }, [potentialFriends])

  const goToNextPotentialFriend = (currentUserProfile: UserProfileData) => {
    if (!potentialFriends?.length) {
      return
    }
    const currentIndex = potentialFriends.findIndex(
      (element: UserProfileData) => element.id === currentUserProfile.id
    )
    const lastIndex = potentialFriends.length - 1
    if (currentIndex < lastIndex) {
      setFriendsData(potentialFriends[currentIndex + 1])
      setCurrentPotentialFriend(potentialFriends[currentIndex + 1])
    } else {
      setNoPotentialFriends(true)
    }
  }

  const onSkip = () => {
    handleDislike(currentPotentialFriend.id)
    goToNextPotentialFriend(currentPotentialFriend)
  }

  const onBeFriend = () => {
    if (currentPotentialFriend.likedMe) {
      addFriend(currentPotentialFriend.id)
      setMatchedUser({
        id: currentPotentialFriend.id,
        avatar: currentPotentialFriend.photos[0].src,
      })
    } else {
      handleLike(currentPotentialFriend.id)
    }
    goToNextPotentialFriend(currentPotentialFriend)
  }

  function handleModalClose() {
    setMatchedUser(null)
  }

  const NoMoreMatchesDialogRef = useRef<{
    handleOpenNoMoreMatchesDialog: () => void
  }>(null)
  const handleOpenNoMoreMatchesDialog = () => {
    NoMoreMatchesDialogRef.current?.handleOpenNoMoreMatchesDialog()
  }
  return (
    <>
      <Box>
        {isLoading || potentialFriends === undefined ? (
          <Box className={classes.mainBlock}>
            <Loader />
          </Box>
        ) : noPotentialFriends ? (
          <Box className={classes.mainBlock}>
            <Typography className={classes.messageStyle}>
              You’re running out of people.
              <br /> Please, change search settings
            </Typography>
            <Button
              disableFocusRipple
              disableRipple
              disableElevation
              onClick={handleOpenNoMoreMatchesDialog}
              className={classes.whiteButton}
            >
              Go
            </Button>
          </Box>
        ) : (
          <>
            <UserProfile user={friendsData} />
            <UserProfileButton skip={onSkip} beFriend={onBeFriend} />
          </>
        )}
        <Match matchedUser={matchedUser} onClose={handleModalClose} />
      </Box>
      <NoMoreMatchesDialog
        ref={NoMoreMatchesDialogRef}
        title="You’re running out of people. Please, change search settings "
        description="Try to change age range or increase the distance"
      />
    </>
  )
}
export default Swipes

const useStyles = makeStyles()({
  whiteButton: {
    border: '2px solid ' + theme.palette.primary.light,
    color: theme.palette.primary.light,
    borderRadius: 10,
    fontSize: 18,
    transition: 'color .3s, background-color .3s',
    fontWeight: 600,
    width: 260,
    height: 60,
    lineHeight: '56px',
    boxSizing: 'border-box',
    '&:active, &:hover': {
      fontWeight: 600,
      background: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
  },
  messageStyle: {
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 1.2,
  },
  mainBlock: {
    paddingTop: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 45,
  },
})
