import { MouseEvent, useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

interface ChatMenuProps {
  icon?: string
}

export function ChatMenu({ icon = '/img/messages/menu.svg' }: ChatMenuProps) {
  const { classes } = useStyles()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ minWidth: 'fit-content', padding: '0' }}
      >
        <img src={icon} alt="menu" />
      </Button>
      <Menu
        id="basic-menu"
        className={classes.chatMenu}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{ top: '10px', left: '15px' }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onClick={handleClose}>delete contact</MenuItem>
        <MenuItem onClick={handleClose}>report and block</MenuItem>
      </Menu>
    </div>
  )
}

const useStyles = makeStyles()({
  chatMenu: {
    ' & .MuiList-root': {
      paddingTop: 21,
      paddingBottom: 21,
      paddingLeft: 5,
      paddingRight: 73,
    },
    'MuiPaper-root': {
      borderRadius: 10,
    },
  },
})
