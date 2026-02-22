import { Link } from 'react-router-dom'
import { Avatar, Button, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useProfileStore } from 'zustand/store'

export function UserProfileLink() {
  const { data: profile, loading } = useProfileStore()
  const avatar = profile?.photos?.[0]
  const avatarSrc =
    typeof avatar === 'string'
      ? avatar
      : avatar?.url ?? '/img/placeholders/girl-big.svg'
  const { classes } = useStyles()

  return (
    <Button
      variant="text"
      component={Link}
      to="/my-account"
      disableRipple
      className={`${classes.userDetails} ${
        location.pathname === '/my-account' && classes.userDetailsActive
      }`}
    >
      <Avatar src={avatarSrc} sx={{ width: 56, height: 56 }} />
      {!loading ? (
        <Typography className={classes.name}>
          {profile?.name || 'Loading...'}
        </Typography>
      ) : (
        <Typography className={classes.name}>Loading...</Typography>
      )}
    </Button>
  )
}

const useStyles = makeStyles()((theme) => ({
  name: {
    fontSize: 28,
    fontWeight: 600,
    lineHeight: '40px',
    color: '#F1562A',
    position: 'relative',
    wordBreak: 'break-word',
    [theme.breakpoints.up('lg')]: {
      fontSize: 32,
    },
  },
  userDetails: {
    display: 'none',
    textDecoration: 'none',
    maxWidth: 285,
    textTransform: 'none',
    textAlign: 'left',
    maxHeight: 56,
    gap: '25px',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: -35,
      left: -20,
      right: 0,
      bottom: -40,
      zIndex: 0,
      borderRadius: '0 0 10px 10px',
      transition: '0.3s background-color',
    },
    '&:hover:before': {
      backgroundColor: '#FFF1EC',
    },
  },
  userDetailsActive: {
    position: 'relative',
    '&:before': {
      backgroundColor: '#FFF1EC',
    },
  },
}))
