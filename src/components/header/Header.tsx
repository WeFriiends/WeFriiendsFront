import { useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { NavBar } from '../navBar/NavBar'
import { UserProfileLink } from '../../common/components/UserProfileLink'
import { LogoLink } from 'common/components/LogoLink'
import { useChatStore } from 'zustand/chatStore'
import { APP_ROUTES } from 'routes/appRoutes'

export function Header() {
  const { classes } = useStyles()
  const location = useLocation()
  const isChatOpen = useChatStore((state) => !!state.selectedChatId)
  // selectedChatId survives leaving the page, so the route check keeps the tab bar on other pages
  const hideOnMobile =
    isChatOpen && location.pathname === `/${APP_ROUTES.messages}`

  return (
    <Box
      component="header"
      className={`${classes.header} ${
        hideOnMobile ? classes.hiddenOnMobile : ''
      }`}
    >
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
      minHeight: theme.customDimensions.mobileNavHeight,
      boxShadow: '0 0 7px 1px rgba(179, 179, 179, 0.14)',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 32,
      height: theme.customDimensions.headerHeight,
      paddingInline: 30,
      width: '100%',
      margin: '0 auto',
      maxWidth: 1024,
    },
  },
  hiddenOnMobile: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}))
