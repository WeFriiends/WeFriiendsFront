import { Box, Grid } from '@mui/material'
import { MiniCardsSection } from '../components/whoLikedMe/MiniCardsSection'
import { InfoBar } from '../components/whoLikedMe/InfoBar'
import { ProfileCardSection } from 'components/whoLikedMe/ProfileCardSection'
import { WhoLikedMeProvider } from 'context/whoLikedMeContext'
import { MatchModalWrapper } from 'components/whoLikedMe/MatchModalWrapper'

export default function WhoLikedMePage() {
  return (
    <WhoLikedMeProvider>
      <InfoBar />

      <Grid container alignItems="flex-start" gap={16}>
        <Box sx={{ containerType: 'inline-size', flex: 1 }}>
          <MiniCardsSection />
        </Box>
        <ProfileCardSection />
      </Grid>

      <MatchModalWrapper />
    </WhoLikedMeProvider>
  )
}
