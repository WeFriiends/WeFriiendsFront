import React, { useRef } from 'react'
import { Box, IconButton } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useProfileStore } from 'zustand/store'
import { UserPicsType } from 'types/FirstProfile'
import { IconClose } from 'common/svg/IconClose'
import { IconEdit } from 'common/svg/IconEdit'
import { MAX_PHOTO_SIZE_BYTES } from 'data/constants'

interface SlotProps {
  id: string
  bgPic: string | null
  openDeleteModal: (slotId: string) => void
  openPreviewModal: (url: string) => void
  setIsPicHuge?: (flag: boolean) => void
  resetSubmitClicked?: () => void
  iconSlot?: React.ReactNode
  disabled?: boolean
  isAvatar?: boolean
  onMultipleFiles?: (photos: UserPicsType[]) => void
}

const generateId = () => crypto.randomUUID()

const isFileTooLarge = (file: File) => file.size > MAX_PHOTO_SIZE_BYTES

const wrapFile = (file: File): UserPicsType => ({
  id: generateId(),
  url: URL.createObjectURL(file),
  blobFile: file,
  fileName: file.name,
})

const UploadSlot: React.FC<SlotProps> = ({
  id,
  bgPic,
  openDeleteModal,
  openPreviewModal,
  setIsPicHuge,
  resetSubmitClicked,
  iconSlot,
  disabled,
  isAvatar,
  onMultipleFiles,
}) => {
  const { classes, cx } = useStyles()
  const { addTempPhoto, replaceTempPhoto } = useProfileStore()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return

    if (isAvatar) {
      const [file] = files
      if (isFileTooLarge(file)) {
        setIsPicHuge?.(true)
        return
      }
      setIsPicHuge?.(false)
      const photo = wrapFile(file)
      if (bgPic) {
        replaceTempPhoto(id, photo)
      } else {
        addTempPhoto(photo)
      }
      resetSubmitClicked?.()
    } else {
      const valid = files.reduce<UserPicsType[]>((acc, file) => {
        if (isFileTooLarge(file)) {
          setIsPicHuge?.(true)
          return acc
        }
        setIsPicHuge?.(false)
        acc.push(wrapFile(file))
        return acc
      }, [])
      if (valid.length) {
        onMultipleFiles?.(valid)
        resetSubmitClicked?.()
      }
    }

    e.target.value = ''
  }

  const handleEditAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    fileInputRef.current?.click()
  }

  const handleSlotClick = () => {
    if (disabled) return
    resetSubmitClicked?.()
    bgPic ? openPreviewModal(bgPic) : fileInputRef.current?.click()
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    openDeleteModal(id)
  }

  return (
    <Box
      className={cx(classes.slot, disabled && classes.slotDisabled)}
      style={{ backgroundImage: bgPic ? `url(${bgPic})` : undefined }}
      onClick={handleSlotClick}
    >
      {!bgPic && iconSlot && <Box className={classes.innerBox}>{iconSlot}</Box>}

      {bgPic && isAvatar && (
        <IconButton
          className={classes.actionIcon}
          onClick={handleEditAvatarClick}
          size="small"
        >
          <Box className={classes.editIconCircle}>
            <IconEdit />
          </Box>
        </IconButton>
      )}

      {bgPic && !isAvatar && (
        <IconButton
          className={classes.actionIcon}
          onClick={handleDeleteClick}
          size="small"
        >
          <Box className={classes.editIconCircle}>
            <IconClose />
          </Box>
        </IconButton>
      )}

      {!disabled && (
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg"
          multiple={!isAvatar}
          className={classes.hiddenInput}
          onClick={(e) => e.stopPropagation()}
          onChange={handleChange}
        />
      )}
    </Box>
  )
}

export default UploadSlot

const useStyles = makeStyles()((theme) => ({
  slot: {
    borderRadius: 10,
    display: 'flex',
    width: 103,
    height: 140,
    backgroundColor: theme.customPalette.authBtnBg,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    transition: 'background-color .3s ease',
    '&:hover': {
      backgroundColor: '#ffe5d1',
      cursor: 'pointer',
    },
  },
  slotDisabled: {
    backgroundColor: '#F0F0F0',
    '&:hover': { backgroundColor: '#F0F0F0', cursor: 'default' },
  },
  innerBox: {
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
  hiddenInput: { display: 'none' },
  actionIcon: {
    position: 'absolute',
    bottom: -10,
    right: -10,
  },
  editIconCircle: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': { backgroundColor: theme.palette.primary.dark },
  },
}))
