import React from 'react'
import { makeStyles } from 'tss-react/mui'
import { Button, Menu, MenuItem } from '@mui/material'
import { useMatchesStore } from 'zustand/friendsStore'
import { useAuth0 } from '@auth0/auth0-react'
import { db } from 'services/firebase'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { DeleteContactModal } from './DeleteContactModal'
import ReportDialog from 'components/report/ReportDialog'

interface ChatMenuProps {
  id: string
}

export const ChatMenu = ({ id }: ChatMenuProps) => {
  const { classes } = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const open = Boolean(anchorEl)

  const reportDialogRef = React.useRef<{ handleOpenReportDialog: () => void }>(
    null
  )

  const { user } = useAuth0()
  const currentUserId = user?.sub

  const removeFriend = useMatchesStore((state) => state.removeFriend)

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
    if (id && currentUserId) {
      // удаляем из Firebase
      try {
        const conversationId = `${currentUserId}_${id}`
        const conversationRef = doc(db, 'conversations', conversationId)
        const docSnap = await getDoc(conversationRef)

        if (docSnap.exists()) {
          await deleteDoc(conversationRef)
        } else {
          // пробуем другой порядок (на случай если чат создавался с другой стороны)
          const altConversationId = `${id}_${currentUserId}`
          const altRef = doc(db, 'conversations', altConversationId)
          const altDocSnap = await getDoc(altRef)

          if (altDocSnap.exists()) {
            await deleteDoc(altRef)
          }
        }
      } catch (firebaseError) {
        console.error('❌ Ошибка при удалении из Firebase:', firebaseError)
      }

      // удаляем матч
      try {
        await removeFriend(id, currentUserId)
      } catch (removeError) {
        console.error('❌ Ошибка удаления матча:', removeError)
      }
    }

    setIsModalOpen(false)
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
      />
      <ReportDialog ref={reportDialogRef} />
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
