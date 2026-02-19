import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { NavBar } from '../navBar/NavBar'
import { UserProfileLink } from '../../common/components/UserProfileLink'
import { LogoLink } from 'common/components/LogoLink'

export function Header() {
  const { classes } = useStyles()
  return (
    <Box component="header" className={classes.header}>
      <LogoLink />
      <NavBar />
      <UserProfileLink />
    </Box>
  )
}

const useStyles = makeStyles()((theme) => ({
  header: {
    bottom: -1,
    right: 0,
    left: 0,
    zIndex: 999,
    background: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {
      position: 'fixed',
      minHeight: 60,
      boxShadow: '0 0 7px 1px rgba(179, 179, 179, 0.14)',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '30px 30px 80px',
      margin: '0 auto',
      maxWidth: 1024,
    },
  },
}))
