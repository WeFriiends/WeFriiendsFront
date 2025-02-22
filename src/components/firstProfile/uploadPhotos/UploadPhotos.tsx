import { useState } from 'react'
import { Box, Typography, FormHelperText } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import UploadSlot from './UploadSlot'
import { PhotoModal } from './PhotoModal'
import DeletePhoto from './DeletePhoto'
import createTheme from 'styles/createTheme'
import { UserPicsType } from 'types/FirstProfile'
import { useProfileStore } from 'zustand/store'

interface UploadPhotosProps {
  isPhotoSubmitted?: boolean
  setIsPhotoSubmitted?: (value: boolean) => void
  isSubmitClicked?: boolean
  setIsSubmitClicked?: (value: boolean) => void
  onPicChange: (array: UserPicsType[]) => void
}

const UploadPhotos = ({
  isPhotoSubmitted,
  setIsPhotoSubmitted,
  isSubmitClicked,
  setIsSubmitClicked,
  onPicChange,
}: UploadPhotosProps) => {
  const { removePhoto } = useProfileStore()
  const { classes } = useStyles()
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false)
  const [isPhotoModalOpened, setIsPhotoModalOpened] = useState<boolean>(false)
  const [chosenId, setChosenId] = useState<string>('')
  const [chosenUrl, setChosenUrl] = useState<string>('')
  const [isPicHuge, setIsPicHuge] = useState<boolean>(false)

  const handlePicChange = (photos: UserPicsType[]) => {
    onPicChange(photos.map((pic) => ({ ...pic, url: pic.url ?? '' })))
  }

  const initialPics: UserPicsType[] = Array.from({ length: 6 }, (_, index) => ({
    id: `userPic-${index}`,
    url: '',
    blobFile: null,
  }))

  const [userPics, setUserPics] = useState<UserPicsType[]>(initialPics)

  const shiftPics = (array: UserPicsType[]) => {
    const picturesWithUrl = array.filter((pic) => pic.url !== null)
    const picturesWithoutUrl = array.filter((pic) => pic.url === null)
    setUserPics([...picturesWithUrl, ...picturesWithoutUrl])
    setIsPhotoSubmitted && setIsPhotoSubmitted(Boolean(picturesWithUrl?.length))
    handlePicChange([...picturesWithUrl, ...picturesWithoutUrl])
  }

  const deleteChosenPic = () => {
    const updatedPicArray: UserPicsType[] = userPics.map((pic) => {
      if (pic.id === chosenId) {
        return { ...pic, url: '' }
      } else return pic
    })
    setUserPics(updatedPicArray)
    setIsDeleteModalOpened(false)
    shiftPics(updatedPicArray)
    removePhoto(chosenId)
  }

  return (
    <Box className={classes.mainBox}>
      {!isPhotoSubmitted && (
        <Box className={classes.hintContainer}>
          <Typography
            className={isSubmitClicked ? classes.errorTitle : classes.title}
          >
            Upload at least 1 photo
          </Typography>
          <Typography className={classes.hint}>
            Your first uploaded photo will be used as your avatar
          </Typography>
        </Box>
      )}
      <FormHelperText
        className={isPicHuge ? classes.errorMsg : classes.hintMsg}
      >
        {`Please note: you can't upload photo more than 5 MB`}
      </FormHelperText>
      <PhotoModal
        setIsPhotoModalOpened={setIsPhotoModalOpened}
        isOpened={isPhotoModalOpened}
        url={chosenUrl}
      />
      <DeletePhoto
        isOpened={isDeleteModalOpened}
        setIsDeleteModalOpened={setIsDeleteModalOpened}
        deleteChosenPic={deleteChosenPic}
        setChosenId={setChosenId}
      />
      <Box className={classes.picContainer}>
        {userPics.map((pic) => (
          <UploadSlot
            key={pic.id}
            id={pic.id}
            bgPic={pic.url}
            userPics={userPics}
            setIsDeleteModalOpened={setIsDeleteModalOpened}
            setChosenId={setChosenId}
            setIsPhotoModalOpened={setIsPhotoModalOpened}
            setChosenUrl={setChosenUrl}
            shiftPics={shiftPics}
            setIsPicHuge={setIsPicHuge}
            setIsSubmitClicked={setIsSubmitClicked}
          />
        ))}
      </Box>
    </Box>
  )
}

export default UploadPhotos

const useStyles = makeStyles()(() => ({
  mainBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 50,
  },
  picContainer: {
    width: '95vw',
    maxWidth: 349,
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
    margin: 20,
  },
  hintContainer: {
    height: 43,
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '132%',
    textAlign: 'center',
    color: createTheme.palette.text.primary,
  },
  hint: {
    textAlign: 'center',
    color: createTheme.palette.text.primary,
    fontWeight: 400,
    fontSize: 13,
  },
  hintMsg: {
    fontWeight: 400,
    fontSize: 13,
    lineHeight: '150%',
  },
  errorMsg: {
    fontWeight: 400,
    fontSize: 13,
    lineHeight: '150%',
    textAlign: 'center',
    color: createTheme.palette.primary.dark,
  },
  errorTitle: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '132%',
    textAlign: 'center',
    color: createTheme.palette.primary.dark,
  },
}))
