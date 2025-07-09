import React, { createContext, useState, useContext } from 'react'

interface DialogContextValue {
  isDialogOpen: boolean
  openDialog: () => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextValue | undefined>(undefined)

interface DialogProviderProps {
  children: React.ReactNode
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = () => {
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <DialogContext.Provider value={{ isDialogOpen, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  )
}

export const useDialog = (): DialogContextValue => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider')
  }
  return context
}
