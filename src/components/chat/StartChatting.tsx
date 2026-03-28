import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

export function StartChatting() {
  const { classes } = useStyles()
  return (
    <Box>
      <Box className={classes.container}>
        <Typography className={classes.text}>
          Connect with others by sharing your thoughts or experiences.
        </Typography>
        <Typography className={classes.text}>Start chatting now!</Typography>
      </Box>
      <Box className={classes.icons}>
        <img src="/img/messages/friendly.svg" alt="friendly" />
        <img src="/img/messages/hospitable.svg" alt="hospitable" />
        <img src="/img/messages/happy.svg" alt="happy" />
        <img src="/img/messages/love.svg" alt="love" />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    paddingTop: '44px',
  },
  text: {
    maxWidth: '315px',
    margin: '0 auto',
    color: theme.palette.primary.light,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 600,
    lineHeight: '22px',
  },
  icons: {
    display: 'flex',
    gap: 16,
    justifyContent: 'center',
    paddingTop: 35,
  },
}))
