import React from 'react'
import { Typography, Link, Button } from '@mui/material'
import IconNewTab from '../../common/svg/IconNewTab'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'
import { useAuth0 } from '@auth0/auth0-react'

const HelpAndSupport: React.FC = () => {
  const { classes } = useStyles()
  const { logout } = useAuth0()
  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin, // Redirects to home after logout
      },
    })
  }

  return (
    <>
      <Typography variant="h1" className={classes.helpTitle}>
        Help & support
      </Typography>
      <hr className={classes.separator} />
      <Typography variant="h2" className={classes.subtitle}>
        Security tips
      </Typography>
      <Typography variant="body2" className={classes.description}>
        <Link
          className={classes.linkGrey}
          href="https://wefriiends.com/documents/privacy.html"
          target="_blank"
          rel="noopener"
        >
          Rules of community
          <IconNewTab />
        </Link>
        <Link
          className={classes.linkGrey}
          href="https://wefriiends.com/documents/privacy.html"
          target="_blank"
          rel="noopener"
        >
          Security tips
          <IconNewTab />
        </Link>
      </Typography>
      <hr className={classes.separator} />
      <Typography variant="h2" className={classes.subtitle}>
        Legal data
      </Typography>
      <Typography variant="body2" className={classes.description}>
        <Link
          className={classes.linkGrey}
          href="https://wefriiends.com/documents/privacy.html"
          target="_blank"
          rel="noopener"
        >
          Privacy settings
          <IconNewTab />
        </Link>
        <Link
          className={classes.linkGrey}
          href="https://wefriiends.com/documents/privacy.html"
          target="_blank"
          rel="noopener"
        >
          Cookies
          <IconNewTab />
        </Link>
        <Link
          className={classes.linkGrey}
          href="https://wefriiends.com/documents/privacy.html"
          target="_blank"
          rel="noopener"
        >
          Privacy policy
          <IconNewTab />
        </Link>
        <Link
          className={classes.linkGrey}
          href="https://wefriiends.com/documents/privacy.html"
          target="_blank"
          rel="noopener"
        >
          Terms of use
          <IconNewTab />
        </Link>
      </Typography>
      <hr className={classes.separator} />
      <Link
        className={classes.linkOrange}
        href="https://wefriiends.com/documents/privacy.html"
        target="_blank"
        rel="noopener"
      >
        Share WeFriiends
      </Link>
      <hr className={classes.separator} />
      <Button
        variant="text"
        onClick={handleLogout}
        className={classes.linkOrange}
      >
        Log out
      </Button>
      <hr className={classes.separator} />
      <Link
        className={classes.linkOrange}
        href="https://wefriiends.com/documents/privacy.html"
        target="_blank"
        rel="noopener"
      >
        Delete account
      </Link>
      <hr className={classes.separator} />
      <Typography variant="body2" className={classes.version}>
        version 2.33
      </Typography>
    </>
  )
}

export default HelpAndSupport

const useStyles = makeStyles()({
  helpTitle: {
    fontSize: 20,
    fontWeight: 500,
    lineHeight: '20px',
    marginTop: 200,
    paddingBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: '22px',
    marginTop: 15,
    marginBottom: 20,
  },
  description: {
    lineHeight: 1.3,
    marginBottom: 30,
  },
  separator: {
    height: 1.5,
    lineHeight: 0,
    border: 0,
    backgroundColor: theme.customPalette.colorInputGrey,
    marginBottom: 25,
  },
  linkGrey: {
    fontSize: 16,
    lineHeight: '22px',
    color: theme.customPalette.colorActiveGrey,
    textDecoration: 'none',
    display: 'flex',
    maxWidth: '190px',
    justifyContent: 'space-between',
    marginBottom: 5,
    '&:hover': {
      fontWeight: 600,
      '& svg path': {
        fill: theme.palette.primary.main,
      },
    },
  },
  linkOrange: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '20px',
    color: theme.palette.primary.dark,
    textDecoration: 'none',
    margin: '15px 0 20px',
    display: 'block',
    padding: 0,
    textTransform: 'none',
  },
  version: {
    fontSize: 14,
    lineHeight: '22px',
    color: theme.customPalette.colorActiveGrey,
  },
})
