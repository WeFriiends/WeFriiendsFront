import { Typography, Link, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useAuth0 } from '@auth0/auth0-react'
import { commonStyles } from 'styles/commonStyles'
import LoadingScreen from 'common/svg/Loader'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import theme from '../../styles/createTheme'
import AuthPagesWrapper from '../firstProfile/AuthPagesWrapper'

const UserAuthentication = () => {
  const { classes } = useStyles()
  const commonClasses = commonStyles().classes
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0()
  const navigate = useNavigate()

  // Redirect if logged in
  useEffect(() => {
    if (isAuthenticated) {
      // when app is opened and it`s already authenticated
      navigate('/callback')
    }
  }, [isAuthenticated, navigate])

  if (isLoading) {
    return <LoadingScreen />
  }

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: 'callback',
      },
      authorizationParams: {
        screen_hint: 'login',
      },
    })
  }

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: 'callback',
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    })
  }

  return (
    <AuthPagesWrapper>
      <Typography
        variant="h1"
        className={`${commonClasses.title} ${classes.title}`}
      >
        Let’s start!
      </Typography>
      <Button
        fullWidth
        disableFocusRipple
        disableRipple
        disableElevation
        onClick={handleLogin}
        className={classes.btnConnect}
      >
        Log in
      </Button>
      <Button
        fullWidth
        disableFocusRipple
        disableRipple
        disableElevation
        className={classes.btnConnect}
        onClick={handleSignUp}
      >
        Create account
      </Button>
      <Typography variant="body2" className={classes.agreement}>
        By creating an account, I agree with{' '}
        <Link
          className={classes.link}
          href="https://wefriiends.com/documents/privacy.html"
          target="_blank"
          rel="noopener"
        >
          {'The Terms of Service '}
        </Link>
        and{' '}
        <Link
          className={classes.link}
          href="https://wefriiends.com/documents/privacy.html"
          target="_blank"
          rel="noopener"
        >
          {'Privacy Policy'}
        </Link>
      </Typography>
    </AuthPagesWrapper>
  )
}

export default UserAuthentication

const useStyles = makeStyles()({
  title: {
    padding: '65px 0 50px',
  },
  btnConnect: {
    textTransform: 'none',
    backgroundColor: theme.customPalette.authBtnBg,
    color: theme.palette.text.primary,
    height: 56,
    lineHeight: '56px',
    fontSize: 18,
    fontWeight: 400,
    borderRadius: 10,
    marginBottom: 15,
    whiteSpace: 'nowrap',
    '&:hover, &:active': {
      backgroundColor: theme.customPalette.authBtnBgHover,
    },
  },
  agreement: {
    fontSize: 13,
    lineHeight: 1.2,
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:hover, &:active': {
      textDecoration: 'underline',
    },
  },
})
