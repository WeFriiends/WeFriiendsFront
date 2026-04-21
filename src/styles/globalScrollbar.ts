import { Theme } from '@mui/material'

export const scrollbarStyles = (theme: Theme) => ({
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.primary.main,
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.primary.dark,
  },
  // Firefox
  scrollbarWidth: 'thin',
  scrollbarColor: `${theme.palette.primary.main} #f1f1f1`,
})
