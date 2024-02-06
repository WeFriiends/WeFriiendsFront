import Logo from 'components/logo/Logo'
import { Box, Button, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { commonStyles } from 'styles/commonStyles'
import { useNavigate } from 'react-router-dom'

const EmailAlreadyUsed = () => {
  const { classes } = useStyles()
  const commonClasses = commonStyles().classes
  const navigate = useNavigate()

  const navigateToSignIn = () => {
    navigate('/authentication/email-sign-in')
  }

  return (
    <Box className={commonClasses.mainBox}>
      <Logo />
      <Typography className={classes.headerText}>
        E-mai is already registered. <br /> Please
      </Typography>
      <Button
        variant="contained"
        className={`${commonClasses.submitButton} ${classes.signInBtn}`}
        onClick={navigateToSignIn}
      >
        sing in
      </Button>
    </Box>
  )
}
export default EmailAlreadyUsed

const useStyles = makeStyles()(() => {
  return {
    headerText: {
      fontWeight: 600,
      fontSize: 22,
      lineHeight: '40px',
      color: '#F46B5D',
      textAlign: 'center',
      paddingTop: 144,
    },
    signInBtn: {
      width: '70%',
      marginTop: 30,
    },
  }
})
