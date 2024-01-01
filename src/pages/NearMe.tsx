import Box from '@mui/material/Box'

import { Container, useMediaQuery } from '@mui/material'
import Header from '../components/header/Header'
import NearMeProfiles from '../components/nearMe/NearMeProfiles'
import FooterAppBar from '../components/footerAppBar/FooterAppBar'
import LocationInputAutocomplete from 'components/nearMe/LocationInputAutocomplete'

export default function NearMe() {
  const isMobile = useMediaQuery<boolean>('(max-width:600px)')

  return (
    <Container component="main" sx={{ flexGrow: 1 }}>
      {isMobile ? (
        <Box sx={{ pb: 7 }}>
          <LocationInputAutocomplete />
          <NearMeProfiles isMobile={isMobile} />
          <FooterAppBar />
        </Box>
      ) : (
        <Box>
          <Header />
          <LocationInputAutocomplete />
          <NearMeProfiles isMobile={isMobile} />
        </Box>
      )}
    </Container>
  )
}
