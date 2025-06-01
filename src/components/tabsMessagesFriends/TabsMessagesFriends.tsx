import * as React from 'react'
import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
// import { useNewFriendsList } from 'hooks/useFriendsList'  *temporarily commented out - until API for the new friends list is added*
import { Link, Outlet, useLocation } from 'react-router-dom'
import theme from '../../styles/createTheme'

const TabsMessagesFriends: React.FC = () => {
  const { classes } = useStyles()
  const location = useLocation().pathname

  // const { data: friendsList } = useNewFriendsList() *temporarily commented out - until API for the new friends list is added*
  const friendsList = [] // temporary solution, until API for the new friends list is added

  const getColor = (path: string): string => {
    return path === location
      ? theme.palette.primary.dark
      : theme.palette.text.primary
  }

  return (
    <Box sx={{ maxWidth: '1024px', margin: '0 auto' }}>
      <Box
        sx={{ maxWidth: '419px', paddingBottom: '38px', paddingTop: '10px' }}
      >
        <Link
          to="/messages"
          style={{
            color: getColor('/messages'),
            paddingRight: '60px',
          }}
          className={classes.labelStyle}
        >
          Messages
        </Link>
        <Link
          to="/friends"
          style={{
            color: getColor('/friends'),
          }}
          className={classes.labelStyle}
        >{`New friends (${friendsList?.length})`}</Link>
      </Box>
      <Outlet />
    </Box>
  )
}

export default TabsMessagesFriends

const useStyles = makeStyles()({
  labelStyle: {
    textTransform: 'capitalize',
    fontSize: 22,
    lineHeight: 1.5,
    fontWeight: 500,
    textDecoration: 'none',
  },
  removeIndicator: {
    display: 'none',
  },
})
