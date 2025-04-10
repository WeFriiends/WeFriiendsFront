import { Box, Typography } from '@mui/material'
import theme from 'styles/createTheme'
import { makeStyles } from 'tss-react/mui'

const NoNewMatchesOrMessages = ({ message }: { message: React.ReactNode }) => {
  const { classes } = useStyles()
  return (
    <Box>
      <Typography className={classes.textOnEmptyTabs}>{message}</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginRight: '30px',
        }}
      >
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
    lineHeight: 1.5,
    fontWeight: 500,
    marginTop: 70,
    [theme.breakpoints.down('lg')]: {
      fontSize: 18,
    },
  },
})
