import React, { useState } from 'react'
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Button,
} from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import ReportInputRadio from './ReportInputRadio'
import { sendReport } from '../../actions/reportService'

type ReportFormProps = {
  onSuccess: () => void
  goBack: () => void
  reportedUserId: string
  reporterUserId: string
}

export const ReportForm: React.FC<ReportFormProps> = ({
  onSuccess,
  goBack,
  reportedUserId,
  reporterUserId,
}) => {
  const { classes } = useStyles()

  const [comment, setComment] = useState('')
  const [selectedReason, setSelectedReason] = useState('spam')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const MAX_SYMBOLS = 500

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setComment(value.length > MAX_SYMBOLS ? value.slice(0, MAX_SYMBOLS) : value)
  }

  const handleSendReport = async () => {
    setIsLoading(true)
    setError('')

    try {
      await sendReport({
        reportedUserId,
        reporterUserId,
        reason: selectedReason,
        comment,
      })
      onSuccess()
    } catch (err) {
      setError('Failed to send report. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const reportReasons = [
    { text: 'Spam', value: 'spam' },
    { text: 'Abuse', value: 'abuse' },
    { text: 'Inappropriate photos', value: 'inappropriate-photos' },
    { text: 'Other', value: 'other' },
  ]

  return (
    <Box className={classes.reportContainer}>
      <img
        src="/img/report/icon-alert.svg"
        alt="Alert circle"
        className={classes.imgAlert}
      />
      <Box>
        <Typography variant="h2" className={classes.title}>
          Report
        </Typography>
        <Typography className={classes.content}>
          Select the reason for the complaint – <br /> we will definitely take
          action
        </Typography>
      </Box>

      <FormControl>
        <RadioGroup
          value={selectedReason}
          onChange={(e) => setSelectedReason(e.target.value)}
        >
          {reportReasons.map((reason) => (
            <FormControlLabel
              key={reason.value}
              value={reason.value}
              control={<ReportInputRadio />}
              label={reason.text}
              className={classes.formControlLabel}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Typography className={classes.comment}>
        Also you can leave a comment. <br />
        We will better understand what has happened.
      </Typography>

      <textarea
        value={comment}
        onChange={handleCommentChange}
        className={classes.textarea}
        placeholder={`Max ${MAX_SYMBOLS} characters...`}
        disabled={isLoading}
      />

      <Typography className={classes.counter}>
        {comment.length}/{MAX_SYMBOLS}
      </Typography>

      {error && <Typography className={classes.error}>{error}</Typography>}

      <Box className={classes.groupBtn}>
        <Button
          className={classes.button}
          disableFocusRipple
          disableRipple
          onClick={goBack}
          disabled={isLoading}
        >
          cancel
        </Button>
        <Button
          className={classes.button}
          disableFocusRipple
          disableRipple
          onClick={handleSendReport}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'send'}
        </Button>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles()((theme) => ({
  reportContainer: {
    display: 'grid',
  },
  imgAlert: {
    margin: '0 auto',
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
  formControlLabel: {
    '& .MuiTypography-root.MuiFormControlLabel-label': { fontSize: 14 },
  },
  comment: {
    fontSize: 14,
    lineHeight: 1.2,
    textAlign: 'left',
    margin: '30px 0 10px',
  },
  textarea: {
    width: '100%',
    minHeight: '115px',
    maxHeight: '200px',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: 1.2,
    color: theme.palette.common.black,
    borderRadius: '10px',
    background: theme.palette.common.white,
    boxShadow: '0px 0px 7px 1px rgba(179, 179, 179, 0.14)',
    border: '1px solid #eee',
    fontFamily: 'inherit',
    padding: 10,
    resize: 'vertical',
    overflowY: 'auto' as any,
    '&:focus': {
      outline: 'none',
    },
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.primary.main,
      borderRadius: '10px',
    },
  },
  counter: {
    fontSize: '12px',
    textAlign: 'right',
    color: theme.palette.text.primary,
    marginTop: '5px',
    opacity: 0.7,
  },
  groupBtn: {
    display: 'flex',
    gap: 15,
    justifyContent: 'center',
    margin: '20px 0 5px',
  },
  button: {
    borderRadius: 10,
    fontSize: 12,
    width: 124,
    height: 38,
    textDecoration: 'none',
    textTransform: 'none',
    fontWeight: 500,
    boxShadow: '0 0 7px 1px rgba(179, 179, 179, 0.14)',
    color: theme.palette.primary.main,
    border: '1px solid ' + theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
  error: {
    fontSize: '12px',
    textAlign: 'center',
    color: theme.palette.primary.main,
    marginTop: '10px',
  },
}))
