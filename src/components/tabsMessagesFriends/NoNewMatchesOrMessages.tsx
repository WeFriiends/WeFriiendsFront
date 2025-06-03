import { Box, Typography, useMediaQuery } from '@mui/material'
import theme from 'styles/createTheme'
import { makeStyles } from 'tss-react/mui'

const NoNewMatchesOrMessages = ({ text }: { text: string }) => {
  const { classes } = useStyles()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box className={classes.centeredForMobile}>
      <Typography className={classes.textOnEmptyTabs}>{text}</Typography>
      <Typography className={classes.textOnEmptyTabs}>
        Start searching!
      </Typography>
      {!isMobile && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: '30px',
          }}
        >
          <img src="/img/friends/arrow.svg" alt="arrow" />
        </Box>
      )}
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
})
