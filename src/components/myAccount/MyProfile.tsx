import React, { useEffect, useState, useRef } from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import theme from '../../styles/createTheme'
import { makeStyles } from 'tss-react/mui'
import PhotoCarousel from '../userProfile/PhotoCarousel'
import PrimaryButton from '../../common/components/PrimaryButton'
import ChangeProfileDialog from './ChangeProfileDialog'
import { useProfileStore } from '../../zustand/store'
import { getAge } from '../../utils/getAge'

const MyProfile: React.FC = () => {
  const { classes } = useStyles()
  const changeProfileDialogRef = useRef<{
    handleOpenChangeProfileDialog: () => void
  }>(null)
  const { data: profile, loading } = useProfileStore()

  const defaultPhotos = [
    { src: '/img/placeholders/girl_big.svg' },
    { src: '/img/placeholders/girl_big.svg' },
    { src: '/img/placeholders/girl_big.svg' },
  ]

  const [userPhotos, setUserPhotos] = useState(defaultPhotos)

  useEffect(() => {
    if (profile?.photos?.length) {
      setUserPhotos(
        profile.photos.map((photo) => ({ src: photo as unknown as string }))
      )
    }
  }, [profile?.photos])

  const handleOpenChangeProfileDialog = () => {
    changeProfileDialogRef.current?.handleOpenChangeProfileDialog()
  }

  return (
    <>
      <Box className={classes.myProfileWrapperMobile}>
        <Box className={classes.person}>
          <Avatar
            className={classes.avatar}
            src={
              profile?.photos &&
              profile.photos.length > 0 &&
              typeof profile.photos[0] === 'string'
                ? profile.photos[0]
                : '/img/placeholders/girl_big.svg'
            }
          />
          <Typography variant="h1" className={classes.name}>
            {loading ? 'Loading...' : profile?.name},{' '}
            {loading
              ? '...'
              : profile?.dateOfBirth
              ? getAge(profile.dateOfBirth)
              : '...'}
          </Typography>
        </Box>
        <PrimaryButton
          className={classes.changeProfileButton}
          label="Change profile"
          onClickHandler={handleOpenChangeProfileDialog}
        />
      </Box>
      <Typography variant="h1" className={classes.title}>
        My profile
      </Typography>
      <PhotoCarousel className={classes.carouselWrapper} items={userPhotos} />
      <Box className={classes.buttonContainer}>
        <PrimaryButton
          label="Change profile"
          onClickHandler={handleOpenChangeProfileDialog}
        />
      </Box>
      <ChangeProfileDialog ref={changeProfileDialogRef} />
    </>
  )
}
export default MyProfile

const useStyles = makeStyles()({
  title: {
    paddingTop: 60,
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 600,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: 0,
      paddingBottom: 20,
      textAlign: 'left',
      fontSize: 24,
      fontWeight: 500,
    },
  },
  titleContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: '100%',
    width: '100%',
    height: '42px',
    borderRadius: '20px',
    backgroundColor: '#FEDED2',
    marginTop: '50px',
    marginBottom: '15px',
  },
  titleStatus: {
    position: 'absolute',
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: '18px',
    alignItems: 'center',
    top: '20%',
    color: theme.palette.text.primary,
  },
  interests: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: 60,
  },
  buttonContainer: {
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  carouselWrapper: {
    paddingTop: 30,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    '&>div>div>div>div': {
      transform: 'none !important',
    },
  },
  changeProfileButton: {
    height: 50,
    lineHeight: '46px',
    margin: 0,
    display: 'block',
    width: '100%',
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      height: 60,
      lineHeight: '60px',
      margin: '50px 0 30px',
    },
  },
  myProfileWrapperMobile: {
    padding: '24px 40px',
    margin: '30px 0 10px',
    boxShadow: '0px 0px 7px 1px rgba(217, 217, 217, 0.5)',
    borderRadius: 8,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  person: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    marginBottom: 25,
    gap: 20,
  },
  avatar: {
    height: 55,
    width: 55,
    border: '3px solid #FEDED2',
    borderRadius: '50%',
  },
  name: {
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '38px',
    wordBreak: 'break-word',
  },
})
