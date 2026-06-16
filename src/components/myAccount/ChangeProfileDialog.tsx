import { useState, forwardRef, Ref, useImperativeHandle } from 'react'
import { CommonModal } from 'common/components/CommonModal'
import { Box, Typography } from '@mui/material'
import Status from 'components/firstProfile/Status'
import { PROFILE_EDIT_STORAGE_KEYS } from 'components/firstProfile/storageKeys'
import { clearSessionStorage } from 'utils/sessionStorage'
import { makeStyles } from 'tss-react/mui'
import { useAuthStore, useProfileStore } from 'zustand/store'
import Interests from 'components/firstProfile/interests/Interests'
import type { SavedPreferences } from 'types/FirstProfile'
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
    const { uploadNewPhotos, getProfile, data } = useProfileStore()
    const { token } = useAuthStore()

    const prefs = data?.preferences
    const initialPreferences: SavedPreferences | undefined = prefs
      ? {
          aboutMe: prefs.aboutMe ?? '',
          selectedLanguages: prefs.selectedLanguages ?? [],
          smoking: prefs.smoking ?? [],
          educationalLevel: prefs.educationalLevel ?? [],
          children: prefs.children ?? [],
          drinking: prefs.drinking ?? [],
          pets: prefs.pets ?? [],
          interests: prefs.interests ?? [],
        }
      : undefined

    const handleOpenChangeProfileDialog = () => {
      setIsModalVisible(true)
    }

    const handleClose = () => {
      clearSessionStorage(Object.values(PROFILE_EDIT_STORAGE_KEYS))
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
        ariaLabel="Edit Profile"
        onClose={handleClose}
        width={600}
        height={655}
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
          storageKey={PROFILE_EDIT_STORAGE_KEYS.selectedStatuses}
          initialStatuses={data?.reasons}
        />
        <Box className={classes.interests}>
          <Interests
            isAboutMeShown={true}
            storageKey={PROFILE_EDIT_STORAGE_KEYS.userPreferences}
            initialPreferences={initialPreferences}
          />
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
