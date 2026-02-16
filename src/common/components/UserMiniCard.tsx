import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import IconLightning from 'common/svg/IconLightning'
import { UserMiniProfile } from 'common/types/userTypes'

type Size = 'sm' | 'md' | 'lg'

interface UserMiniCardProps {
  user: UserMiniProfile
  size?: Size
}

export function UserMiniCard({ user, size = 'lg' }: UserMiniCardProps) {
  const { classes } = useStyles({ size })
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
      <Box component="aside" className={classes.labelContainer}>
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

const useStyles = makeStyles<{ size: Size }>()((theme, { size }) => {
  const cardSizes = {
    sm: 80,
    md: 100,
    lg: 135,
  }
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0.2em 0.1em',
      textAlign: 'center',
      fontFamily: 'Inter',
      width: '100%',
      fontSize: cardSizes[size],
      '@container (width < 130px)': {
        fontSize: cardSizes.md,
      },
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
        width: '7em',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
      '&:hover h4': {
        color: theme.palette.primary.main,
      },
      '& svg': {
        display: 'block',
      },
    },
    labelContainer: {
      paddingTop: '0.1em',
    },
    imageWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '1em',
      height: '1em',
      borderRadius: '50%',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',

      position: 'absolute',
      top: '1%',
      right: '-10%',
      width: '50%',
      height: '25%',
    },
    userName: {
      fontWeight: 500,
      color: theme.palette.common.black,
      fontSize: '0.12em',
      lineHeight: 1.5,
      transition: 'color 0.3s',
    },
    distanceContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '0.03em',
    },
    distance: {
      color: theme.palette.text.primary,
      fontSize: '0.09em',
      lineHeight: 1,
      fontWeight: 500,
      paddingLeft: '0.3em',
    },
  }
})
