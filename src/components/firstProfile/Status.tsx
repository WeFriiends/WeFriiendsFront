import { useEffect, useState } from 'react'
import { Typography, Box, FormHelperText } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from 'utils/localStorage'

const STATUSES: Array<string> = [
  'Looking for new friends',
  "I’m learning a new language. Let's talk!",
  "Let's be friends, I'm new in town",
  'I look for emotional support',
  'My plans are to move abroad',
  "I'm a new mom. Need some help",
  "Let's take the dogs for a walk",
]

type StatusProps = {
  isTitleShown?: boolean
  isFormHelperTextShown?: boolean
  formHelperText?: React.ReactNode
}
const Status: React.FC<StatusProps> = ({
  isTitleShown = true,
  isFormHelperTextShown = true,
  formHelperText,
}) => {
  const { classes } = useStyles()

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
    getItemFromLocalStorage('selectedStatuses') || []
  )

  useEffect(() => {
    setItemToLocalStorage('selectedStatuses', selectedStatuses)
  }, [selectedStatuses])

  const toggleStatus = (statusId: string) => {
    if (selectedStatuses.includes(statusId)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== statusId))
    } else if (selectedStatuses.length < 3) {
      setSelectedStatuses([...selectedStatuses, statusId])
    }
  }

  return (
    <>
      {isTitleShown && (
        <Typography variant="h1" className={classes.title}>
          What are you looking for?
        </Typography>
      )}
      {isFormHelperTextShown && (
        <FormHelperText>
          {formHelperText || (
            <>
              This will be your status. You can always change it
              <br />
              Please, choose 3 statuses maximum
            </>
          )}
        </FormHelperText>
      )}

      <Box className={classes.phraseWrapper}>
        {STATUSES.map((phrase) => (
          <Box
            key={phrase}
            className={`${classes.phrase} ${classes.text}`}
            onClick={() => toggleStatus(phrase)}
            sx={{
              backgroundColor: selectedStatuses.includes(phrase)
                ? '#FEDED2'
                : 'rgba(229, 229, 229, 0.40)',
            }}
          >
            {phrase}
          </Box>
        ))}
      </Box>
    </>
  )
}

export default Status

const useStyles = makeStyles()(() => {
  return {
    title: {
      padding: 0,
      textAlign: 'center',
      margin: '0 -50px',
      maxWidth: 'calc(100vw - 40px)',
    },
    phraseWrapper: {
      minHeight: 200,
      display: 'flex',
      justifyContent: 'start',
      gap: '15px 20px',
      flexWrap: 'wrap',
      marginTop: 50,
      marginBottom: 70,
    },
    phrase: {
      boxSizing: 'border-box',
      minHeight: 40,
      padding: '4px 18px',
      color: '#444',
      fontFamily: 'Inter',
      fontSize: 12,
      fontWeight: 400,
      borderRadius: 20,
      display: 'flex',
      alignItems: 'center',
      maxWidth: 190,
      transition: '0.5s',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#FEDED2',
      },
      // todo: find the rule with designer and implement it for all children, repeat
      '&:nth-of-type(1)': { maxWidth: 103 },
      '&:nth-of-type(2)': { maxWidth: 152 },
      '&:nth-of-type(3)': { maxWidth: 135 },
      '&:nth-of-type(4)': { maxWidth: 190 },
      '&:nth-of-type(5)': { maxWidth: 130 },
      '&:nth-of-type(6)': { maxWidth: 140 },
      '&:nth-of-type(7)': { maxWidth: 210 },
    },
    text: {
      fontSize: 12,
    },
  }
})
