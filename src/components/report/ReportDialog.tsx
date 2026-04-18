import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { CommonModal } from 'common/components/CommonModal'
import { ReportAction } from './ReportAction'
import UserIsBlocked from './UserIsBlocked'
import { ReportForm } from './ReportForm'
import ReportReceived from './ReportReceived'

interface ReportDialogProps {
  reportedUserId?: string
  reporterUserId?: string
}

export const ReportDialog = forwardRef<
  { handleOpenReportDialog: () => void },
  ReportDialogProps
>(({ reportedUserId = '', reporterUserId = '' }, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentView, setCurrentView] = useState('chooseAction')
  const [modalHeight, setModalHeight] = useState<370 | 320 | 605 | undefined>(
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
    const viewHeights: { [key: string]: 370 | 320 | 605 | undefined } = {
      chooseAction: 320,
      userIsBlocked: 320,
      reportForm: undefined,
      reportReceived: 370,
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
        <ReportAction
          chooseBlock={() => setCurrentView('userIsBlocked')}
          chooseReport={() => setCurrentView('reportForm')}
          reportedUserId={reportedUserId}
          reporterUserId={reporterUserId}
        />
      )}
      {currentView === 'userIsBlocked' && (
        <UserIsBlocked closeModal={() => handleClose()} />
      )}
      {currentView === 'reportForm' && (
        <ReportForm
          onSuccess={() => setCurrentView('reportReceived')}
          goBack={() => setCurrentView('chooseAction')}
          reportedUserId={reportedUserId}
          reporterUserId={reporterUserId}
        />
      )}
      {currentView === 'reportReceived' && (
        <ReportReceived closeModal={() => handleClose()} />
      )}
    </CommonModal>
  )
})
