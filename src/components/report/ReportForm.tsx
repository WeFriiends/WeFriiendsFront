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
import theme from '../../styles/createTheme'
import ReportInputRadio from './ReportInputRadio'

type ReportFormProps = {
  sendReport: () => void
  goBack: () => void
}

const ReportForm: React.FC<ReportFormProps> = ({ sendReport, goBack }) => {
  const { classes } = useStyles()
  const handleGoBack = () => {
    goBack()
  }

  const [comment, setComment] = useState('')
  const MAX_SYMBOLS = 500

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setComment(value.length > MAX_SYMBOLS ? value.slice(0, MAX_SYMBOLS) : value)
  }

  const handleSendReport = () => {
    // TODO: Add API and code for sending a report
    sendReport()
  }

  const reportReasons = [
    { text: 'Spam', value: 'spam' },
    { text: 'Abuse', value: 'abuse' },
    {
      text: 'Inappropriate photos',
      value: 'inappropriate-photos',
    },
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
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="spam"
          name="radio-buttons-group"
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
      />
      <Typography className={classes.counter}>
        {comment.length}/{MAX_SYMBOLS}
      </Typography>
      <Box className={classes.groupBtn}>
        <Button
          className={classes.button}
          disableFocusRipple
          disableRipple
          onClick={handleGoBack}
        >
          cancel
        </Button>
        <Button
          className={classes.button}
          disableFocusRipple
          disableRipple
          onClick={handleSendReport}
        >
          send
        </Button>
      </Box>
    </Box>
  )
}

export default ReportForm

const useStyles = makeStyles()({
  reportContainer: {
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
  imgAlert: {
    margin: '0 auto',
  },
  formControlLabel: {
    '& .MuiTypography-root.MuiFormControlLabel-label': { fontSize: 14 },
  },
  textarea: {
    width: '100%',
    height: '100%',
    minHeight: '115px',
    maxHeight: '200px',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: 1.2,
    letterSpacing: '0%',
    color: theme.palette.common.black,
    verticalAlign: 'middle',
    flexShrink: 0,
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
    '&::-webkit-scrollbar-thumb:hover': {
      background: theme.palette.primary.dark,
    },
  },
  counter: {
    fontSize: '12px',
    textAlign: 'right',
    color: theme.palette.text.primary,
    marginTop: '5px',
    opacity: 0.7,
  },
  comment: {
    fontSize: 14,
    lineHeight: 1.2,
    textAlign: 'left',
    margin: '30px 0 10px',
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
})
