import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { blockUser } from '../../actions/blockService'

type ReportActionProps = {
  chooseBlock: () => void
  chooseReport: () => void
  reportedUserId: string
  reporterUserId: string
}

export const ReportAction: React.FC<ReportActionProps> = ({
  chooseBlock,
  chooseReport,
  reportedUserId,
  reporterUserId,
}) => {
  const { classes } = useStyles()

  const handleBlock = async () => {
    try {
      await blockUser(reportedUserId, reporterUserId)
      console.log('✅ Пользователь заблокирован')
      chooseBlock()
    } catch (error) {
      console.error('❌ Ошибка при блокировке:', error)
    }
  }

  const handleReport = () => {
    chooseReport()
  }

  return (
    <Box className={classes.reportContainer}>
      <img
        src="/img/report/icon-alert.svg"
        alt="Alert circle"
        className={classes.imgAlert}
      />
      <Typography variant="h2" className={classes.title}>
        Report user
      </Typography>
      <Box className={classes.btnContainer}>
        <Button
          onClick={handleBlock}
          className={classes.linkBtn}
          disableFocusRipple
          disableRipple
          disableElevation
        >
          Block
        </Button>
        <Button
          onClick={handleReport}
          className={classes.linkBtn}
          disableFocusRipple
          disableRipple
          disableElevation
        >
          Report
        </Button>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles()((theme) => ({
  reportContainer: {
    display: 'grid',
  },
  title: {
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 40,
  },
  imgAlert: {
    margin: '0 auto',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
    margin: '0 15px',
  },
  linkBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    flexGrow: 1,
    flexBasis: 0,
    borderRadius: 10,
    padding: '0 14px',
    boxShadow: '0 0 7px 1px rgba(179, 179, 179, 0.35)',
    textTransform: 'none',
    color: theme.palette.text.primary,
    marginBottom: 10,
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
}))
