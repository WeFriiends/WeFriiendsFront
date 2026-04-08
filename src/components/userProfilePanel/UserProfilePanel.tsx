import { Box, Slide, Typography, useMediaQuery, useTheme } from '@mui/material'
import UserProfile from 'components/userProfile/UserProfile'
import { useGetUserById } from 'hooks/useGetUserById'

import { ReactNode } from 'react'
import { makeStyles } from 'tss-react/mui'
import { CollapsePanelButton } from './CollapsePanelButton'
import Loader from 'common/svg/Loader'
import { MobileProfileDrawer } from 'common/components/MobileProfileDrawer'

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
  const { data, isLoading, error } = useGetUserById(selectedUserId)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box className={classes.loaderWrapper}>
          <Loader />
        </Box>
      )
    }

    if (error) {
      return <Typography>{error.message}</Typography>
    }

    if (!data) return null

    return (
      <Box className={classes.contentWrapper}>
        <Box className={classes.scrollableContent}>
          <UserProfile user={data} />
        </Box>
        {actions && <Box>{actions}</Box>}
      </Box>
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
        <Box className={classes.closeProfileHeader} onClick={onClose}>
          <CollapsePanelButton sx={{ padding: 0 }} />
          <Typography variant="body2">Close profile</Typography>
        </Box>
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
    width: 340,
    paddingTop: 70,
    [theme.breakpoints.up('lg')]: {
      width: 450,
      paddingTop: 24,
    },
  },
  closeProfileHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingBlock: 3,
    marginBottom: 12,
    cursor: 'pointer',
    color: theme.palette.text.primary,
    backgroundColor: theme.customPalette.authBtnBg,
    transition: 'color 0.3s',
    '&:hover': {
      color: theme.palette.primary.main,
    },
    '& .MuiIconButton-root': {
      color: 'inherit',
    },
  },
}))
