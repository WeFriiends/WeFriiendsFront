import React, { useRef } from 'react'
import { Button } from '@mui/material'
import { ReportDialog } from './ReportDialog'

const ReportDialogExamplePage = () => {
  const reportDialogRef = useRef<{ handleOpenReportDialog: () => void }>(null)

  const handleOpenReportDialog = () => {
    reportDialogRef.current?.handleOpenReportDialog()
  }

  return (
    <>
      <Button onClick={handleOpenReportDialog} variant="text" disableRipple>
        Click to Report User
      </Button>
      <ReportDialog ref={reportDialogRef} />
    </>
  )
}

export default ReportDialogExamplePage
