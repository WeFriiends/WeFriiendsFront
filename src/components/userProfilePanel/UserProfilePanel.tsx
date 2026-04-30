import { Box, Slide, useMediaQuery, useTheme } from '@mui/material'
import UserProfile from 'components/userProfile/UserProfile'
import { useGetUserById } from 'hooks/useGetUserById'

import { ReactNode } from 'react'
import { makeStyles } from 'tss-react/mui'
import { CollapsePanelButton } from './CollapsePanelButton'
import { ProfilePanelHeader } from 'common/components/ProfilePanelHeader'
import { MobileProfileDrawer } from 'common/components/MobileProfileDrawer'

import { DataStateWrapper } from 'common/components/DataStateWrapper'

export interface UserProfilePanelProps {
  selectedUserId: string | null
  onClose: () => void
  actions?: ReactNode
  backLabel?: string
}

export function UserProfilePanel({
  selectedUserId,
  onClose,
  actions,
  backLabel = 'Back',
}: UserProfilePanelProps) {
  const theme = useTheme()
  const { classes } = useStyles()
  const { data, isLoading, error, mutate } = useGetUserById(selectedUserId)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const renderContent = () => {
    if (!selectedUserId) return null

    return (
      <DataStateWrapper
        isLoading={isLoading}
        error={error}
        hasData={!!data && Object.keys(data).length > 0}
        onRetry={mutate}
      >
        {data && (
          <Box className={classes.contentWrapper}>
            <Box className={classes.scrollableContent}>
              <UserProfile user={data} />
            </Box>
            {actions && <Box>{actions}</Box>}
          </Box>
        )}
      </DataStateWrapper>
    )
  }

  if (isMobile) {
    return (
      <MobileProfileDrawer
        open={!!selectedUserId}
        onClose={onClose}
        backLabel={backLabel}
      >
        {renderContent()}
      </MobileProfileDrawer>
    )
  }

  return (
    <Slide
      direction="left"
      in={!!selectedUserId}
      timeout={{ enter: 500, exit: 400 }}
      unmountOnExit
    >
      <Box className={classes.desktopContainer}>
        <ProfilePanelHeader
          icon={<CollapsePanelButton sx={{ padding: 0 }} />}
          label="Close profile"
          onClick={onClose}
        />
        {renderContent()}
      </Box>
    </Slide>
  )
}

const useStyles = makeStyles()((theme) => ({
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  loaderWrapper: {
    position: 'relative',
    height: 100,
  },
  scrollableContent: {
    flexGrow: 1,
    overflowY: 'auto',
  },
  desktopContainer: {
    position: 'sticky',
    top: 0,
    width: theme.customDimensions.sidebarWidth.md,
    paddingTop: 70,
    [theme.breakpoints.up('lg')]: {
      width: theme.customDimensions.sidebarWidth.lg,
      paddingTop: 24,
    },
  },
}))
