import React, { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useProfileStore } from 'zustand/store'
import { UserPicsType } from 'types/FirstProfile'

interface SlotProps {
  id: string
  bgPic: string | null
  openDeleteModal: (slotId: string) => void
  openPreviewModal: (url: string) => void
  setIsPicHuge?: (flag: boolean) => void
  resetSubmitClicked?: () => void
  iconSlot?: React.ReactNode
  disabled?: boolean
}

const UploadSlot: React.FC<SlotProps> = ({
  id,
  bgPic,
  openDeleteModal,
  openPreviewModal,
  setIsPicHuge,
  resetSubmitClicked,
  iconSlot,
  disabled,
}) => {
  const { classes, cx } = useStyles()
  const { addTempPhoto } = useProfileStore()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    return () => {
      if (bgPic?.startsWith('blob:')) URL.revokeObjectURL(bgPic)
    }
  }, [bgPic])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const MAX = 5 * 1024 * 1024
    if (file.size > MAX) {
      setIsPicHuge?.(true)
      return
    }
    setIsPicHuge?.(false)

    const url = URL.createObjectURL(file)
    const generatedId = () =>
      Date.now().toString() + Math.random().toString(36).slice(2, 7)

    const temp: UserPicsType = {
      id: generatedId(),
      url,
      blobFile: file,
      fileName: file.name,
    }
    addTempPhoto(temp)

    resetSubmitClicked?.()
    e.target.value = ''
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

      {bgPic && (
        <img
          src="/img/add-icon.svg"
          alt="remove"
          className={classes.closeIcon}
          onClick={handleDeleteClick}
        />
      )}

      {!disabled && (
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg"
          className={classes.hiddenInput}
          onChange={handleChange}
        />
      )}
    </Box>
  )
}

export default UploadSlot

const useStyles = makeStyles()(() => ({
  slot: {
    borderRadius: 10,
    display: 'flex',
    width: 103,
    height: 140,
    backgroundColor: '#fff1ec',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    transition: 'background-color .3s ease',
    '&:hover': { backgroundColor: '#ffe5d1', cursor: 'pointer' },
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
  closeIcon: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    transform: 'rotate(45deg)',
  },
}))
