import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'
import { commonStyles } from '../../styles/commonStyles'

type ActionCompletedProps = {
  closeModal: () => void
  userName: string
  actionType: 'blocked' | 'deleted'
}

const ActionCompleted: React.FC<ActionCompletedProps> = ({
  closeModal,
  userName,
  actionType,
}) => {
  const { classes } = useStyles()
  const commonClasses = commonStyles().classes

  const actionText = actionType === 'blocked' ? 'User blocked' : 'User deleted'

  const description =
    actionType === 'blocked'
      ? `${userName} is blocked.`
      : `${userName} is deleted from your friends.`

  return (
    <Box className={classes.reportContainer}>
      <Typography variant="h2" className={classes.title}>
        {actionText}
      </Typography>
      <Typography className={classes.subTitleSecondary}>
        {description}
      </Typography>
      <Button
        variant="contained"
        fullWidth
        disableRipple
        className={`${commonClasses.submitButton} ${classes.okBtn}`}
        onClick={closeModal}
      >
        OK, thanks!
      </Button>
    </Box>
  )
}

export default ActionCompleted

const useStyles = makeStyles()({
  reportContainer: {
    display: 'grid',
    alignItems: 'center',
  },
  title: {
    paddingTop: 10,
    textAlign: 'center',
    paddingBottom: 15,
  },
  subTitleSecondary: {
    fontSize: 14,
    textAlign: 'center',
  },
  okBtn: {
    textTransform: 'none',
    maxWidth: 260,
    height: 60,
    margin: '30px auto 0',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: theme.palette.primary.main,
    },
  },
})
