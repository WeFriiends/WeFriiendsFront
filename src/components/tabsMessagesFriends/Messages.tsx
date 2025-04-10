import * as React from 'react'
import { useState } from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { UserLastMessage } from 'types/UserLastMessage'
import NoNewMatches from './NoNewMatchesOrMessages'
import { UserChatProfile } from 'types/UserProfileData'
import { useLastMessagesList } from 'hooks/useLastMessagesList'

const Messages = ({ onClick }: any) => {
  const { classes } = useStyles()
  const { data: userMessages } = useLastMessagesList()
  const [userChatProfile, setUserChatProfile] = useState<UserChatProfile>({
    id: '-1',
    name: '',
    age: '',
    avatar: '',
  })

  const handleClick = (user: UserLastMessage) => {
    const userChatProfile = { ...user }
    setUserChatProfile(userChatProfile)
    onClick(userChatProfile)
  }

  if (userMessages?.length == 0) {
    return (
      <NoNewMatches
        message={
          <>
            You don’t have any messages. You need to find friends first!
            <br />
            Start searching!
          </>
        }
      />
    )
  }
  return (
    <Box sx={{ maxHeight: 'calc(100vh - 290px)', overflow: 'auto' }}>
      {userMessages?.map((element) => (
        <Box key={element.id} onClick={() => handleClick(element)}>
          <Box
            className={` ${classes.messageBlock} ${
              userChatProfile.id === element.id ? classes.selected : ''
            }`}
          >
            <Avatar
              src={element.avatar}
              sx={{ width: 66, height: 66 }}
            ></Avatar>
            <Box className={classes.message}>
              <Typography className={classes.name}>
                {element.name}, {element.age}
              </Typography>
              <Typography className={classes.textMessage}>
                {element.lastMessage}
              </Typography>
            </Box>
            {element.messageCount === '0' ? null : (
              <Box className={classes.messageQuantity}>
                {element.messageCount}
              </Box>
            )}
          </Box>
          <Box className={classes.line}></Box>
        </Box>
      ))}
    </Box>
  )
}

export default Messages

const useStyles = makeStyles()(() => {
  return {
    messageBlock: {
      display: 'grid',
      gridTemplateColumns: '0.5fr 5fr 0.5fr',
      alignItems: 'center',
      padding: '30px 21px 20px 10px',
    },
    selected: {
      backgroundColor: '#FFF1EC',
    },
    message: {
      paddingLeft: 15,
      paddingRight: 19,
    },
    messageQuantity: {
      borderRadius: '50%',
      background: '#FB8F67',
      width: 30,
      height: 30,
      color: '#FFFFFF',
      fontSize: 16,
      lineHeight: '22px',
      fontWeight: 600,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      fontSize: 20,
      fontWeight: 600,
      lineHeight: '40px',
    },
    textMessage: {
      fontSize: 14,
      lineHeight: '22px',
      width: 210,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    line: {
      borderTop: '1px solid #EEE',
    },
  }
})
