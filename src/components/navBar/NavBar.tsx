import { useLocation } from 'react-router-dom'
import { BottomNavigation } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { NavigationLink } from './NavigationLink'
import { navMenu } from '../../data/navMenu'
import { useConversationsStore } from 'zustand/conversationsStore'
import { APP_ROUTES } from 'routes/appRoutes'

export function NavBar() {
  const location = useLocation()
  const { classes } = useStyles()
  const hasUnreadMessages = useConversationsStore((state) =>
    state.conversations.some((conversation) => conversation.messageCount > 0)
  )

  return (
    <BottomNavigation className={classes.list} component="nav">
      {navMenu.map(({ to, icon }) => (
        <NavigationLink
          key={to}
          to={to}
          icon={icon}
          isActive={location.pathname === to}
          showBadge={to === `/${APP_ROUTES.messages}` && hasUnreadMessages}
        />
      ))}
    </BottomNavigation>
  )
}

const useStyles = makeStyles()((theme) => ({
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    margin: 0,
    padding: 0,
    [theme.breakpoints.up('md')]: {
      maxWidth: 320,
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 420,
    },
    [theme.breakpoints.down('md')]: {
      paddingInline: 32,
    },
  },
}))
