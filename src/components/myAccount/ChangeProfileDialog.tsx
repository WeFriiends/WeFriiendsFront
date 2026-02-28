import React, {useState, forwardRef, Ref, useImperativeHandle} from 'react'
import {CommonModal} from 'common/components/CommonModal'
import {Box, Typography} from '@mui/material'
import Status from 'components/firstProfile/Status'
import {makeStyles} from 'tss-react/mui'
import {useAuthStore, useProfileStore} from 'zustand/store'
import Interests from 'components/firstProfile/interests/Interests'
import PrimaryButton from 'common/components/PrimaryButton'
import theme from 'styles/createTheme'
import UploadPhotos from 'components/firstProfile/uploadPhotos/UploadPhotos'
import axios from 'axios'

interface ChangeProfileDialogProps {
    ref: Ref<{ handleOpenChangeProfileDialog: () => void }>
}

const ChangeProfileDialog = forwardRef(
    (props: ChangeProfileDialogProps, ref) => {
        const [isModalVisible, setIsModalVisible] = useState(false)
        const [isPicHuge, setIsPicHuge] = useState(false)
        const [isSubmitClicked, setIsSubmitClicked] = useState(false)
        const [isSaving, setIsSaving] = useState(false)
        const {classes} = useStyles()
        const {tempPhotos} = useProfileStore()
        const {token} = useAuthStore()

        const handleOpenChangeProfileDialog = () => {
            setIsSubmitClicked(false)
            setIsPicHuge(false)
            setIsModalVisible(true)
        }

        const handleClose = () => {
            setIsModalVisible(false)
        }

        useImperativeHandle(ref, () => ({
            handleOpenChangeProfileDialog,
        }))

        const handleSaveClick = async () => {
            setIsSubmitClicked(true)
            if (tempPhotos.length === 0) return

            setIsSaving(true)
            try {
                const newPhotos = tempPhotos.filter((p) => p.blobFile)
                console.log('newPhotos:', newPhotos)
                console.log('tempPhotos:', tempPhotos)
                if (newPhotos.length > 0) {
                    const formData = new FormData()
                    newPhotos.forEach((p) => {
                        formData.append('images', p.blobFile!)
                    })

                    const {data: cloudinaryUrls} = await axios.post<string[]>(
                        `${process.env.REACT_APP_API_BASE_URL}/api/photos/upload`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    console.log('Cloudinary URLs:', cloudinaryUrls)
                    for (const photoUrl of cloudinaryUrls) {
                        await axios.post(
                            `${process.env.REACT_APP_API_BASE_URL}/api/photos`,
                            {photoUrl},
                            {
                                headers: {Authorization: `Bearer ${token}`},
                            }
                        )
                    }
                }

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
                {isPicHuge && (
                    <Typography className={classes.picError}>
                        Please note: you can&apos;t upload photo more than 5 MB
                    </Typography>
                )}
                <UploadPhotos
                    isSubmitClicked={isSubmitClicked}
                    resetSubmitClicked={() => setIsSubmitClicked(false)}
                    setIsPicHuge={setIsPicHuge}
                />
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
                    <Interests isAboutMeShown={true}/>
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
    picError: {
        fontFamily: 'Inter',
        fontSize: 13,
        textAlign: 'center',
        color: theme.palette.primary.dark,
        marginBottom: 4,
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
})