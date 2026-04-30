import { ReactNode, useEffect } from 'react'
import { Box, Drawer, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { makeStyles } from 'tss-react/mui'
import { ProfilePanelHeader } from 'common/components/ProfilePanelHeader'

interface MobileProfileDrawerProps {
  open: boolean
  onClose: () => void
  backLabel?: string
  children: ReactNode
}

export function MobileProfileDrawer({
  open,
  onClose,
  backLabel = 'Back',
  children,
}: MobileProfileDrawerProps) {
  const { classes } = useStyles()

  // Workaround for Chrome 119+ WAI-ARIA "Blocked aria-hidden" warning.
  // Force-removes focus when the drawer starts closing to prevent MUI transition conflicts.
  useEffect(() => {
    if (!open && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }, [open])

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        className: classes.drawerPaper,
      }}
    >
      <Box className={classes.mobileContainer}>
        <ProfilePanelHeader
          icon={
            <IconButton sx={{ padding: 0 }}>
              <ArrowBackIcon />
            </IconButton>
          }
          label={backLabel}
          onClick={onClose}
        />

        <Box className={classes.mobileContentArea}>{children}</Box>
      </Box>
    </Drawer>
  )
}

const useStyles = makeStyles()(() => ({
  drawerPaper: {
    width: '100vw',
  },
  mobileContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    paddingInline: 20,
    marginTop: 20,
  },
  mobileContentArea: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 490,
    margin: '0 auto',
    overflowY: 'auto',
    boxSizing: 'border-box',
  },
}))
