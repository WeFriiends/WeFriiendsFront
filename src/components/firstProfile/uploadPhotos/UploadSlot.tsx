import React, { useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import createTheme from 'styles/createTheme'
import { useProfileStore } from 'zustand/store'
import { UserPicsType } from 'types/FirstProfile'

interface SlotProps {
  id: string
  bgPic: string | null
  openDeleteModal: (slotId: string) => void
  openPreviewModal: (url: string) => void
  setIsPicHuge?: (flag: boolean) => void
  resetSubmitClicked?: () => void
}

const UploadSlot: React.FC<SlotProps> = ({
  id,
  bgPic,
  openDeleteModal,
  openPreviewModal,
  setIsPicHuge,
  resetSubmitClicked,
}) => {
  const { addTempPhoto, removeTempPhoto } = useProfileStore()

  const { classes } = useStyles()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

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
  }

  const handleSlotClick = () => {
    resetSubmitClicked?.()
    bgPic ? openPreviewModal(bgPic) : fileInputRef.current?.click()
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    removeTempPhoto(id)
    openDeleteModal(id)
  }

  return (
    <Box
      className={classes.slot}
      style={{ backgroundImage: bgPic ? `url(${bgPic})` : undefined }}
      onClick={handleSlotClick}
    >
      {!bgPic && (
        <Box className={classes.innerBox}>
          <img src="/img/add-icon.svg" alt="add" />
          <Typography className={classes.text}>Upload</Typography>
        </Box>
      )}

      {bgPic && (
        <img
          src="/img/add-icon.svg"
          alt="remove"
          className={classes.closeIcon}
          onClick={handleDeleteClick}
        />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg"
        className={classes.hiddenInput}
        onChange={handleChange}
      />
    </Box>
  )
}

export default UploadSlot

const useStyles = makeStyles()(() => ({
  slot: {
    borderRadius: 10,
    padding: '47px 29px',
    width: 103,
    height: 140,
    backgroundColor: '#fff1ec',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    transition: 'background-color .3s ease',
    '&:hover': { backgroundColor: '#ffe5d1', cursor: 'pointer' },
  },
  innerBox: {
    width: 44,
    height: 45,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontWeight: 700,
    fontSize: 12,
    lineHeight: '167%',
    color: createTheme.palette.primary.main,
    userSelect: 'none',
  },
  hiddenInput: { display: 'none' },
  closeIcon: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    transform: 'rotate(45deg)',
  },
}))

//!!! import React, { useRef } from 'react'
// import { Box, Typography } from '@mui/material'
// import { makeStyles } from 'tss-react/mui'
// import { UserPicsType } from '../../../types/FirstProfile'
// import createTheme from 'styles/createTheme'
// import { useProfileStore } from 'zustand/store'

// interface SlotType {
//   id: string
//   bgPic: string | null
//   userPics: UserPicsType[]
//   setIsDeleteModalOpened(isOpened: boolean): void
//   setChosenId: (chosenId: string) => void
//   setIsPhotoModalOpened: (isPhotoModalOpened: boolean) => void
//   setChosenUrl: (chosenUrl: string) => void
//   onFileSelected?: (fileUrl: string, file: File) => void
//   shiftPics: (array: UserPicsType[]) => void
//   setIsPicHuge(isPicTrue: boolean): void
//   setIsSubmitClicked?: (value: boolean) => void
// }

// const UploadSlot: React.FC<SlotType> = ({
//   id,
//   bgPic,
//   userPics,
//   setIsDeleteModalOpened,
//   setChosenId,
//   setIsPhotoModalOpened,
//   setChosenUrl,
//   onFileSelected,
//   shiftPics,
//   setIsPicHuge,
//   setIsSubmitClicked,
// }) => {
//   const { addTempPhoto, removeTempPhoto } = useProfileStore()
//   const { addPhoto } = useProfileStore()
//   const { classes } = useStyles()

//   const fileInputRef = useRef<HTMLInputElement | null>(null)

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0] as File | undefined

//     if (file) {
//       const fileUrl = URL.createObjectURL(file)

//       if (onFileSelected) {
//         onFileSelected(fileUrl, file)
//       }
//       const maxFileSize = 5 * 1024 * 1024
//       if (file.size >= maxFileSize) {
//         setIsPicHuge(true)
//         return
//       }

//       setIsPicHuge(false)
//       const reader = new FileReader()
//       reader.readAsArrayBuffer(file)

//       reader.onloadend = () => {
//         const arrayBuffer = reader.result as ArrayBuffer
//         const blob = new Blob([arrayBuffer], { type: file.type })

//         const newPic: UserPicsType = {
//           id: id,
//           url: URL.createObjectURL(blob),
//           blobFile: blob,
//         }
//         addPhoto(newPic)
//         const newUserPicsStorage = userPics.map((elem: UserPicsType) =>
//           elem.id === id ? newPic : elem
//         )

//         shiftPics(newUserPicsStorage)
//       }
//     }
//   }

//   const displayModalPic = () => {
//     setIsPhotoModalOpened(true)
//     setChosenUrl(bgPic!)
//   }

//   const initiateInputClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click()
//     }
//   }

//   const slotHandler = () => {
//     setIsSubmitClicked && setIsSubmitClicked(false)
//     bgPic ? displayModalPic() : initiateInputClick()
//   }

//   const handleDeletePic = (event: React.MouseEvent<HTMLElement>) => {
//     event.stopPropagation()
//     setChosenId(id)
//     setIsDeleteModalOpened(true)
//   }

//   return (
//     <Box
//       className={classes.slot}
//       style={{
//         backgroundImage: `url(${bgPic})`,
//       }}
//       onClick={slotHandler}
//     >
//       {!bgPic && (
//         <Box className={classes.innerBox}>
//           <img src={'/img/add-icon.svg'} alt="add photo" />
//           <Typography className={classes.text}>Upload</Typography>
//         </Box>
//       )}
//       {bgPic && (
//         <img
//           src={'/img/add-icon.svg'}
//           alt="add photo"
//           className={classes.closeIcon}
//           onClick={handleDeletePic}
//         />
//       )}
//       <input
//         className={classes.hiddenInput}
//         type="file"
//         accept=".png, .jpg, .jpeg"
//         ref={fileInputRef}
//         onChange={handleChange}
//       />
//     </Box>
//   )
// }

// export default UploadSlot

// const useStyles = makeStyles()(() => ({
//   slot: {
//     borderRadius: 10,
//     padding: '47px 29px',
//     width: 103,
//     height: 140,
//     backgroundColor: '#fff1ec',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     position: 'relative',
//     transition: 'background-color 0.3s ease',
//     '&:hover': {
//       backgroundColor: '#ffe5d1',
//       cursor: 'pointer',
//     },
//   },
//   innerBox: {
//     width: 44,
//     height: 45,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   text: {
//     fontWeight: 700,
//     fontSize: 12,
//     lineHeight: '167%',
//     color: createTheme.palette.primary.main,
//     userSelect: 'none',
//   },
//   hiddenInput: {
//     display: 'none',
//   },
//   closeIcon: {
//     position: 'absolute',
//     bottom: '-8px',
//     right: '-8px',
//     transform: 'rotate(45deg)',
//   },
// }))
