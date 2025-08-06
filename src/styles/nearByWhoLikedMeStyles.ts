import { makeStyles } from 'tss-react/mui'
import theme from '../styles/createTheme'

export const nearByWhoLikedMeStyles = makeStyles()(() => ({
  userImagesWrapper: {
    borderRadius: '50%',
    width: 81,
    height: 81,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
      width: 135,
      height: 135,
    },
  },
  userImages: {
    width: '100%',
  },
  imageList: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))!important',
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(5, 1fr) !important',
      maxWidth: '100vw',
    },
  },
  imageListItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto 30px',
    cursor: 'pointer',
    width: '100%',
    '& path': {
      // lightning icon color mobile
      fill: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      margin: '0 auto 45px',
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
  profileBoxPosition: {
    textAlign: 'center',
  },
  lightingIconPosition: {
    position: 'absolute',
    top: 10,
    right: 'calc(50% - 40px)',
    width: 18,
    height: 20,
    [theme.breakpoints.up('lg')]: {
      top: 3,
      right: 30,
      width: 30,
      height: 33,
    },
  },
  usernameStyling: {
    fontWeight: 500,
    color: theme.palette.common.black,
    fontSize: 12,
    lineHeight: '20px',
    padding: '5px 5px 0',
    transition: 'color 0.3s',
    '&:hover': {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 16,
      paddingTop: 15,
    },
  },
  distanceBoxPosition: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
  },
  locationTextStyle: {
    color: theme.palette.text.primary,
    fontSize: 12,
    lineHeight: '20px',
    fontWeight: '500',
    paddingLeft: 4,
  },
}))
