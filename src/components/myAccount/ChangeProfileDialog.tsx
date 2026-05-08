import { useState, forwardRef, Ref, useImperativeHandle } from 'react'
import { CommonModal } from 'common/components/CommonModal'
import { Box, Typography } from '@mui/material'
import Status from 'components/firstProfile/Status'
import { makeStyles } from 'tss-react/mui'
import { useAuthStore, useProfileStore } from 'zustand/store'
import Interests from 'components/firstProfile/interests/Interests'
import PrimaryButton from 'common/components/PrimaryButton'
import theme from 'styles/createTheme'
import UploadPhotos from 'components/firstProfile/uploadPhotos/UploadPhotos'

interface ChangeProfileDialogProps {
  ref: Ref<{ handleOpenChangeProfileDialog: () => void }>
}

const ChangeProfileDialog = forwardRef(
  (props: ChangeProfileDialogProps, ref) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const { classes } = useStyles()
    const { uploadNewPhotos, getProfile } = useProfileStore()
    const { token } = useAuthStore()

    const handleOpenChangeProfileDialog = () => {
      setIsModalVisible(true)
    }

    const handleClose = () => {
      setIsModalVisible(false)
    }

    useImperativeHandle(ref, () => ({
      handleOpenChangeProfileDialog,
    }))

    const handleSaveClick = async () => {
      setIsSaving(true)
      try {
        await uploadNewPhotos(token!)
        await getProfile(token!)
        handleClose()
      } catch (error) {
        console.error('Photo update error:', error)
      } finally {
        setIsSaving(false)
      }
    }

    return (
      <CommonModal
        isOpened={isModalVisible}
        modalTitle={'Edit Profile'}
        modalDescription={'Update your profile photos and preferences.'}
        onClose={handleClose}
        width={600}
      >
        <UploadPhotos />
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
          <PrimaryButton
            label={isSaving ? 'Saving...' : 'Save'}
            onClickHandler={handleSaveClick}
          />
        </Box>
      </CommonModal>
    )
  }
)

export default ChangeProfileDialog

const useStyles = makeStyles()({
  titleContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: '100%',
    width: '100%',
    height: '42px',
    borderRadius: '20px',
    backgroundColor: theme.customPalette.colorPeach,
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
})
