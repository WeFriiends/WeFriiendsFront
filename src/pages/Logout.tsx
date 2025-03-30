import React from 'react'
import { Button } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'

const Logout = () => {
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
  }

  return (
    <Button variant="text" onClick={handleLogout}>
      Log out
    </Button>
  )
}

export default Logout
