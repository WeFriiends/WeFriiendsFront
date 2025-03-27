import * as React from 'react'
import { useRef } from 'react'
import { Box, Typography } from '@mui/material'
import theme from '../../styles/createTheme'
import { makeStyles } from 'tss-react/mui'
import PhotoCarousel from '../userProfile/PhotoCarousel'
import PrimaryButton from '../../common/components/PrimaryButton'
import ChangeProfileDialog from './ChangeProfileDialog'

const MyProfile: React.FC = () => {
  const { classes } = useStyles()
  const changeProfileDialogRef = useRef<{
    handleOpenChangeProfileDialog: () => void
  }>(null)

  const userPhoto = [
    { src: '/img/photo_Elena_2.jpg' },
    { src: '/img/photo_Elena.jpg' },
    { src: '/img/photo_Elena_3.jpg' },
  ]

  const handleOpenChangeProfileDialog = () => {
    changeProfileDialogRef.current?.handleOpenChangeProfileDialog()
  }

  return (
    <>
      <Typography variant="h1" className={classes.title}>
        My profile
      </Typography>
      <PhotoCarousel className={classes.carouselWrapper} items={userPhoto} />
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
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  carouselWrapper: {
    paddingTop: 30,
    '&>div>div>div>div': {
      transform: 'none !important',
    },
  },
})
