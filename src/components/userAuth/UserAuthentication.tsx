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
      navigate('/friends')
    }
  }, [isAuthenticated, navigate])

  if (isLoading) {
    return <LoadingScreen />
  }

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: 'friends',
      },
    })
  }

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: 'fill-profile',
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
        New here?
      </Typography>
      <Typography className={`${commonClasses.subTitle} ${classes.subTitle}`}>
        Create an account
      </Typography>
      <Button
        fullWidth
        disableFocusRipple
        disableRipple
        disableElevation
        className={classes.btnLoginSocial}
        startIcon={
          <img className={classes.startIcon} alt="fb" src={'/img/fb.svg'} />
        }
        onClick={handleSignUp}
      >
        Facebook
      </Button>
      <Button
        fullWidth
        disableFocusRipple
        disableRipple
        disableElevation
        className={classes.btnLoginSocial}
        startIcon={
          <img
            className={classes.startIcon}
            alt="google"
            src={'/img/google.svg'}
          />
        }
        onClick={handleSignUp}
      >
        Google
      </Button>
      <Button
        fullWidth
        disableFocusRipple
        disableRipple
        disableElevation
        className={classes.btnLoginSocial}
        onClick={handleSignUp}
      >
        e-mail
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
      <Typography className={classes.textAlready}>
        Already have an account?
        <br />
        <Button
          variant="text"
          disableFocusRipple
          disableRipple
          onClick={handleLogin}
          className={classes.linkSignIn}
        >
          Sign In
        </Button>
      </Typography>
    </AuthPagesWrapper>
  )
}

export default UserAuthentication

const useStyles = makeStyles()({
  mainGrid: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  mainBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 20px',
    padding: '50px 0',
    [theme.breakpoints.up(390)]: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 350,
      margin: '0 auto',
      maxHeight: '100%',
      minHeight: 650,
    },
    '@media (max-height: 750px)': {
      position: 'static',
      transform: 'none',
    },
  },
  title: {
    paddingTop: 60,
  },
  subTitle: {
    marginBottom: 50,
  },
  btnLoginSocial: {
    textTransform: 'none',
    backgroundColor: theme.customPalette.authBtnBg,
    color: theme.palette.text.primary,
    height: 56,
    lineHeight: '56px',
    fontSize: 18,
    fontWeight: 400,
    borderRadius: 10,
    marginBottom: 15,
    '&:hover, &:active': {
      backgroundColor: theme.customPalette.authBtnBgHover,
    },
  },
  startIcon: {
    marginRight: 8,
  },
  agreement: {
    fontSize: 13,
    lineHeight: 1.2,
  },
  textAlready: {
    fontSize: 22,
    color: theme.palette.text.primary, //'#3B4054',
    textAlign: 'center',
    marginTop: 40,
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:hover, &:active': {
      textDecoration: 'underline',
    },
  },
  linkSignIn: {
    color: theme.palette.secondary.main,
    fontSize: 22,
    fontWeight: 400,
    lineHeight: 1.8,
    display: 'inline',
    textTransform: 'none',
    '&:hover, &:active': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
    },
  },
})
