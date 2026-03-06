import {
  Box,
  Drawer,
  Slide,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import UserProfile from 'components/userProfile/UserProfile'
import { useGetUserById } from 'hooks/useGetUserById'

import { ReactNode } from 'react'
import { CollapsePanelButton } from './CollapsePanelButton'
import Loader from 'common/svg/Loader'

export interface UserProfilePanelProps {
  selectedUserId: string | null
  onClose: () => void
  actions?: ReactNode
}

export function UserProfilePanel({
  selectedUserId,
  onClose,
  actions,
}: UserProfilePanelProps) {
  const theme = useTheme()
  const { data, isLoading, error } = useGetUserById(selectedUserId)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const renderContent = () => {
    if (isLoading) {
      return <Loader />
    }

    if (error) {
      return <Typography>{error.message}</Typography>
    }

    if (!data) return null

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <UserProfile user={data} />
        </Box>
        {actions && <Box>{actions}</Box>}
      </Box>
    )
  }

  if (isMobile) {
    return (
      <Drawer anchor="right" open={!!selectedUserId} onClose={onClose}>
        <Box
          sx={{
            width: { xs: 320, sm: 340 },
          }}
        >
          {renderContent()}
        </Box>
      </Drawer>
    )
  }

  return (
    <Slide
      direction="left"
      in={!!selectedUserId}
      timeout={{ enter: 500, exit: 400 }}
      unmountOnExit
    >
      <Box
        sx={{
          width: { md: 340, lg: 450 },
          position: 'sticky',
          top: 0,
        }}
      >
        <CollapsePanelButton onClick={onClose} />
        {renderContent()}
      </Box>
    </Slide>
  )
}
