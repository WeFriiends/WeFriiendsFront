import { useState } from 'react'
import { AlertColor } from '@mui/material'

interface SnackbarInfo {
  message: string
  severity: AlertColor
}

export function useSnackbar() {
  const [snackbarInfo, setSnackbarInfo] = useState<SnackbarInfo | null>(null)

  const showSnackbar = (message: string, severity: AlertColor) =>
    setSnackbarInfo({ message, severity })

  const handleCloseSnackbar = () => setSnackbarInfo(null)

  return { snackbarInfo, showSnackbar, handleCloseSnackbar }
}
