import { create } from 'zustand'
import type { AlertColor } from '@mui/material'

interface SnackbarState {
  isOpen: boolean
  message: string | null
  severity: AlertColor
  showSnackbar: (message: string, severity: AlertColor) => void
  closeSnackbar: () => void
}

export const useSnackbarStore = create<SnackbarState>()((set) => ({
  isOpen: false,
  message: null,
  severity: 'error',
  showSnackbar: (message, severity) => set({ isOpen: true, message, severity }),
  closeSnackbar: () => set({ isOpen: false }),
}))
