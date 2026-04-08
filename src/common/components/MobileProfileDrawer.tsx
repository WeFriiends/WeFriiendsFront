import { ReactNode } from 'react'
import { Box, Drawer, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import ArrowBackButton from 'common/components/ArrowBackButton'

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

  const handleClose = () => {
    if (document.activeElement instanceof HTMLElement) {
      // fix Warning: Blocked aria-hidden on an element
      // because its descendant retained focus...
      document.activeElement.blur()
    }
    onClose()
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        className: classes.drawerPaper,
      }}
    >
      <Box className={classes.mobileContainer}>
        <Box className={classes.mobileHeader}>
          <ArrowBackButton
            stepBackHandler={handleClose}
            className={classes.backButton}
          />
          <Typography variant="body1" className={classes.backText}>
            {backLabel}
          </Typography>
        </Box>

        <Box className={classes.mobileContentArea}>{children}</Box>
      </Box>
    </Drawer>
  )
}

const useStyles = makeStyles()((theme) => ({
  drawerPaper: {
    width: '100vw',
  },
  mobileContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
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
}))
