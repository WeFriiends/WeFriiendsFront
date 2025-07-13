import * as React from 'react'
import { useState } from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { UserLastMessage } from 'types/UserLastMessage'
import NoNewMatches from './NoNewMatchesOrMessages'
import { UserChatProfile } from 'types/UserProfileData'
import { useLastMessagesList } from 'hooks/useLastMessagesList'
import theme from '../../styles/createTheme'

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
      <NoNewMatches text="You don’t have any messages. You need to find friends first!" />
    )
  }
  return (
    <Box className={classes.messagePage}>
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
        </Box>
      ))}
    </Box>
  )
}

export default Messages

const useStyles = makeStyles()(() => {
  return {
    messagePage: {
      //maxHeight: 'calc(100vh - 137px)',
      [theme.breakpoints.up('sm')]: {
        //maxHeight: 'calc(100vh - 290px)',
      },
    },
    messageBlock: {
      display: 'grid',
      gridTemplateColumns: '66px 1fr 30px',
      alignItems: 'center',
      padding: '25px 45px 25px 30px',
      marginLeft: -20,
      marginRight: -20,
      borderBottom: '1px solid #EEE',
      [theme.breakpoints.up('lg')]: {
        padding: '30px 30px 30px 30px',
      },
    },
    selected: {
      backgroundColor: '#FFF1EC',
    },
    message: {
      paddingLeft: 15,
      paddingRight: 19,
      minWidth: 0,
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
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }
})
