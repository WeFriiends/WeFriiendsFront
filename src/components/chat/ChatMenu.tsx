import React, { MouseEvent, useState, useEffect } from 'react'
import { makeStyles } from 'tss-react/mui'
import { Button, Menu, MenuItem, Box, Typography } from '@mui/material'
import { useMatchesStore } from 'zustand/friendsStore'
import { CommonModal } from 'common/components/CommonModal'
import theme from '../../styles/createTheme'
import { useAuth0 } from '@auth0/auth0-react'
import { db } from 'services/firebase'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'

// import { deleteDoc, doc } from 'firebase/firestore'
interface ChatMenuProps {
  icon?: string
  id?: string
}

export const ChatMenu = ({
  icon = '/img/messages/menu.svg',
  id,
}: ChatMenuProps) => {
  const { classes } = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const open = Boolean(anchorEl)

  const { user } = useAuth0()
  const currentUserId = user?.sub

  const removeFriend = useMatchesStore((state) => state.removeFriend)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
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
    try {
      console.log('⚠️ Начинаем удаление контакта:', { id, currentUserId })

      //  удаляем из Firebase
      if (id && currentUserId) {
        try {
          const conversationId = `${currentUserId}_${id}`
          const conversationRef = doc(db, 'conversations', conversationId)
          const docSnap = await getDoc(conversationRef)

          if (docSnap.exists()) {
            await deleteDoc(conversationRef)
          } else {
            // Пробуем другой порядок
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
      }

      // пробуем удалить матч
      if (removeFriend && id && currentUserId) {
        try {
          await removeFriend(id, currentUserId)
        } catch (removeError) {
          console.error('❌ Ошибка удаления матча:', removeError)
        }
      }
    } catch (error) {
      console.error('❌ Общая ошибка:', error)
    }
    setIsModalOpen(false)
  }

  useEffect(() => {
    const getCollections = async () => {
      const collections = await (db as any).listCollections?.()
      console.log(collections?.map((c: { id: string }) => c.id))
    }
    getCollections()
  }, [])

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
        <img src={icon} alt="menu" />
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
        <MenuItem onClick={handleDeleteContact}>delete contact</MenuItem>
        <MenuItem onClick={handleClose}>report and block</MenuItem>
      </Menu>
      <CommonModal
        isOpened={isModalOpen}
        onClose={handleCloseModal}
        modalTitle={'modal-modal-title'}
        modalDescription={'modal-modal-description'}
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
              onClick={handleCloseModal}
              disableFocusRipple
              disableRipple
            >
              Cancel
            </Button>

            <Button
              className={`${classes.button} ${classes.deleteButton}`}
              onClick={handleConfirmDelete}
              disableFocusRipple
              disableRipple
            >
              Delete
            </Button>
          </Box>
        </Box>
      </CommonModal>
    </div>
  )
}

const useStyles = makeStyles()({
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
