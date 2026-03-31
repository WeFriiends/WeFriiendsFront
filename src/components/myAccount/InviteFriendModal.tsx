import React, { useState } from 'react'
import { Box, Modal, Icon, IconButton, Typography, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'

interface InviteFriendModalProps {
  isOpened: boolean
  onClose: () => void
}

const INVITE_URL = 'https://wefriiends.com/invite'
const TOAST_DURATION = 2000

const fallbackCopyToClipboard = (text: string) => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

export const InviteFriendModal = ({
  isOpened,
  onClose,
}: InviteFriendModalProps) => {
  const { classes } = useStyles()
  const [showToast, setShowToast] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyLink = async () => {
    const copySuccess = () => {
      setIsCopied(true)
      setShowToast(true)
      setTimeout(() => {
        setIsCopied(false)
        setShowToast(false)
      }, TOAST_DURATION)
    }

    try {
      await navigator.clipboard.writeText(INVITE_URL)
      copySuccess()
    } catch (err) {
      fallbackCopyToClipboard(INVITE_URL)
      copySuccess()
    }
  }

  return (
    <>
      <Modal
        className={classes.modal}
        open={isOpened}
        onClose={onClose}
        aria-labelledby="invite-friend-modal"
      >
        <Box className={classes.modalContainer}>
          <IconButton
            disableRipple
            disableFocusRipple
            aria-label="close modal"
            className={classes.closeButton}
            onClick={onClose}
          >
            <Icon>
              <img src="/img/icon-close-modal.svg" alt="Close" />
            </Icon>
          </IconButton>

          <Box className={classes.content}>
            <Typography className={classes.title}>Invite</Typography>

            <Typography className={classes.subtitle}>
              Feel free to invite someone, who can be interested in finding
              friends
            </Typography>

            <Box className={classes.linkContainer}>
              <Typography className={classes.linkUrl}>{INVITE_URL}</Typography>
              <Button
                onClick={handleCopyLink}
                className={classes.copyButton}
                disableFocusRipple
                disableRipple
                disableElevation
              >
                {isCopied ? 'Copied!' : 'Copy link'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {showToast && (
        <Box className={classes.toast}>✓ Link copied to clipboard!</Box>
      )}
    </>
  )
}

const useStyles = makeStyles()(() => ({
  modal: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& :focus': {
      outline: 'none',
    },
  },
  modalContainer: {
    position: 'relative',
    maxWidth: '100vw',
    maxHeight: '100vh',
    width: 400,
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '75px 0 40px',
    boxSizing: 'border-box',
    color: theme.palette.text.primary,
    [theme.breakpoints.down(400)]: {
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
    },
  },
  closeButton: {
    height: 24,
    width: 24,
    padding: 0,
    position: 'absolute',
    transition: '0.3s',
    right: 15,
    top: 15,
    minWidth: 0,
    '&:hover': {
      transform: 'scale(105%)',
      cursor: 'pointer',
    },
  },
  content: {
    margin: '0 15px',
    padding: '0 5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.57,
    color: theme.palette.text.primary,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.57,
    color: theme.palette.text.secondary,
    marginBottom: 24,
  },
  linkContainer: {
    width: '100%',
    backgroundColor: '#f7fafc',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '12px',
    padding: '12px 16px',
    marginBottom: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
    [theme.breakpoints.down(400)]: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
  linkUrl: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: theme.palette.text.primary,
    wordBreak: 'break-all',
    flex: 1,
  },
  copyButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: '0 14px',
    boxShadow: '0 0 7px 1px rgba(179, 179, 179, 0.35)',
    textTransform: 'none',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.light,
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontWeight: 400,
    transition: 'background-color .3s',
    height: 40,
    minWidth: 100,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    '&:active': {
      transform: 'scale(0.98)',
    },
  },
  toast: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, calc(-50% - 120px))',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    zIndex: 9999,
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    animation: '$fadeInOut 2s ease-in-out',
    pointerEvents: 'none',

    [theme.breakpoints.down(400)]: {
      top: '25px',
      bottom: 'auto',
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: 12,
      padding: '10px 20px',
      whiteSpace: 'nowrap',
      animation: '$fadeInOutMobile 2s ease-in-out',
    },
  },
  '@keyframes fadeInOut': {
    '0%': {
      opacity: 0,
      transform: 'translate(-50%, calc(-50% - 120px)) scale(0.9)',
    },
    '15%': {
      opacity: 1,
      transform: 'translate(-50%, calc(-50% - 120px)) scale(1)',
    },
    '85%': {
      opacity: 1,
      transform: 'translate(-50%, calc(-50% - 120px)) scale(1)',
    },
    '100%': {
      opacity: 0,
      transform: 'translate(-50%, calc(-50% - 120px)) scale(0.9)',
    },
  },
  '@keyframes fadeInOutMobile': {
    '0%': {
      opacity: 0,
      transform: 'translateX(-50%) translateY(-20px)',
    },
    '15%': {
      opacity: 1,
      transform: 'translateX(-50%) translateY(0)',
    },
    '85%': {
      opacity: 1,
      transform: 'translateX(-50%) translateY(0)',
    },
    '100%': {
      opacity: 0,
      transform: 'translateX(-50%) translateY(-20px)',
    },
  },
}))
