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
import { makeStyles } from 'tss-react/mui'
import ArrowBackButton from 'common/components/ArrowBackButton'
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
      <Drawer
        anchor="right"
        open={!!selectedUserId}
        onClose={onClose}
        PaperProps={{
          className: classes.drawerPaper,
        }}
      >
        <Box className={classes.mobileContainer}>
          <Box className={classes.mobileHeader}>
            <ArrowBackButton
              stepBackHandler={onClose}
              className={classes.backButton}
            />
            <Typography variant="body1" className={classes.backText}>
              Back to Near by
            </Typography>
          </Box>

          <Box className={classes.mobileContentArea}>{renderContent()}</Box>
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
      <Box className={classes.desktopContainer}>
        <Box className={classes.closeProfileHeader} onClick={onClose}>
          <CollapsePanelButton />
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
  drawerPaper: {
    width: '100vw',
  },
  mobileContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  mobileHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '24px 20px 16px',
  },
  backButton: {
    margin: 0,
    backgroundColor: 'transparent',
  },
  backText: {
    color: theme.palette.common.black,
    fontSize: 18,
  },
  mobileContentArea: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 490,
    paddingLeft: 20,
    paddingRight: 20,
    margin: '0 auto',
    overflowY: 'auto',
    boxSizing: 'border-box',
  },
  desktopContainer: {
    position: 'sticky',
    top: 0,
    width: 340,
    [theme.breakpoints.up('lg')]: {
      width: 450,
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
