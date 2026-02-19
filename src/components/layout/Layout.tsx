import { Box } from '@mui/material'
import { Header } from 'components/header/Header'
import { Outlet } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'

export default function Layout() {
  const { classes } = useStyles()
  return (
    <>
      <Header />
      <Box component="main" className={classes.main}>
        <Outlet />
      </Box>
    </>
  )
}

const useStyles = makeStyles()((theme) => ({
  main: {
    margin: '0 auto',
    maxWidth: 1024,
    padding: '0 30px',
    [theme.breakpoints.down('lg')]: {
      padding: '0 20px',
    },
  },
}))
