import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

export function UnreadMessageIndicator() {
  const { classes } = useStyles()
  return (
    <Box className={classes.conversationAlert}>
      <img src="/img/messages/envelope.svg" alt="You have new conversations!" />
    </Box>
  )
}

const useStyles = makeStyles()((theme) => ({
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
}))
