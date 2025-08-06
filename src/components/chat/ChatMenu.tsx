import React from 'react'
import { makeStyles } from 'tss-react/mui'
import { Button, Menu, MenuItem } from '@mui/material'

interface ChatMenuProps {
  icon?: string
}

const ChatMenu = ({ icon = '/img/messages/menu.svg' }: ChatMenuProps) => {
  const { classes } = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
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

export default ChatMenu

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
