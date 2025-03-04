import React, { useRef } from 'react'
import { Button } from '@mui/material'
import SecurityDialog from './SecurityDialog'

const SecurityDialogExamplePage = () => {
  const reportDialogRef = useRef<{ handleOpenReportDialog: () => void }>(null)

  const handleOpenReportDialog = () => {
    reportDialogRef.current?.handleOpenReportDialog()
  }

  return (
    <>
      <Button onClick={handleOpenReportDialog} variant="text" disableRipple>
        Click to Open the Security Dialog
      </Button>
      <SecurityDialog ref={reportDialogRef} userName={'Elena S.'} />
    </>
  )
}

export default SecurityDialogExamplePage
