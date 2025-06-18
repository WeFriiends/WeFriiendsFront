import { Box, Typography } from '@mui/material'
import theme from 'styles/createTheme'
import { makeStyles } from 'tss-react/mui'

const NoNewMatchesOrMessages = ({ text }: { text: string }) => {
  const { classes } = useStyles()

  return (
    <Box className={classes.centeredForMobile}>
      <Typography className={classes.textOnEmptyTabs}>{text}</Typography>
      <Typography className={classes.textOnEmptyTabs}>
        Start searching!
      </Typography>
      <Box className={classes.arrow}>
        <img src="/img/friends/arrow.svg" alt="arrow" />
      </Box>
    </Box>
  )
}
export default NoNewMatchesOrMessages

const useStyles = makeStyles()({
  textOnEmptyTabs: {
    color: theme.palette.primary.main,
    fontSize: 24,
    fontWeight: 500,
  },
  centeredForMobile: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 222px)',
      textAlign: 'center',
    },
  },
  arrow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '30px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
})
