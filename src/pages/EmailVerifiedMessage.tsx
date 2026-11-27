import { Box, Button, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useAuth0 } from '@auth0/auth0-react'
import Logo from 'components/logo/Logo'
import { APP_ROUTES } from 'routes/appRoutes'
import theme from '../styles/createTheme'

const EmailVerifiedMessage = () => {
  const { classes } = useStyles()
  const { loginWithRedirect } = useAuth0()

  const handleStart = () =>
    loginWithRedirect({
      appState: { returnTo: APP_ROUTES.callback },
      authorizationParams: { screen_hint: 'login' },
    })

  return (
    <Box className={classes.mainBox}>
      <Logo />
      <Typography className={classes.text}>
        Glad you’re here! <br /> Hope, you’ll enjoy!
      </Typography>
      <Button
        className={classes.startButton}
        variant="contained"
        onClick={handleStart}
      >
        let’s start!
      </Button>
    </Box>
  )
}
export default EmailVerifiedMessage

const useStyles = makeStyles()({
  mainBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 200,
  },
  text: {
    fontSize: 40,
    lineHeight: '150%',
    fontWeight: 500,
    marginTop: 90,
    marginBottom: 50,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 290,
    },
  },
  startButton: {
    width: 260,
    textTransform: 'lowercase',
    backgroundColor: theme.palette.primary.light,
    color: '#FFFFFF',
    height: 56,
    fontSize: 18,
    fontWeight: 600,
    borderRadius: 10,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
})
