import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'

type ReportActionProps = {
  chooseDelete: () => void
  chooseBlock: () => void
  userName: string
}

const ChooseAction: React.FC<ReportActionProps> = ({
  chooseDelete,
  chooseBlock,
  userName: userName,
}) => {
  const { classes } = useStyles()

  const handleBlock = () => {
    // TODO: Add API and code for user blocking
    chooseBlock()
  }

  const handleDelete = () => {
    // TODO: Add API and code for user deleting
    chooseDelete()
  }

  return (
    <Box className={classes.reportContainer}>
      <Typography variant="h2" className={classes.title}>
        Security
      </Typography>
      <Typography className={classes.subTitleSecondary}>
        Select the reason for the complaint – <br />
        we will definitely take action
      </Typography>
      <Box className={classes.btnContainer}>
        <Button
          onClick={handleDelete}
          className={classes.linkBtn}
          disableFocusRipple
          disableRipple
          disableElevation
        >
          Delete from friends {userName}
        </Button>
        <Button
          onClick={handleBlock}
          className={classes.linkBtn}
          disableFocusRipple
          disableRipple
          disableElevation
        >
          Block user
        </Button>
        <Button
          target="_blank"
          href="https://www.wefriiends.com/"
          rel={'nofollow noopener'}
          className={classes.linkBtn}
          disableFocusRipple
          disableRipple
          disableElevation
        >
          Security materials
        </Button>
      </Box>
    </Box>
  )
}

export default ChooseAction

const useStyles = makeStyles()({
  reportContainer: {
    display: 'grid',
  },
  title: {
    textAlign: 'center',
    paddingBottom: 15,
  },
  subTitleSecondary: {
    paddingBottom: 15,
    fontSize: 14,
    textAlign: 'center',
  },
  btnContainer: {
    display: 'grid',
    gap: 8,
    marginBottom: 10,
  },
  linkBtn: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    flexShrink: 0,
    flexGrow: 1,
    flexBasis: 0,
    borderRadius: 10,
    padding: '0 14px',
    boxShadow: '0px 0px 7px 1px rgba(179, 179, 179, 0.14)',
    textTransform: 'none',
    color: theme.palette.text.primary,
    fontSize: 14,
    transition: 'color .3s, background-color .3s',
    height: 50,
    fontWeight: 400,
    '&:active, &:hover': {
      fontWeight: 600,
      background: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
  },
})
