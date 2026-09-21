import { Link, useLocation } from 'react-router-dom'
import { Avatar, Button, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useProfileStore } from 'zustand/store'
import { DEFAULT_PROFILE_PHOTO } from 'data/constants'
import { APP_ROUTES } from 'routes/appRoutes'

const MY_ACCOUNT_PATH = `/${APP_ROUTES.myAccount}`

export function UserProfileLink() {
  const { pathname } = useLocation()
  const { classes, cx } = useStyles()
  const name = useProfileStore((state) => state.data?.name)
  const avatarSrc =
    useProfileStore((state) => state.data?.photos?.[0]) ?? DEFAULT_PROFILE_PHOTO

  return (
    <Button
      variant="text"
      component={Link}
      to={MY_ACCOUNT_PATH}
      disableRipple
      className={cx(
        classes.userDetails,
        pathname === MY_ACCOUNT_PATH && classes.userDetailsActive
      )}
    >
      <Avatar src={avatarSrc} sx={{ width: 60, height: 60 }} />
      <Typography className={classes.name}>{name || 'Loading...'}</Typography>
    </Button>
  )
}

const useStyles = makeStyles()((theme) => {
  const { headerTopOffset, headerHighlightBottom } = theme.customDimensions

  return {
    name: {
      fontSize: 20,
      fontWeight: 600,
      lineHeight: '120%',
      color: theme.palette.primary.dark,
      overflowWrap: 'anywhere',
      [theme.breakpoints.up('lg')]: {
        fontSize: 24,
      },
    },
    userDetails: {
      display: 'none',
      textDecoration: 'none',
      textTransform: 'none',
      textAlign: 'left',
      gap: '15px',
      borderRadius: '0 0 10px 10px',
      transition: '0.3s background-color',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'stretch',
        width: 297,
        flexShrink: 0,
        padding: `${headerTopOffset}px 4px ${headerHighlightBottom}px 20px`,
        margin: `${-headerTopOffset}px 0 ${-headerHighlightBottom}px 0`,
      },
      '&:hover, &.Mui-focusVisible': {
        backgroundColor: theme.customPalette.authBtnBg,
      },
    },
    userDetailsActive: {
      backgroundColor: theme.customPalette.authBtnBg,
    },
  }
})
