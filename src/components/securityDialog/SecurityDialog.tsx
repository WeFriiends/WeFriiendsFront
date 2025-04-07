import React, {
  useState,
  useEffect,
  forwardRef,
  Ref,
  useImperativeHandle,
} from 'react'
import { CommonModal } from 'common/components/CommonModal'
import ChooseAction from './ChooseAction'
import ConfirmAction from './ConfirmAction'
import ActionCompleted from './ActionCompleted'

interface ReportDialogProps {
  ref: Ref<{ handleOpenReportDialog: () => void }>
  userName: string
}

const SecurityDialog = forwardRef((props: ReportDialogProps, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentView, setCurrentView] = useState('chooseAction')
  const [modalHeight, setModalHeight] = useState<320 | 370 | 470 | undefined>(
    320
  )

  const handleOpenReportDialog = () => {
    setIsModalVisible(true)
  }

  const handleClose = () => {
    setIsModalVisible(false)
    setCurrentView('chooseAction')
  }

  useImperativeHandle(ref, () => ({
    handleOpenReportDialog,
  }))

  useEffect(() => {
    // Update modal height based on the current view
    const viewHeights: { [key: string]: 320 | 470 } = {
      chooseAction: 470,
      confirmBlock: 320,
      userIsBlocked: 320,
      confirmDelete: 320,
      userIsDeleted: 320,
    }
    setModalHeight(viewHeights[currentView])
  }, [currentView])

  return (
    <CommonModal
      isOpened={isModalVisible}
      modalTitle={'Report User'}
      modalDescription={'Choose an action to report or block the user.'}
      onClose={handleClose}
      height={modalHeight}
    >
      {currentView === 'chooseAction' && (
        <ChooseAction
          chooseDelete={() => setCurrentView('confirmDelete')}
          chooseBlock={() => setCurrentView('confirmBlock')}
          userName={props.userName}
        />
      )}
      {currentView === 'userIsBlocked' && (
        <ActionCompleted
          userName={props.userName}
          actionType="blocked"
          closeModal={() => handleClose()}
        />
      )}
      {currentView === 'userIsDeleted' && (
        <ActionCompleted
          userName={props.userName}
          actionType="deleted"
          closeModal={() => handleClose()}
        />
      )}
      {currentView === 'confirmBlock' && (
        <ConfirmAction
          userName={props.userName}
          actionType="Block"
          actionDescription="Are you sure you want to block user?"
          onConfirm={() => setCurrentView('userIsBlocked')}
          onCancel={() => setCurrentView('chooseAction')}
        />
      )}
      {currentView === 'confirmDelete' && (
        <ConfirmAction
          userName={props.userName}
          actionType="Delete"
          actionDescription={
            <>
              Are you sure you want to delete user <br />
              from friends?
            </>
          }
          onConfirm={() => setCurrentView('userIsDeleted')}
          onCancel={() => setCurrentView('chooseAction')}
        />
      )}
    </CommonModal>
  )
})

export default SecurityDialog
