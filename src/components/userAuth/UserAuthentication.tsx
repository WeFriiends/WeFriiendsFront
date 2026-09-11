import { Typography, Link, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useAuth0 } from '@auth0/auth0-react'
import { commonStyles } from 'styles/commonStyles'
import Loader from 'common/components/Loader'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import theme from '../../styles/createTheme'
import AuthPagesWrapper from '../firstProfile/AuthPagesWrapper'
import clsx from 'clsx'
import { StyledCheckbox } from 'common/components/StyledCheckbox'

const UserAuthentication = () => {
  const { classes } = useStyles()
  const commonClasses = commonStyles().classes
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0()
  const navigate = useNavigate()

  const [checked, setChecked] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

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
        className={clsx(classes.btnConnect, !checked && classes.btnDisabled)}
        onClick={handleSignUp}
        disabled={!checked}
      >
        Create account
      </Button>
      <div className={classes.agreementWrapper}>
        <StyledCheckbox checked={checked} handleChange={handleChange} />
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
      </div>
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
  },

  btnDisabled: {
    backgroundColor: '#FFFFFF',
    color: '#FB8F67 !important',
    borderRadius: 10,
    border: '2px solid #FB8F67',
  },
  agreementWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 52,
  },
  checkbox: {
    padding: 0,
    margin: 0,
    marginRight: 10,
  },
  agreement: {
    fontSize: 12,
    lineHeight: 1.2,
    fontWeight: 400,
    color: '#444444',
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:hover, &:active': {
      textDecoration: 'underline',
    },
  },
  signInText: {
    fontSize: 18,
    lineHeight: 1.2,
    fontWeight: 400,
    color: '#444444',
    textAlign: 'center',
  },
  signInTextLink: {
    color: '#FB8F67',
    textDecoration: 'none',
    '&:hover, &:active': {
      textDecoration: 'underline',
    },
  },
})
