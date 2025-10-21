import { Box, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useAuth0 } from '@auth0/auth0-react'
import { useConversationsStore } from 'zustand/conversationsStore'
import { useNavigate } from 'react-router-dom'
import { cleanUserId } from '../../utils/userIdUtils'

const UserProfileButton = ({
  skip,
  beFriend,
  startChat,
  userId,
}: {
  skip?: () => void
  beFriend?: () => void
  startChat?: boolean
  userId?: string
}) => {
  const { classes } = useStyles()
  const { user } = useAuth0()
  const createConversation = useConversationsStore(
    (state) => state.createConversation
  )
  const navigate = useNavigate()

  const handleStartChat = async () => {
    try {
      // Get current user ID from Auth0
      const currentUserId = user?.sub

      if (currentUserId && userId) {
        // Create conversation using the store function
        await createConversation(currentUserId, userId)
      } else {
        console.error('Missing user IDs for chat connection')
      }
    } catch (error) {
      console.error('Error creating chat connection:', error)
    }

    // Navigate to the messages page with the specific user ID (using only first 8 characters)
    if (userId) {
      const shortUserId = cleanUserId(userId).substring(0, 8)
      navigate(`/messages/${shortUserId}`)
    }
  }

  return (
    <>
      <Box className={classes.buttonSection}>
        {startChat && (
          <Button className={classes.whiteButton} onClick={handleStartChat}>
            Start chat
          </Button>
        )}
        {skip && (
          <Button className={classes.whiteButton} onClick={skip}>
            Skip
          </Button>
        )}
        {beFriend && (
          <Button className={classes.orangeButton} onClick={beFriend}>
            Be friend
          </Button>
        )}
      </Box>
    </>
  )
}

export default UserProfileButton

const useStyles = makeStyles()({
  buttonSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: 19,
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FEDED2 100%)',
    paddingTop: 20,
    paddingBottom: 30,
    marginBottom: 20,
  },
  whiteButton: {
    backgroundColor: '#FFFFFF',
    border: '2px solid #FB8F67',
    color: '#FB8F67',
    borderRadius: 10,
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '20px',
    width: 140,
    height: 50,
    textTransform: 'none',
  },
  orangeButton: {
    backgroundColor: '#FB8F67',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 700,
    lineHeight: '20px',
    borderRadius: 10,
    width: 140,
    height: 50,
    textTransform: 'none',
    '&: hover': {
      backgroundColor: '#FB8F67',
    },
  },
})
