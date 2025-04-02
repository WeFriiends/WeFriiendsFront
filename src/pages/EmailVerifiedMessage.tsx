import { Box, Button, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import Logo from 'components/logo/Logo'
import theme from '../styles/createTheme'
import { useNavigate } from 'react-router-dom'

const EmailVerifiedMessage = () => {
  const { classes } = useStyles()
  const navigate = useNavigate()

  const handleGoToHomePage = () => {
    navigate('/')
  }

  return (
    <Box className={classes.mainBox}>
      <Logo />
      <Typography className={classes.text}>
        Glad you’re here! <br /> Hope, you’ll enjoy!
      </Typography>
      <Button
        className={classes.startButton}
        variant="contained"
        onClick={handleGoToHomePage}
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
