import React from 'react'
import { Button } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import { handleLogout as logoutUtil } from '../utils/logoutUtils'

const Logout = () => {
  const { logout } = useAuth0()

  const handleLogout = () => {
    logoutUtil(logout)
  }

  return (
    <Button variant="text" onClick={handleLogout}>
      Log out
    </Button>
  )
}

export default Logout
