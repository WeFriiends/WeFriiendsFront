import React, {
  useState,
  useEffect,
  forwardRef,
  Ref,
  useImperativeHandle,
} from 'react'
import { CommonModal } from 'common/components/CommonModal'
import ReportAction from './ReportAction'
import UserIsBlocked from './UserIsBlocked'
import ReportForm from './ReportForm'
import ReportReceived from './ReportReceived'

interface ReportDialogProps {
  ref: Ref<{ handleOpenReportDialog: () => void }>
}

const ReportDialog = forwardRef((props: ReportDialogProps, ref) => {
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
    // Update modal height based on the current view
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
      ariaLabel="Report User"
      onClose={handleClose}
      height={modalHeight}
    >
      {currentView === 'chooseAction' && (
        <ReportAction
          chooseBlock={() => setCurrentView('userIsBlocked')}
          chooseReport={() => setCurrentView('reportForm')}
        />
      )}
      {currentView === 'userIsBlocked' && (
        <UserIsBlocked closeModal={() => handleClose()} />
      )}
      {currentView === 'reportForm' && (
        <ReportForm
          sendReport={() => setCurrentView('reportReceived')}
          goBack={() => setCurrentView('chooseAction')}
        />
      )}
      {currentView === 'reportReceived' && (
        <ReportReceived closeModal={() => handleClose()} />
      )}
    </CommonModal>
  )
})

export default ReportDialog
