import { AppSnackbar } from 'common/components/AppSnackbar'
import { useSnackbarStore } from 'zustand/snackbarStore'

export function GlobalSnackbar() {
  const { isOpen, message, severity, closeSnackbar } = useSnackbarStore()

  return (
    <AppSnackbar
      open={isOpen}
      message={message}
      severity={severity}
      onClose={closeSnackbar}
    />
  )
}
