import { ReactNode } from 'react'
import { Box, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'

interface UserProfileWrapperRightColProps {
  children: ReactNode
  handleCloseFriendProfile?: () => void
}

const UserProfileWrapperRightCol = ({
  children,
  handleCloseFriendProfile,
}: UserProfileWrapperRightColProps) => {
  const { classes } = useStyles()
  return (
    <Box className={classes.wrapperUserProfile}>
      <Box className={classes.topSpacePlaceholderProfile} />
      {handleCloseFriendProfile && (
        <Box className={classes.friendProfileControlsMobile}>
          <Button onClick={handleCloseFriendProfile}>{'<- Back'}</Button>
        </Box>
      )}
      {children}
    </Box>
  )
}
export default UserProfileWrapperRightCol

const useStyles = makeStyles()({
  wrapperUserProfile: {
    maxWidth: 450,
    margin: '0 auto',
  },
  topSpacePlaceholderProfile: {
    [theme.breakpoints.up('md')]: {
      height: 127,
    },
    [theme.breakpoints.up('lg')]: {
      height: 67,
    },
  },
  friendProfileControlsMobile: {
    paddingTop: 30,
    fontSize: 24,
    lineHeight: 1.5,
    paddingBottom: 31,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 60,
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
})
