import * as React from 'react'
import { useCallback, useMemo } from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { UserLastMessage } from 'types/UserLastMessage'
import NoNewMatchesOrMessages from './NoNewMatchesOrMessages'
import { UserChatProfile } from 'types/UserProfileData'
import { useConversationsStore } from 'zustand/conversationsStore'
import { useChatStore } from 'zustand/chatStore'
import theme from '../../styles/createTheme'
import { useAuthStore } from '../../zustand/store'

// Component for displaying a single conversation item
interface ConversationItemProps {
  conversation: UserLastMessage
  isSelected: boolean
  onClick: (conversation: UserLastMessage) => void
}

// Memoized envelope image component to prevent unnecessary re-renders
const EnvelopeIcon = React.memo(() => (
  <img src="/img/messages/envelope.svg" alt="You have new conversations!" />
))

// Memoized conversation item component to prevent unnecessary re-renders
const ConversationItem = React.memo<ConversationItemProps>(
  ({ conversation, isSelected, onClick }) => {
    const { classes } = useStyles()
    const currentUserId = useAuthStore((s) => s.currentUserId)

    const handleClick = useCallback(() => {
      onClick(conversation)
    }, [onClick, conversation])

    // Memoize the notification indicator to prevent unnecessary re-renders
    const notificationIndicator = useMemo(() => {
      if (
        !conversation.lastMessageSeen &&
        conversation.lastMessageSender !== currentUserId
      ) {
        return (
          <Box className={classes.conversationAlert}>
            <EnvelopeIcon />
          </Box>
        )
      }
      return null
    }, [
      classes.conversationAlert,
      conversation.lastMessageSeen,
      currentUserId,
      conversation.lastMessageSender,
    ])

    return (
      <Box key={conversation.id} onClick={handleClick}>
        <Box
          className={`${classes.conversationBlock} ${
            isSelected ? classes.selected : ''
          }`}
        >
          <Avatar src={conversation.avatar} sx={{ width: 66, height: 66 }} />
          <Box className={classes.conversationContent}>
            <Typography className={classes.name}>
              {conversation.name}, {conversation.age}
            </Typography>
            <Typography className={classes.conversationText}>
              {conversation.lastMessage}
            </Typography>
          </Box>
          {notificationIndicator}
        </Box>
      </Box>
    )
  }
)

// Main component props
interface ConversationsProps {
  onClick?: (userProfile: UserChatProfile) => void
  selectedId?: string
}

/**
 * Conversations component displays a list of user conversations
 * When a conversation is clicked, it updates the selected chat ID in the chatStore
 */
const Conversations: React.FC<ConversationsProps> = ({
  onClick,
  selectedId,
}) => {
  const currentUserId = useAuthStore((s) => s.currentUserId)
  const conversations = useConversationsStore((state) => state.conversations)
  const loading = useConversationsStore((state) => state.loading)
  const error = useConversationsStore((state) => state.error)
  const { selectedChatId, setSelectedChatId } = useChatStore()

  // Use the provided selectedId or the selectedChatId from the store
  const effectiveSelectedId = selectedId || selectedChatId

  const setConversationSeen = useConversationsStore(
    (state) => state.setConversationSeen
  )

  /**
   * Handle click on a conversation item
   * Updates the selected chat ID in the chatStore
   * Also calls the onClick prop if provided (for backward compatibility)
   */
  const handleClick = useCallback(
    async (conversation: UserLastMessage) => {
      const userProfile: UserChatProfile = {
        id: conversation.id,
        name: conversation.name,
        age: conversation.age,
        avatar: conversation.avatar,
      }

      // Update the selected chat ID in the chatStore
      setSelectedChatId(conversation.id)
      if (currentUserId)
        await setConversationSeen(currentUserId, conversation.id)

      // Call the onClick prop if provided (for backward compatibility)
      if (onClick) {
        onClick(userProfile)
      }
    },
    [onClick, setSelectedChatId, setConversationSeen, currentUserId]
  )

  // Render the appropriate component or message based on state
  if (loading) {
    return <div>Loading conversations...</div>
  }

  if (error) {
    return <div>Error loading conversations: {error.message}</div>
  }

  if (!conversations?.length) {
    return (
      <NoNewMatchesOrMessages text="You don't have any conversations. You need to find friends first!" />
    )
  }

  // Render conversation list
  return (
    <>
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isSelected={conversation.id === effectiveSelectedId}
          onClick={handleClick}
        />
      ))}
    </>
  )
}

// Styles for the component
const useStyles = makeStyles()({
  // Conversation list item
  conversationBlock: {
    display: 'grid',
    gridTemplateColumns: '66px 1fr 30px',
    alignItems: 'center',
    padding: '25px 20px',
    marginLeft: -20,
    marginRight: -20,
    borderBottom: '1px solid #EEE',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: theme.customPalette.authBtnBgHover,
    },
    [theme.breakpoints.up('md')]: {
      marginRight: 0,
    },
    [theme.breakpoints.up('lg')]: {
      padding: '30px 20px',
    },
  },
  selected: {
    backgroundColor: theme.customPalette.authBtnBg,
    '&:hover': {
      backgroundColor: theme.customPalette.authBtnBg,
    },
  },

  // Conversation content
  conversationContent: {
    paddingLeft: 15,
    paddingRight: 19,
    minWidth: 0,
  },
  name: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.palette.text.primary,
    lineHeight: '40px',
  },
  conversationText: {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.body2.fontWeight,
    lineHeight: theme.typography.body2.lineHeight,
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  // Notification indicator
  conversationAlert: {
    borderRadius: '50%',
    background: theme.palette.primary.light,
    width: 35,
    height: 35,
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: 'flickering 700ms  ease-in-out infinite alternate',
    '@keyframes flickering': {
      '0%': {
        opacity: 0.8,
      },
      '100%': {
        opacity: 1,
      },
    },
  },
})

export default Conversations
