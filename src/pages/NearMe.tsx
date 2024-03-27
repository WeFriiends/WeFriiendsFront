import * as React from 'react'
import Box from '@mui/material/Box'

import { Container } from '@mui/material'
import NavBar from '../components/navBar/NavBar'
import NearMeProfiles from '../components/nearMe/NearMeProfiles'

export default function NearMe() {
  return (
    <Container component="main" sx={{ flexGrow: 1 }}>
      <Box>
        <NavBar />
        <NearMeProfiles />
      </Box>
    </Container>
  )
}
