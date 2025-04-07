import { Box, Button, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from './../styles/createTheme'
import Logo from 'components/logo/Logo'
import { useNavigate } from 'react-router-dom'

const EmailAlreadyConfirmed = () => {
  const { classes } = useStyles()
  const navigate = useNavigate()

  const handleGoToHomePage = () => {
    navigate('/')
  }
  return (
    <Box className={classes.mainBox}>
      <Logo />
      <Typography className={classes.text}>
        The verification link has already been used.
      </Typography>
      <Button
        className={classes.linkBtn}
        variant="contained"
        onClick={handleGoToHomePage}
      >
        Go to the main page
      </Button>
    </Box>
  )
}

export default EmailAlreadyConfirmed

const useStyles = makeStyles()({
  mainBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 200,
  },
  text: {
    fontSize: 20,
    lineHeight: '150%',
    marginTop: 90,
    marginBottom: 90,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 290,
      textAlign: 'center',
    },
  },
  linkBtn: {
    textTransform: 'lowercase',
    backgroundColor: theme.palette.primary.light,
    color: '#FFFFFF',
    height: 56,
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 18,
    fontWeight: 600,
    borderRadius: 10,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
})
