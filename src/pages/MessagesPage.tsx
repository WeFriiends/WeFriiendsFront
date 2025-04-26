import { useState, useRef } from 'react'
import {
  Box,
  Typography,
  Button,
  TextareaAutosize,
  Avatar,
  Link,
} from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import Messages from 'components/tabsMessagesFriends/Messages'
import theme from './../styles/createTheme'
import ChatMenu from 'components/chat/ChatMenu'
import { UserChatProfile } from 'types/UserProfileData'
import StartChatting from 'components/chat/StartChatting'
import DisplayingChat from 'components/chat/DisplayingChat'
import messages from '../components/chat/chat.json'
import Swipes from 'components/swipes/Swipes'
import NoMoreMatchesDialog from 'pages/NoMoreMatchesDialog'

const MessagesPage = () => {
  const { classes } = useStyles()
  const [selectedChat, setSelectedChat] = useState<UserChatProfile | null>(null)
  const userId = '1'

  const FiltersDialogRef = useRef<{
    handleOpenNoMoreMatchesDialog: () => void
  }>(null)

  const handleOpenFiltersDialog = () => {
    FiltersDialogRef.current?.handleOpenNoMoreMatchesDialog()
  }

  const frienId = messages.participants.find((el) => el !== userId)

  const handleClick = (user: UserChatProfile) => {
    setSelectedChat(user)
  }
  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '389px 575px',
          '& > *:nth-of-type(2)': {
            paddingLeft: '105px',
          },
        }}
      >
        <Messages onClick={handleClick} />
        {selectedChat ? (
          <Box>
            <Box className={classes.header}>
              <Box className={classes.userInHeader}>
                <Avatar
                  src={selectedChat.avatar}
                  sx={{ width: 50, height: 50 }}
                />
                <Typography
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    fontSize: 20,
                  }}
                >
                  {selectedChat.name}, {selectedChat.age}
                </Typography>
              </Box>

              <ChatMenu />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 257px)',
                justifyContent: 'space-between',
                gap: '20px',
              }}
            >
              {Object.keys(messages).length != 0 &&
              selectedChat?.id === frienId ? (
                <DisplayingChat data={messages} userId={userId} />
              ) : (
                <StartChatting />
              )}
              <Box className={classes.sendMessageSection}>
                <TextareaAutosize
                  minRows={1}
                  maxRows={10}
                  placeholder="Type a message"
                  className={classes.textArea}
                />
                <img src="/img/messages/lol.svg" alt="lol" />
                <Button className={classes.sendBtn} variant="outlined">
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            <Link className={classes.filters} onClick={handleOpenFiltersDialog}>
              filters
            </Link>
            <Swipes />
          </Box>
        )}
      </Box>
      <NoMoreMatchesDialog ref={FiltersDialogRef} title="Filters" />
    </Box>
  )
}
export default MessagesPage

const useStyles = makeStyles()({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -78,
    paddingLeft: 22,
  },
  userInHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
  },
  sendMessageSection: {
    display: 'flex',
    gap: 20,
    bottom: 0,
    padding: '0 0 40px 15px',
    alignItems: 'end',
  },
  textArea: {
    width: 328,
    backgroundColor: ' #EEEEEE',
    color: theme.palette.text.primary,
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 1.3,
    fontWeight: 400,
    padding: '15px 18px',
    border: 'none',
    borderRadius: 10,
    outline: 'none',
  },
  sendBtn: {
    border: '2px solid  #F1562A',
    borderRadius: 10,
    padding: '6px 40.5px',
    textTransform: 'lowercase',
    fontSize: 16,
    lineHeight: 1.5,
    fontWeight: 600,
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
