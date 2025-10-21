import { Box, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useAuth0 } from '@auth0/auth0-react'
import { db } from '../chatExample/firebase'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { useConversationsStore } from 'zustand/conversationsStore'
import { useNavigate } from 'react-router-dom'

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
  useConversationsStore() // Keep the import for potential future use
  const navigate = useNavigate()

  const handleStartChat = async () => {
    try {
      // Get current user ID from Auth0
      const currentUserId = user?.sub

      if (currentUserId && userId) {
        // Create conversation ID by removing "auth0|" prefix, sorting, and joining with "_"
        const cleanCurrentUserId = currentUserId.replace('auth0|', '')
        const cleanUserId = userId.replace('auth0|', '')
        const sortedUserIds = [cleanCurrentUserId, cleanUserId].sort()
        const conversationId = sortedUserIds.join('_')

        // Get a reference to the conversation document
        const conversationRef = doc(db, 'conversations', conversationId)

        // Check if the document already exists
        const docSnap = await getDoc(conversationRef)

        // Only create the document if it doesn't exist
        if (!docSnap.exists()) {
          // Create conversation document in Firestore
          await setDoc(conversationRef, {
            participants: [cleanCurrentUserId, cleanUserId],
            lastMessage: 'Chat just has been created.',
            lastMessageAt: serverTimestamp(),
            lastMessageSender: cleanCurrentUserId,
            lastMessageSeen: false,
            createdAt: serverTimestamp(),
          })
          console.log('Conversation document created successfully')
        } else {
          console.log('Conversation document already exists, skipping creation')
        }
      } else {
        console.error('Missing user IDs for chat connection')
      }
    } catch (error) {
      console.error('Error creating chat connection:', error)
    }

    // Navigate to the messages page with the specific user ID (using only first 8 characters)
    if (userId) {
      const cleanUserId = userId.replace('auth0|', '')
      const shortUserId = cleanUserId.substring(0, 8)
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
