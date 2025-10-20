import { Box, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useAuth0 } from '@auth0/auth0-react'
import { db } from '../chatExample/firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { useConversationsStore } from 'zustand/conversationsStore'

const UserProfileButton = ({
  skip,
  beFriend,
  startChat,
  userId,
}: {
  skip?: () => void
  beFriend?: () => void
  startChat?: () => void
  userId?: string
}) => {
  const { classes } = useStyles()
  const { user } = useAuth0()
  const { fetchConversations } = useConversationsStore()

  const handleStartChat = async () => {
    if (startChat) {
      try {
        // Get current user ID from Auth0
        const currentUserId = user?.sub

        if (currentUserId && userId) {
          // Create conversation ID by removing "auth0|" prefix, sorting, and joining with "_"
          const cleanCurrentUserId = currentUserId.replace('auth0|', '')
          const cleanUserId = userId.replace('auth0|', '')
          const sortedUserIds = [cleanCurrentUserId, cleanUserId].sort()
          const conversationId = sortedUserIds.join('_')

          // Create conversation document in Firestore
          const conversationRef = doc(db, 'conversations', conversationId)
          await setDoc(conversationRef, {
            participants: [cleanCurrentUserId, cleanUserId],
            lastMessage: 'Chat just has been created.',
            lastMessageAt: serverTimestamp(),
            lastMessageSender: cleanCurrentUserId,
            lastMessageSeen: false,
            createdAt: serverTimestamp(),
          })

          console.log('Conversation document created successfully')

          // Force refresh of conversations after creating a new chat
          if (user?.sub) {
            console.log('Refreshing conversations after creating new chat')
            await fetchConversations(user.sub, true)
          }
        } else {
          console.error('Missing user IDs for chat connection')
        }
      } catch (error) {
        console.error('Error creating chat connection:', error)
      }

      // Call the original startChat function
      startChat()
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
