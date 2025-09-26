import { Typography, Box } from '@mui/material'
import theme from 'styles/createTheme'
import { makeStyles } from 'tss-react/mui'

interface NoNewMatchesOrMessagesProps {
  text: string
  callToAction?: string
}

const NoNewMatchesOrMessages: React.FC<NoNewMatchesOrMessagesProps> = ({
  text,
  callToAction = 'Start searching!',
}) => {
  const { classes } = useStyles()

  return (
    <Box className={classes.container}>
      <Typography className={classes.textOnEmptyTabs}>
        {text}
        <br />
        {callToAction}
      </Typography>
      <img src="/img/friends/arrow.svg" alt="arrow" className={classes.arrow} />
    </Box>
  )
}

export default NoNewMatchesOrMessages

const useStyles = makeStyles()({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
      position: 'static',
      transform: 'none',
      marginTop: 70,
      width: 'auto',
    },
  },
  textOnEmptyTabs: {
    color: theme.palette.primary.main,
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.5,
    maxWidth: 262,
    textAlign: 'left',
    [theme.breakpoints.up('md')]: {
      fontSize: 24,
      maxWidth: 'none',
    },
  },
  arrow: {
    width: 160,
    height: 160,
    transform: 'rotate(75deg)',
    marginTop: 40,
    marginLeft: '-80px',
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
