import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'
import IconLightning from 'common/svg/IconLightning'
import { UserMiniProfile } from 'common/types/userTypes'

interface UserMiniCardProps {
  user: UserMiniProfile
}

export function UserMiniCard({ user }: UserMiniCardProps) {
  const { classes } = useStyles()
  return (
    <Box className={classes.container}>
      <Box sx={{ position: 'relative' }}>
        <Box className={classes.imageWrapper}>
          <img
            className={classes.image}
            src={user.picture ?? ''}
            alt="Profile photo"
          />
          <Box className={classes.iconContainer}>
            <IconLightning />
          </Box>
        </Box>
      </Box>
      <Box component="aside">
        <h4 className={classes.userName}>{user.name}</h4>
        <Box className={classes.distanceContainer}>
          <img src="/img/icon-location.svg" alt="distance" />
          <Typography className={classes.distance}>
            {`${user.distance} km`}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBlock: 22,
    textAlign: 'center',
    fontFamily: 'Inter',
    width: '100%',
    '& path': {
      // lightning icon color mobile
      fill: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      '& path': {
        // lightning icon color desktop
        fill: theme.customPalette.colorNavIcon,
      },
    },
    '&:hover path': {
      // lightning icon hover color desktop
      fill: theme.palette.primary.main,
    },
    '& aside path': {
      fill: 'transparent',
      stroke: theme.palette.text.primary,
    },
    '&:hover aside path': {
      fill: 'transparent',
      stroke: theme.palette.text.primary,
    },
    '& h4': {
      transition: 'color .3s',
    },
    '&:hover h4': {
      color: theme.palette.primary.main,
    },
  },
  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 81,
    height: 81,
    borderRadius: '50%',
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      width: 100,
      height: 100,
    },
    [theme.breakpoints.up('md')]: {
      width: 130,
      height: 130,
    },
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  iconContainer: {
    position: 'absolute',
    top: '1%',
    right: '-10%',
    width: '50%',
    height: '25%',
  },
  userName: {
    fontWeight: 500,
    color: theme.palette.common.black,
    fontSize: 12,
    lineHeight: '20px',
    padding: '5px 5px 0',
    transition: 'color 0.3s',
    [theme.breakpoints.up('lg')]: {
      fontSize: 16,
      paddingTop: 15,
    },
  },
  distanceContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
  },
  distance: {
    color: theme.palette.text.primary,
    fontSize: 12,
    lineHeight: '20px',
    fontWeight: 500,
    paddingLeft: 4,
  },
}))
