import { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import type { Dayjs } from 'dayjs'
import { FormHelperText, Typography, Box } from '@mui/material'
import theme from 'styles/createTheme'
import { makeStyles } from 'tss-react/mui'
import { validateDob } from './utils/validateDob'

interface DateOfBirthPickerProps {
  dob: Dayjs | null
  showWithError: boolean
  onDobChange: (value: Dayjs | null) => void
}

const DateOfBirthPicker = ({
  dob,
  showWithError = false,
  onDobChange,
}: DateOfBirthPickerProps) => {
  const { classes } = useStyles()
  const [error, setError] = useState<string | null>(null)

  const onChangePicker = (newValue: Dayjs | null) => {
    // hide the error on start changing
    setError(null)

    if (newValue === null || !validateDob(newValue)) {
      setError('Invalid date. Please provide a valid date.')
    }
    onDobChange(newValue)
  }

  useEffect(() => {
    if (showWithError) {
      setError('Invalid date. Please provide a valid date.')
    }
  }, [showWithError])

  return (
    <>
      <Typography variant="h1" className={classes.title} pt={10}>
        {`Let's get started!`}
      </Typography>
      <Typography variant="body1" className={classes.description}>
        {"What's your date of birth?"}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box className={classes.dateWrapper}>
          <DatePicker
            className={classes.dateInput}
            value={dob}
            onChange={(newValue) => onChangePicker(newValue)}
          />
          {!error && (
            <FormHelperText>{`Please, note - you won’t be able to change this field later`}</FormHelperText>
          )}
          <FormHelperText error={true}>{error}</FormHelperText>
        </Box>
      </LocalizationProvider>
    </>
  )
}

export default DateOfBirthPicker

const useStyles = makeStyles()(() => ({
  title: {
    marginBottom: 60,
    padding: 0,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    lineHeight: 1.5,
    fontWeight: 500,
    marginBottom: 45,
    color: theme.palette.text.primary,
    textAlign: 'center',
  },
  dateWrapper: {
    maxWidth: 220,
    margin: '0 auto',
  },
  dateInput: {
    backgroundColor: '#FFF1EC',
    borderRadius: 10,
    paddingRight: '12px',
    '& .MuiInputBase-input.MuiOutlinedInput-input': {
      height: 60,
      padding: 0,
      textAlign: 'center',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 0,
    },
  },
}))
