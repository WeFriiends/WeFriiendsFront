import { Box } from '@mui/material'
import { Header } from 'components/header/Header'
import { Outlet } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'

export default function Layout() {
  const { classes } = useStyles()
  return (
    <Box className={classes.wrapper}>
      <Header />
      <Box component="main" className={classes.main}>
        <Outlet />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.customDimensions.contentGap,
      paddingTop: theme.customDimensions.headerTopOffset,
    },
  },
  main: {
    width: '100%',
    margin: '0 auto',
    maxWidth: 1024,
    paddingInline: 30,
    paddingBottom: theme.customDimensions.contentBottomOffset,
    [theme.breakpoints.down('lg')]: {
      paddingInline: 20,
    },
    [theme.breakpoints.up('md')]: {
      paddingBottom: 0,
    },
  },
}))
