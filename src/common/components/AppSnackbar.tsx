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
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={(theme) => ({
          width: '100%',
          ...(severity === 'error' && {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.common.white,
            '& .MuiAlert-icon': {
              color: theme.palette.common.white,
            },
          }),
        })}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
