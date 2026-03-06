import { IconButton, IconButtonProps } from '@mui/material'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

export function CollapsePanelButton(props: IconButtonProps) {
  return (
    <IconButton {...props}>
      <KeyboardDoubleArrowRightIcon />
    </IconButton>
  )
}
