import { Snackbar, Alert } from '@mui/material'
import type { AlertColor } from '@mui/material'

interface AppSnackbarProps {
  open: boolean
  message: string | null
  onClose: () => void
  severity?: AlertColor
  autoHideDuration?: number
}

export function AppSnackbar({
  open,
  message,
  onClose,
  severity = 'error',
  autoHideDuration = 4000,
}: AppSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
