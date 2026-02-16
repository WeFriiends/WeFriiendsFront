import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'

export function InfoBar() {
  const { classes } = useStyles()
  return (
    <Box className={classes.container}>
      <Typography variant="h1" className={classes.title}>
        Your likes list
      </Typography>
      <Typography variant="body2" className={classes.description}>
        These people have already liked you – just like them back and it’s a
        match!
      </Typography>
    </Box>
  )
}

const useStyles = makeStyles()({
  container: {
    marginBottom: 30,
  },
  title: {
    paddingTop: 30,
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 600,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 60,
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: 0,
      paddingBottom: 20,
      textAlign: 'left',
      fontSize: 24,
      fontWeight: 500,
    },
  },
  description: {
    textAlign: 'center',

    [theme.breakpoints.up('lg')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '320px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
})
