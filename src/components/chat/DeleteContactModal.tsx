import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { CommonModal } from 'common/components/CommonModal'
import theme from '../../styles/createTheme'

interface DeleteContactModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const DeleteContactModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteContactModalProps) => {
  const { classes } = useStyles()

  return (
    <CommonModal
      isOpened={isOpen}
      onClose={onClose}
      modalTitle=""
      modalDescription=""
      height={320}
    >
      <Box className={classes.modalContainer}>
        <img
          src="/img/report/icon-alert.svg"
          alt="Alert circle"
          className={classes.imgAlert}
        />
        <Box className={classes.info}>
          <Typography variant="h1" className={classes.title}>
            Delete User
          </Typography>
        </Box>
        <Box className={classes.buttonsContainer}>
          <Button
            className={`${classes.button} ${classes.cancelButton}`}
            onClick={onClose}
            disableFocusRipple
            disableRipple
          >
            Cancel
          </Button>
          <Button
            className={`${classes.button} ${classes.deleteButton}`}
            onClick={onConfirm}
            disableFocusRipple
            disableRipple
          >
            Delete
          </Button>
        </Box>
      </Box>
    </CommonModal>
  )
}

const useStyles = makeStyles()({
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    gap: '32px',
    boxSizing: 'border-box',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '32px',
    textAlign: 'center',
    color: theme.palette.text.primary,
    margin: 0,
  },
  buttonsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
  },
  button: {
    height: '48px',
    minWidth: '120px',
    borderRadius: '8px',
    fontSize: '16px',
    textTransform: 'none',
    fontWeight: 500,
  },
  cancelButton: {
    color: theme.palette.primary.dark,
    fontWeight: 600,
    textDecoration: 'none',
    border: `1px solid ${theme.palette.primary.dark}`,
    boxShadow: '0 0 7px 1px rgba(179, 179, 179, 0.14)',
    '&:hover': {
      background: theme.palette.common.white,
      borderColor: theme.palette.primary.main,
    },
  },
  deleteButton: {
    fontWeight: 700,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.light,
    textDecoration: 'none',
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
  imgAlert: {
    margin: '0 auto',
    width: '31px',
    height: '31px',
    objectFit: 'contain',
  },
})
