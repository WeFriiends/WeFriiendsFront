import React from 'react'
import { Box, Typography, Button, Modal } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import createTheme from 'styles/createTheme'

interface DeletePhotoProps {
  setIsDeleteModalOpened: (isOpened: boolean) => void
  isOpened: boolean
  deleteChosenPic: () => void
}

const DeletePhotos: React.FC<DeletePhotoProps> = ({
  setIsDeleteModalOpened,
  isOpened,
  deleteChosenPic,
}) => {
  const { classes } = useStyles()

  const deleteModalClose = () => {
    setIsDeleteModalOpened(false)
  }

  const cancelHandler = () => {
    setIsDeleteModalOpened(false)
  }

  return (
    <Modal
      open={isOpened}
      className={classes.modalWrapper}
      onClose={deleteModalClose}
    >
      <Box className={classes.deleteWrapper}>
        <Box className={classes.box}>
          <img
            src={'/img/x-square.png'}
            alt="close photo"
            className={classes.closeIcon}
            onClick={deleteModalClose}
          />
        </Box>
        <Typography className={classes.title}>Delete file?</Typography>
        <Box className={classes.buttonsWrapper}>
          <Button className={classes.button} onClick={cancelHandler}>
            Cancel
          </Button>
          <Button
            className={`${classes.button} ${classes.buttonDelete}`}
            onClick={deleteChosenPic}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default DeletePhotos

const useStyles = makeStyles()(() => ({
  modalWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },
  title: {
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: 24,
    lineHeight: '83%',
    textAlign: 'center',
    color: createTheme.palette.primary.main,
  },
  deleteWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 240,
    width: 370,
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'relative',
  },
  button: {
    border: '2px solid #f46b5d',
    borderRadius: 10,
    padding: '16px 47px',
    width: 142,
    height: 50,
    textTransform: 'none',
  },
  buttonDelete: {
    color: '#fff',
    background: createTheme.palette.primary.light,
    border: 'none',
    '&:hover': {
      background: createTheme.palette.primary.dark,
    },
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 15,
  },
  box: {
    position: 'absolute',
    top: '13px',
    right: '13px',
  },
  closeIcon: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))
