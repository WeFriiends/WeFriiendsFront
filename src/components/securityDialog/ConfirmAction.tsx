import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'

type ConfirmActionProps = {
  userName: string
  actionType: 'Block' | 'Delete'
  actionDescription: React.ReactNode
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmAction: React.FC<ConfirmActionProps> = ({
  userName,
  actionType,
  actionDescription,
  onConfirm,
  onCancel,
}) => {
  const { classes } = useStyles()

  return (
    <Box className={classes.container}>
      <Typography variant="h2" className={classes.title}>
        {actionType} {userName}
      </Typography>
      <Typography className={classes.content}>{actionDescription}</Typography>
      <Box className={classes.buttonGroup}>
        <Button
          onClick={onCancel}
          className={`${classes.button} ${classes.cancelButton}`}
          disableFocusRipple
          disableRipple
          disableElevation
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          className={`${classes.button} ${classes.confirmButton}`}
          disableFocusRipple
          disableRipple
          disableElevation
        >
          {actionType}
        </Button>
      </Box>
    </Box>
  )
}

export default ConfirmAction

const useStyles = makeStyles()({
  container: {
    display: 'grid',
  },
  title: {
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  content: {
    fontSize: 14,
    textAlign: 'center',
    paddingBottom: 25,
    color: theme.palette.common.black,
    lineHeight: 1.3,
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
    margin: '0 15px',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    borderRadius: 10,
    padding: '0 14px',
    textTransform: 'none',
    fontSize: 14,
    fontWeight: 600,
    height: 50,
    transition: 'color .3s, background-color .3s',
    '&:active, &:hover': {
      fontWeight: 600,
      background: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
  },
  cancelButton: {
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    '&:active, &:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  confirmButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.light,
    '&:active, &:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
})
