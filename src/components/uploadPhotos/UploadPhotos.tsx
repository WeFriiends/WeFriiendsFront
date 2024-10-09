import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Logo from '../logo/Logo'
import { makeStyles } from 'tss-react/mui'
import UploadSlot from './UploadSlot'
import DeleteModal from './DeleteModal'
import ArrowBackButton from 'common/components/ArrowBackButton'
import PrimaryButton from 'common/components/PrimaryButton'
import { PhotoModal } from './PhotoModal'

const UploadPhotos = () => {
  const { classes } = useStyles()
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false)
  const [isPhotoModalOpened, setIsPhotoModalOpened] = useState<boolean>(false)
  const [chosenId, setChosenId] = useState<string>('')
  const [chosenUrl, setChosenUrl] = useState<string>('')

  interface UserPicsType {
    id: string
    url: string | null
  }

  const storedPicsString = localStorage.getItem('userPicsStorage')
  const emptyPicArray: UserPicsType[] = Array.from(
    { length: 6 },
    (_, index) => ({
      id: `userPic-${index}`,
      url: null,
    })
  )

  const initialPics = storedPicsString
    ? JSON.parse(storedPicsString)
    : emptyPicArray

  const [userPics, setUserPics] = useState<UserPicsType[]>(initialPics)

  const stepForwardHandler = () => {
    console.log('step forward function/send pics array to backend')
  }

  const deleteChosenPic = () => {
    const updatedPicArray: UserPicsType[] = userPics.map((pic) => {
      if (pic.id === chosenId) {
        return { ...pic, url: null }
      } else return pic
    })
    setUserPics(updatedPicArray)
    setIsDeleteModalOpened(false)
    localStorage.setItem('userPicsStorage', JSON.stringify(updatedPicArray))
  }

  const hasAnyPics = (array: UserPicsType[]): boolean => {
    return array.some((pic) => pic.url !== null && pic.url.trim() !== '')
  }

  return (
    <Box className={classes.mainBox}>
      {!hasAnyPics(userPics) && (
        <Typography className={classes.title}>
          Upload at least 1 photo
        </Typography>
      )}
      <PhotoModal
        setIsPhotoModalOpened={setIsPhotoModalOpened}
        isOpened={isPhotoModalOpened}
        url={chosenUrl}
      />
      <DeleteModal
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
            setUserPics={setUserPics}
            setIsDeleteModalOpened={setIsDeleteModalOpened}
            setChosenId={setChosenId}
            setIsPhotoModalOpened={setIsPhotoModalOpened}
            setChosenUrl={setChosenUrl}
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
    width: 349,
    height: 300,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
    margin: 20,
  },
  title: {
    marginTop: 54,
    marginBottom: 29,
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '132%',
    textAlign: 'center',
    color: '#444',
  },
}))
