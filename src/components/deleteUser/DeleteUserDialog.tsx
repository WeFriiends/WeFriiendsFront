import React, { useState, forwardRef, Ref, useImperativeHandle } from 'react'
import { CommonModal } from 'common/components/CommonModal'
import DeleteConfirm from './DeleteConfirm'
import UserIsDeleted from './UserIsDeleted'

interface DeleteUserDialogProps {
  ref: Ref<{ handleOpenDeleteUserDialog: () => void }>
}

const DeleteUserDialog = forwardRef((props: DeleteUserDialogProps, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentView, setCurrentView] = useState('deleteConfirm')

  const handleOpenDeleteUserDialog = () => {
    setIsModalVisible(true)
  }

  const handleClose = () => {
    setIsModalVisible(false)

    setCurrentView('deleteConfirm')
  }

  useImperativeHandle(ref, () => ({
    handleOpenDeleteUserDialog,
  }))

  return (
    <CommonModal
      isOpened={isModalVisible}
      ariaLabel="Delete User"
      onClose={handleClose}
      height={320}
    >
      {currentView === 'deleteConfirm' && (
        <DeleteConfirm
          chooseClose={() => handleClose()}
          chooseDelete={() => setCurrentView('userIsDeleted')}
        />
      )}
      {currentView === 'userIsDeleted' && (
        <UserIsDeleted closeModal={() => handleClose()} />
      )}
    </CommonModal>
  )
})

export default DeleteUserDialog
