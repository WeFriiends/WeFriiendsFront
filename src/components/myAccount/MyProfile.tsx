import * as React from 'react'
import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import theme from '../../styles/createTheme'
import { makeStyles } from 'tss-react/mui'
import PhotoCarousel from '../userProfile/PhotoCarousel'
import UploadPhotos from '../firstProfile/uploadPhotos/UploadPhotos'
import Status from 'components/firstProfile/Status'
import Interests from '../firstProfile/interests/Interests'
import PrimaryButton from '../../common/components/PrimaryButton'

const MyProfile: React.FC = () => {
  const { classes } = useStyles()
  const userPhoto = [
    { src: '/img/photo_Elena_2.jpg' },
    { src: '/img/photo_Elena.jpg' },
    { src: '/img/photo_Elena_3.jpg' },
  ]
  const [isEditing, setIsEditing] = React.useState(false)
  const handleEditClick = () => {
    setIsEditing(true)
  }
  const handleSaveClick = () => {
    setIsEditing(false)
  }

  interface UserPicsType {
    id: string
    url: string | null
  }

  const [, setPhotos] = useState<UserPicsType[]>([])
  const handlePicChange = (photos: UserPicsType[]) => {
    setPhotos(photos)
  }
  return (
    <>
      <Typography variant="h1" className={classes.title}>
        My profile
      </Typography>
      <PhotoCarousel items={userPhoto} />
      {isEditing ? (
        <>
          <UploadPhotos onPicChange={handlePicChange} />
          <Box className={classes.titleContainer}>
            <Typography className={classes.titleStatus}>
              I&apos;m Here For
            </Typography>
          </Box>
          <Status
            isTitleShown={false}
            isFormHelperTextShown={true}
            formHelperText=" Please, choose 3 statuses maximum"
          />
          <Box className={classes.interests}>
            <Interests isAboutMeShown={true} />
          </Box>
          <Box className={classes.buttonContainer}>
            <PrimaryButton label="Save" onClickHandler={handleSaveClick} />
          </Box>
        </>
      ) : (
        <Box className={classes.buttonContainer}>
          <PrimaryButton
            label="Change Profile"
            onClickHandler={handleEditClick}
          />
        </Box>
      )}
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
})
