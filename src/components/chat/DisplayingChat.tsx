import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from './../../styles/createTheme'
import { Chat, Message } from 'types/Chat'
import StartChatting from './StartChatting'

const DisplayingChat = ({ data, userId }: { data: Chat; userId: string }) => {
  const { classes } = useStyles()

  return (
    <>
      {data.messages.length === 0 ? (
        <StartChatting />
      ) : (
        <Box className={classes.messagesArea}>
          {[...data.messages].reverse().map((message: Message) => (
            <Box
              key={message.messageId}
              sx={{
                alignSelf:
                  message.senderId === userId ? 'flex-end' : 'flex-start',
                backgroundColor:
                  message.senderId === userId ? '#FEDED2' : '#EEEEEE',
              }}
              className={classes.message}
            >
              <Typography className={classes.messageText}>
                {message.message}
              </Typography>
              <Typography
                className={classes.messageDate}
                sx={{
                  textAlign: message.senderId === userId ? 'right' : 'left',
                }}
              >
                {new Date(message.timestamp).toLocaleString([], {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </>
  )
}

export default DisplayingChat

const useStyles = makeStyles()({
  messagesArea: {
    display: 'flex',
    flexDirection: 'column-reverse',
    gap: '12px',
    marginTop: 31,
    padding: '13px 22px 12px',
    overflow: 'auto',
    overscrollBehavior: 'contain',
    [theme.breakpoints.up('md')]: {
      maxHeight: 'calc(100vh - 500px)',
      minHeight: 400,
    },
  },
  message: {
    maxWidth: '85%',
    padding: '12px',
    borderRadius: '10px',
    wordWrap: 'break-word',
  },
  messageText: {
    fontSize: '14px',
    lineHeight: '18.2px',
    color: theme.palette.text.primary,
  },
  messageDate: {
    fontSize: '12px',
    lineHeight: '15.6px',
    color: 'rgba(68, 68, 68, 0.8)',
    marginTop: 5,
  },
})
