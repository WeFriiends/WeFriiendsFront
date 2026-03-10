import { IconButton, IconButtonProps } from '@mui/material'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'

export function CollapsePanelButton(props: IconButtonProps) {
  return (
    <IconButton {...props}>
      <KeyboardDoubleArrowLeftIcon />
    </IconButton>
  )
}
