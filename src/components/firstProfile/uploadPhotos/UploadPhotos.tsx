import React, {useEffect, useMemo, useState} from 'react'
import {Box, Typography, FormHelperText} from '@mui/material'
import {makeStyles} from 'tss-react/mui'
import createTheme from 'styles/createTheme'
import {useAuthStore, useProfileStore} from 'zustand/store'
import UploadSlot from './UploadSlot'
import {PhotoModal} from './PhotoModal'
import DeletePhoto from './DeletePhoto'
import {UserPicsType} from 'types/FirstProfile'

interface Props {
    isSubmitClicked?: boolean
    resetSubmitClicked?: () => void
    setIsPicHuge?: (flag: boolean) => void
}

const UploadPhotos: React.FC<Props> = ({
                                           isSubmitClicked,
                                           resetSubmitClicked,
                                           setIsPicHuge,
                                       }) => {
    const {tempPhotos, setTempPhotos, data, deletePhoto} = useProfileStore()
    const {token} = useAuthStore()

    useEffect(() => {
        if (data?.photos?.length && tempPhotos.length === 0) {
            const restored: UserPicsType[] = data.photos.map((photo, i) => ({
                id: `url-${i}`,
                url: typeof photo === 'string' ? photo : (photo as { url?: string })?.url ?? null,
                blobFile: null,
            }))
            setTempPhotos(restored)
        }
    }, [data?.photos, tempPhotos.length, setTempPhotos])

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [deleteId, setDeleteId] = useState<string | null>(null)

    const slots = useMemo<UserPicsType[]>(() => {
        const count = tempPhotos.length
        const empties = Array.from({length: Math.max(0, 6 - count)}).map(
            (_, i) => ({
                id: `empty-${i}`,
                url: null,
                blobFile: null,
            })
        )
        return [...tempPhotos, ...empties]
    }, [tempPhotos])

    const {classes} = useStyles()

    return (
        <>
            {isSubmitClicked && tempPhotos.length === 0 && (
                <>
                    <Typography className={classes.errorTitle}>
                        Upload at least 1 photo
                    </Typography>
                    <Typography className={classes.hint}>
                        Your first uploaded photo will be used as your avatar
                    </Typography>
                </>
            )}

            <FormHelperText className={classes.hintMsg}>
                You can&apos;t upload photo larger than 5 MB
            </FormHelperText>

            {previewUrl && (
                <PhotoModal
                    isOpened
                    url={previewUrl}
                    setIsPhotoModalOpened={() => setPreviewUrl(null)}
                />
            )}

            {deleteId && (
                <DeletePhoto
                    isOpened
                    setIsDeleteModalOpened={() => setDeleteId(null)}
                    deleteChosenPic={() => {
                        deletePhoto(deleteId, token!)
                        setDeleteId(null)
                    }}
                    setChosenId={() => void 0}
                />
            )}

            <Box className={classes.picContainer}>
                {slots.map((p) => (
                    <UploadSlot
                        key={p.id}
                        id={p.id}
                        bgPic={p.url}
                        openPreviewModal={(url: string) => setPreviewUrl(url)}
                        openDeleteModal={(id: string) => setDeleteId(id)}
                        setIsPicHuge={setIsPicHuge}
                        resetSubmitClicked={resetSubmitClicked}
                    />
                ))}
            </Box>
        </>
    )
}

export default UploadPhotos

const useStyles = makeStyles()(() => ({
    picContainer: {
        maxWidth: 349,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 20,
        margin: '20px auto',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 600,
        fontSize: 18,
        textAlign: 'center',
        color: createTheme.palette.text.primary,
    },
    hint: {
        textAlign: 'center',
        fontSize: 13,
        color: createTheme.palette.text.primary,
    },
    hintMsg: {
        fontSize: 13,
        textAlign: 'center',
    },
    errorMsg: {
        fontSize: 13,
        textAlign: 'center',
        color: createTheme.palette.primary.dark,
    },
    errorTitle: {
        fontWeight: 600,
        fontSize: 18,
        textAlign: 'center',
        color: createTheme.palette.primary.dark,
    },
}))