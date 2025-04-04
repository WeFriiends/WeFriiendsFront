import { useState, useRef } from 'react'
import { Box, Link } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import UserProfile from 'components/userProfile/UserProfile'
import UserProfileButton from 'components/userProfile/UserProfileButton'
import { UserProfileData } from 'types/UserProfileData'
import Friends from 'components/tabsMessagesFriends/Friends'
import { useNavigate } from 'react-router-dom'
import Swipes from 'components/swipes/Swipes'
import NoMoreMatchesDialog from 'pages/NoMoreMatchesDialog'

const FriendsPage = () => {
  const { classes } = useStyles()

  const [friendsData, setFriendsData] = useState<UserProfileData | null>(null)

  const navigate = useNavigate()

  const NoMoreMatchesDialogRef = useRef<{
    handleOpenNoMoreMatchesDialog: () => void
  }>(null)

  const handleOpenNoMoreMatchesDialog = () => {
    NoMoreMatchesDialogRef.current?.handleOpenNoMoreMatchesDialog()
  }

  const selectFriend = (user: UserProfileData) => {
    setFriendsData(user)
  }

  const startChat = () => {
    navigate('/messages')
  }

  return (
    <Box className={classes.friendsPage}>
      <Friends onClick={selectFriend} />
      {friendsData ? (
        <Box sx={{ paddingRight: '20px' }}>
          <UserProfile user={friendsData} />
          <UserProfileButton startChat={startChat} />
        </Box>
      ) : (
        <Box>
          <Link
            className={classes.filters}
            onClick={handleOpenNoMoreMatchesDialog}
          >
            filters
          </Link>
          <Swipes />
        </Box>
      )}
      <NoMoreMatchesDialog ref={NoMoreMatchesDialogRef} />
    </Box>
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
    marginTop: -71,
    paddingBottom: 35,
  },
})
