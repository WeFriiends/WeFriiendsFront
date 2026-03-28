import { useState } from 'react'
import type { AlertColor } from '@mui/material'

interface SnackbarInfo {
  message: string
  severity: AlertColor
}

export function useSnackbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [snackbarInfo, setSnackbarInfo] = useState<SnackbarInfo | null>(null)

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbarInfo({ message, severity })
    setIsOpen(true)
  }

  const handleCloseSnackbar = () => setIsOpen(false)

  return { isOpen, snackbarInfo, showSnackbar, handleCloseSnackbar }
}
