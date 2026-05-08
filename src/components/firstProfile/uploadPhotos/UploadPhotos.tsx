import { useMemo, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import createTheme from 'styles/createTheme'
import { useAuthStore, useProfileStore } from 'zustand/store'
import { MAX_PROFILE_PHOTOS } from 'data/constants'
import UploadSlot from './UploadSlot'
import { PhotoModal } from './PhotoModal'
import DeletePhoto from './DeletePhoto'
import { UserPicsType } from 'types/FirstProfile'
import { useRestorePhotos } from './useRestorePhotos'

const UploadPhotos = () => {
  const { classes, cx } = useStyles()
  const { tempPhotos, deletePhoto } = useProfileStore()
  const { token } = useAuthStore()

  useRestorePhotos()

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isPicHuge, setIsPicHuge] = useState(false)

  const slots = useMemo<UserPicsType[]>(() => {
    const count = tempPhotos.length
    const empties = Array.from({
      length: Math.max(0, MAX_PROFILE_PHOTOS - count),
    }).map((_, i) => ({
      id: `empty-${i}`,
      url: null,
      blobFile: null,
    }))
    return [...tempPhotos, ...empties]
  }, [tempPhotos])

  const hasAvatar = tempPhotos.length > 0

  return (
    <>
      {tempPhotos.length === 0 && (
        <>
          <Typography className={classes.title}>
            Upload at least 1 photo
          </Typography>
          <Typography className={classes.hint}>
            Your first uploaded photo will be used as your avatar
          </Typography>
        </>
      )}

      <Typography
        className={cx(classes.hintMsg, isPicHuge && classes.errorMsg)}
      >
        Please note: you can&apos;t upload photo more than 5 MB
      </Typography>

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
            if (!token) return
            deletePhoto(deleteId, token)
            setDeleteId(null)
          }}
        />
      )}

      <Box className={classes.picContainer}>
        {slots.map((p, index) => (
          <UploadSlot
            key={p.id}
            id={p.id}
            bgPic={p.url}
            openPreviewModal={(url: string) => setPreviewUrl(url)}
            openDeleteModal={(id: string) => setDeleteId(id)}
            setIsPicHuge={setIsPicHuge}
            disabled={index > 0 && !hasAvatar}
            isAvatar={index === 0}
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
    fontSize: 15,
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
    color: createTheme.palette.secondary.main,
    textAlign: 'center',
  },
  errorMsg: {
    color: createTheme.palette.primary.dark,
  },
}))
