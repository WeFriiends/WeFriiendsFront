import * as React from 'react'
import { useState } from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { UserLastMessage } from 'types/UserLastMessage'
import NoNewMatchesOrMessages from './NoNewMatchesOrMessages'
import { UserChatProfile } from 'types/UserProfileData'
import { useLastMessagesList } from 'hooks/useLastMessagesList'
import theme from '../../styles/createTheme'

interface MessagesProps {
  onClick: (userProfile: UserChatProfile) => void
}

/**
 * Messages component displays a list of user messages
 * When a message is clicked, it passes the selected user profile to the parent component
 */
const Messages: React.FC<MessagesProps> = ({ onClick }) => {
  const { classes } = useStyles()
  const { data: userMessages } = useLastMessagesList()
  const [userChatProfile, setUserChatProfile] = useState<UserChatProfile>({
    id: '-1',
    name: '',
    age: '',
    avatar: '',
  })

  /**
   * Handle click on a message item
   * Updates the selected user profile and passes it to the parent component
   */
  const handleClick = (user: UserLastMessage) => {
    const userChatProfile = { ...user }
    setUserChatProfile(userChatProfile)
    onClick(userChatProfile)
  }

  // Show empty state when there are no messages
  if (!userMessages?.length) {
    return (
      <NoNewMatchesOrMessages text="You don't have any messages. You need to find friends first!" />
    )
  }

  return (
    <>
      {userMessages?.map((message) => (
        <Box key={message.id} onClick={() => handleClick(message)}>
          <Box
            className={`${classes.messageBlock} ${
              userChatProfile.id === message.id ? classes.selected : ''
            }`}
          >
            <Avatar src={message.avatar} sx={{ width: 66, height: 66 }} />
            <Box className={classes.message}>
              <Typography className={classes.name}>
                {message.name}, {message.age}
              </Typography>
              <Typography className={classes.textMessage}>
                {message.lastMessage}
              </Typography>
            </Box>
            {message.messageCount !== '0' && (
              <Box className={classes.messageAlert}>
                <img
                  src="/img/messages/envelope.svg"
                  alt="You have new messages!"
                />
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </>
  )
}

export default Messages

const useStyles = makeStyles()({
  // Message list item
  messageBlock: {
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

  // Message content
  message: {
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
  textMessage: {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.body2.fontWeight,
    lineHeight: theme.typography.body2.lineHeight,
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  // Notification indicator
  messageAlert: {
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
