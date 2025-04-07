import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../styles/createTheme'
import Logo from 'components/logo/Logo'

const AccountConfirmationMessage = () => {
  const { classes } = useStyles()

  return (
    <Box className={classes.mainBox}>
      <Logo />
      <Box className={classes.textBox}>
        <Typography className={classes.title}>Just one more step!</Typography>
        <Box mb={5} mt={10}>
          <Typography sx={{ fontSize: 18, lineHeight: '22px' }}>
            We’ve sent an e-mail <br /> to confirm your account
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 18, lineHeight: '22px' }}>
            Please, check your inbox.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default AccountConfirmationMessage

const useStyles = makeStyles()({
  mainBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 200,
  },
  textBox: {
    paddingTop: 80,
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  title: {
    fontSize: 32,
    fontWeight: 600,
    lineHeight: '40px',
    paddingTop: 80,
    color: theme.palette.primary.main,
    textAlign: 'center',
  },
})
