import { Typography } from '@mui/material'
import theme from 'styles/createTheme'
import { makeStyles } from 'tss-react/mui'

const NoNewMatchesOrMessages = ({ text }: { text: string }) => {
  const { classes } = useStyles()

  return (
    <Typography className={classes.textOnEmptyTabs}>
      {text}
      <br />
      Start searching!
      <img src="/img/friends/arrow.svg" alt="arrow" className={classes.arrow} />
    </Typography>
  )
}
export default NoNewMatchesOrMessages

const useStyles = makeStyles()({
  textOnEmptyTabs: {
    color: theme.palette.primary.main,
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.5,
    maxWidth: 262,
    position: 'fixed',
    bottom: 105,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100vw - 40px)',
    '@media (max-height: 470px)': {
      position: 'static',
      transform: 'none',
      margin: '0 auto',
    },

    [theme.breakpoints.up('md')]: {
      fontSize: 24,
      fontWeight: 500,
      maxWidth: 'none',
      position: 'static',
      transform: 'none',
      marginTop: 70,
      width: 'auto',
    },
  },
  arrow: {
    width: 160,
    height: 160,
    transform: 'rotate(75deg)',
    marginTop: 40,
    [theme.breakpoints.up('md')]: {
      position: 'static',
      display: 'block',
      marginLeft: 'auto',
      marginTop: 15,
      transform: 'none',
      height: 'auto',
    },
  },
})
