import React from 'react'
import { makeStyles } from 'tss-react/mui'
import { Button, Menu, MenuItem } from '@mui/material'
import { useMatchesStore } from 'zustand/friendsStore'
import { useAuth0 } from '@auth0/auth0-react'
import { useChatStore } from 'zustand/chatStore'
import { useSnackbarStore } from 'zustand/snackbarStore'
import { DeleteContactModal } from './DeleteContactModal'
import { ReportDialog } from 'components/report/ReportDialog'

interface ChatMenuProps {
  id: string
}

export const ChatMenu = ({ id }: ChatMenuProps) => {
  const { classes } = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const open = Boolean(anchorEl)

  const reportDialogRef = React.useRef<{ handleOpenReportDialog: () => void }>(
    null
  )

  const { user } = useAuth0()
  const currentUserId = user?.sub

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteContact = async () => {
    setAnchorEl(null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleConfirmDelete = async () => {
    if (isDeleting) return

    setIsDeleting(true)
    try {
      if (!currentUserId) return
      await useMatchesStore.getState().removeFriend(id, currentUserId)
      useChatStore.getState().setSelectedChatId(null)
    } catch (error) {
      console.error('Error deleting contact:', error)
      useSnackbarStore
        .getState()
        .showSnackbar('Failed to delete contact. Please try again.', 'error')
    } finally {
      setIsDeleting(false)
      setIsModalOpen(false)
    }
  }

  const handleReportAndBlock = () => {
    setAnchorEl(null)
    reportDialogRef.current?.handleOpenReportDialog()
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ minWidth: 'fit-content', padding: '0' }}
      >
        <img src="/img/messages/menu.svg" alt="menu" />
      </Button>
      <Menu
        id="basic-menu"
        className={classes.chatMenu}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{ top: '10px', left: '15px' }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem className={classes.menuItem} onClick={handleDeleteContact}>
          delete contact
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleReportAndBlock}>
          report and block
        </MenuItem>
      </Menu>

      <DeleteContactModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
      <ReportDialog
        ref={reportDialogRef}
        reportedUserId={id}
        reporterUserId={currentUserId || ''}
      />
    </div>
  )
}

const useStyles = makeStyles()((theme) => ({
  chatMenu: {
    '& .MuiList-root': {
      paddingTop: 21,
      paddingBottom: 21,
      paddingLeft: 5,
      paddingRight: 73,
    },
    '& .MuiPaper-root': {
      borderRadius: 10,
    },
  },
  menuItem: {
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0%',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
  },
}))
