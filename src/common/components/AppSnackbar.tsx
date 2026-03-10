import { Snackbar, Alert, AlertColor } from '@mui/material'

interface AppSnackbarProps {
  open: boolean
  message: string | null
  onClose: () => void
  severity?: AlertColor
  autoHideDuration?: number
}

import { useState, useEffect } from 'react'

export function AppSnackbar({
  open,
  message,
  onClose,
  severity = 'error',
  autoHideDuration = 4000,
}: AppSnackbarProps) {
  const [persistedMessage, setPersistedMessage] = useState(message)
  const [persistedSeverity, setPersistedSeverity] = useState(severity)

  useEffect(() => {
    if (open) {
      setPersistedMessage(message)
      setPersistedSeverity(severity)
    }
  }, [open, message, severity])

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert
        onClose={onClose}
        severity={persistedSeverity}
        sx={{ width: '100%' }}
      >
        {persistedMessage}
      </Alert>
    </Snackbar>
  )
}
