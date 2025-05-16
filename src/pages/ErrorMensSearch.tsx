import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import Logo from '../components/logo/Logo'
import { makeStyles } from 'tss-react/mui'
import { commonStyles } from '../styles/commonStyles'
import theme from '../styles/createTheme'

const ErrorMensSearch = () => {
  const commonClasses = commonStyles().classes
  const { classes } = useStyles()
  const [isClickedOk, setIsClickedOk] = useState(false)

  function handleClick() {
    setIsClickedOk(true)
  }

  return (
    <Box className={classes.authWrapper}>
      <Box className={classes.authContent}>
        <Logo />
        {isClickedOk ? (
          <Typography variant="h2" className={classes.title}>
            Try again later
          </Typography>
        ) : (
          <Typography variant="h2" className={classes.title}>
            Sorry!
            <br />
            There is no friends in your area
          </Typography>
        )}
        {isClickedOk ? (
          <Box
            sx={{ pt: '13px', maxWidth: '100%' }}
            component="img"
            src="/img/error/error-try-later.svg"
            alt="Try again later"
          />
        ) : (
          <>
            <Box
              sx={{ maxWidth: '102px' }}
              component="img"
              src="/img/error/error-no-friends.png"
              alt="Sorry! There is no friends in your area"
            />
            <Button
              onClick={handleClick}
              className={`${commonClasses.submitButton} ${classes.noticeButton}`}
              disableElevation
              disableRipple
            >
              OK
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}

export default ErrorMensSearch

const useStyles = makeStyles()({
  authWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  authContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '50px 20px',
    width: '100%',
    [theme.breakpoints.up(390)]: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
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
    padding: '80px 0 20px',
    fontSize: 32,
    lineHeight: '38px',
    maxWidth: 295,
    textAlign: 'center',
    fontWeight: 600,
  },
  noticeButton: {
    height: 60,
    width: 180,
    marginTop: 80, // should be 0 rather in common styles?
    textTransform: 'none',
  },
})
