import { ReactNode } from 'react'
import { Box, Modal } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'

type CommonModalProps = {
  children: ReactNode
  isOpened: boolean
  modalDescriptionID?: string
  onClose: () => void
  height?: number | string
  width?: number
  contentOverflow?: 'auto' | 'visible' | 'hidden'
} & (
  | { ariaLabel: string; modalTitleID?: never }
  | { ariaLabel?: never; modalTitleID: string }
)

export const CommonModal = ({
  children,
  isOpened,
  modalTitleID,
  modalDescriptionID,
  onClose,
  height = 'auto',
  width = 370,
  contentOverflow = 'auto',
  ariaLabel,
}: CommonModalProps) => {
  const { classes } = useStyles()

  return (
    <Modal
      className={classes.modal}
      open={isOpened}
      aria-label={ariaLabel}
      aria-labelledby={modalTitleID}
      aria-describedby={modalDescriptionID}
      onClose={onClose}
    >
      <Box className={classes.wrapper} sx={{ height, width }}>
        <IconButton
          disableRipple
          aria-label="close modal"
          className={classes.closeButton}
          onClick={onClose}
        >
          <img src="/img/icon-close-modal.svg" alt="Close" />
        </IconButton>
        <Box
          className={classes.wrapperContent}
          sx={{ overflow: contentOverflow }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  )
}

const useStyles = makeStyles()(() => ({
  modal: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& :focus': {
      outline: 'none',
    },
  },
  wrapper: {
    position: 'relative',
    maxWidth: '100vw',
    maxHeight: '100vh',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '75px 0 40px',
    boxSizing: 'border-box',
    color: theme.palette.text.primary,
    transition: 'height .3s',
    [theme.breakpoints.down(370)]: {
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
    },
  },
  closeButton: {
    height: 24,
    width: 24,
    padding: 0,
    position: 'absolute',
    transition: '0.3s',
    right: 15,
    top: 15,
    minWidth: 0,
    '&:hover': {
      transform: 'scale(105%)',
      cursor: 'pointer',
    },
  },
  wrapperContent: {
    margin: '0 15px',
    padding: '0 5px',
    maxHeight: '100%',
  },
}))
