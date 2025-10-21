import * as React from 'react'
import { useState, useCallback } from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { UserLastMessage } from 'types/UserLastMessage'
import NoNewMatchesOrMessages from './NoNewMatchesOrMessages'
import { UserChatProfile } from 'types/UserProfileData'
import { useConversationsStore } from 'zustand/conversationsStore'
import theme from '../../styles/createTheme'

// Component for displaying loading state
const LoadingState: React.FC = () => <div>Loading conversations...</div>

// Component for displaying error state
interface ErrorStateProps {
  message: string
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => (
  <div>Error loading conversations: {message}</div>
)

// Component for displaying empty state
const EmptyState: React.FC = () => (
  <NoNewMatchesOrMessages text="You don't have any conversations. You need to find friends first!" />
)

// Component for displaying a single conversation item
interface ConversationItemProps {
  conversation: UserLastMessage
  isSelected: boolean
  onClick: (conversation: UserLastMessage) => void
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isSelected,
  onClick,
}) => {
  const { classes } = useStyles()

  const handleClick = () => {
    onClick(conversation)
  }

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
        {conversation.messageCount !== '0' && (
          <Box className={classes.conversationAlert}>
            <img
              src="/img/messages/envelope.svg"
              alt="You have new conversations!"
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

// Main component props
interface ConversationsProps {
  onClick: (userProfile: UserChatProfile) => void
}

/**
 * Conversations component displays a list of user conversations
 * When a conversation is clicked, it passes the selected user profile to the parent component
 */
const Conversations: React.FC<ConversationsProps> = ({ onClick }) => {
  const { conversations, loading, error } = useConversationsStore()
  const [userChatProfile, setUserChatProfile] = useState<UserChatProfile>({
    id: '-1',
    name: '',
    age: '',
    avatar: '',
  })

  /**
   * Handle click on a conversation item
   * Updates the selected user profile and passes it to the parent component
   */
  const handleClick = useCallback(
    (conversation: UserLastMessage) => {
      const userProfile: UserChatProfile = {
        id: conversation.id,
        name: conversation.name,
        age: conversation.age,
        avatar: conversation.avatar,
      }
      setUserChatProfile(userProfile)
      onClick(userProfile)
    },
    [onClick]
  )

  // Render appropriate component based on state
  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState message={error.message} />
  }

  if (!conversations?.length) {
    return <EmptyState />
  }

  // Render conversation list
  return (
    <>
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isSelected={userChatProfile.id === conversation.id}
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
  },
})

export default Conversations
