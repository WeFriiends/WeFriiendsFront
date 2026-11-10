import { Typography, Link, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useAuth0 } from '@auth0/auth0-react'
import { commonStyles } from 'styles/commonStyles'
import Loader from 'common/components/Loader'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import theme from '../../styles/createTheme'
import AuthPagesWrapper from '../firstProfile/AuthPagesWrapper'
import { useSnackbarStore } from 'zustand/snackbarStore'
import { SESSION_EXPIRED_STORAGE_KEY } from 'data/constants'
import {
  clearSessionStorage,
  getItemFromSessionStorage,
} from 'utils/sessionStorage'

const UserAuthentication = () => {
  const { classes } = useStyles()
  const commonClasses = commonStyles().classes
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0()
  const navigate = useNavigate()

  useEffect(() => {
    if (!getItemFromSessionStorage<boolean>(SESSION_EXPIRED_STORAGE_KEY)) return
    clearSessionStorage([SESSION_EXPIRED_STORAGE_KEY])
    useSnackbarStore
      .getState()
      .showSnackbar('Your session has expired. Please log in again.', 'info')
  }, [])

  // Redirect if logged in
  useEffect(() => {
    if (isAuthenticated) {
      // when app is opened and it`s already authenticated
      navigate('/callback')
    }
  }, [isAuthenticated, navigate])

  if (isLoading) {
    return <Loader />
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
        className={classes.btnConnect}
        onClick={handleSignUp}
      >
        Create account
      </Button>
      <div>
        <Typography variant="body2" className={classes.signInText}>
          Already have an account?{' '}
          <Link
            component="button"
            onClick={handleLogin}
            className={classes.signInTextLink}
            underline="none"
            rel="noopener"
          >
            Sign in
          </Link>
        </Typography>
      </div>
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
    '&.Mui-disabled': {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.textDisabled,
      border: `2px solid ${theme.palette.borderDisabled}`,
    },
  },
  signInText: {
    fontSize: 18,
    lineHeight: 1.2,
    fontWeight: 400,
    color: theme.palette.text.primary,
    textAlign: 'center',
  },
  signInTextLink: {
    color: theme.palette.primary.light,
    textDecoration: 'none',
    '&:hover, &:active': {
      textDecoration: 'underline',
    },
  },
})
