import React, { useState, forwardRef, Ref, useImperativeHandle } from 'react'
import { CommonModal } from 'common/components/CommonModal'
// import { UserPicsType } from 'types/FirstProfile'
import { Box, Typography } from '@mui/material'
import PrimaryButton from '../../common/components/PrimaryButton'
import Status from 'components/firstProfile/Status'
import Interests from '../firstProfile/interests/Interests'
import UploadPhotos from 'components/firstProfile/uploadPhotos/UploadPhotos'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'

interface ChangeProfileDialogProps {
  ref: Ref<{ handleOpenChangeProfileDialog: () => void }>
}

const ChangeProfileDialog = forwardRef(
  (props: ChangeProfileDialogProps, ref) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const { classes } = useStyles()
    //const [, setPhotos] = useState<UserPicsType[]>([])

    const handleOpenChangeProfileDialog = () => {
      setIsModalVisible(true)
    }

    const handleClose = () => {
      setIsModalVisible(false)
    }

    useImperativeHandle(ref, () => ({
      handleOpenChangeProfileDialog,
    }))

    // const handlePicChange = (photos: UserPicsType[]) => {
    //   setPhotos(photos)
    // }

    const handleSaveClick = () => {
      console.error('save')
    }

    return (
      <CommonModal
        isOpened={isModalVisible}
        modalTitle={'Delete User'}
        modalDescription={'Confirm to delete user.'}
        onClose={handleClose}
        width={600}
      >
        {/* <UploadPhotos onPicChange={handlePicChange} /> */}
        <Box>
          <Typography className={classes.title}>Photos</Typography>
          <UploadPhotos />
        </Box>
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
      </CommonModal>
    )
  }
)

export default ChangeProfileDialog

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
  },
  carouselWrapper: {
    paddingTop: 30,
    '&>div>div>div>div': {
      transform: 'none !important',
    },
  },
})
