import { useState, useRef, useEffect } from 'react'
import { Box, Modal, Icon, IconButton, Typography, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

interface InviteFriendModalProps {
  isOpened: boolean
  onClose: () => void
}

const INVITE_URL = 'https://wefriiends.com'

export const InviteFriendModal = ({
  isOpened,
  onClose,
}: InviteFriendModalProps) => {
  const { classes } = useStyles()
  const [isCopied, setIsCopied] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(INVITE_URL)
      setIsCopied(true)

      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setIsCopied(false)
        timerRef.current = null
      }, 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
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
          <Typography variant="h2" className={classes.title}>
            Invite
          </Typography>

          <Typography variant="body2" className={classes.subtitle}>
            Feel free to invite someone, who can be interested in finding
            friends
          </Typography>

          <Box className={classes.linkContainer}>
            <Typography variant="body2" className={classes.linkUrl}>
              {INVITE_URL}
            </Typography>
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
  )
}

const useStyles = makeStyles()((theme) => ({
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
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    marginBottom: 24,
    color: theme.palette.text.secondary,
  },
  linkContainer: {
    width: '100%',
    backgroundColor: theme.palette.action.hover,
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
    fontSize: 14,
    fontWeight: 400,
    transition: 'background-color .3s',
    height: 50,
    minWidth: 100,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    '&:active': {
      transform: 'scale(0.98)',
    },
  },
}))
