import { useEffect, useState } from 'react'
import { Box, FormHelperText, IconButton, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { validateGender } from './utils/validateGender'

interface GenderProps {
  selectedGender: string | null
  showWithError: boolean
  onGenderChange: (value: string | null) => void
}

const Gender = ({
  selectedGender,
  showWithError = false,
  onGenderChange,
}: GenderProps) => {
  const { classes } = useStyles()
  const [hoveredGender, setHoveredGender] = useState<string | null>(null)

  const [error, setError] = useState<string | null>(null)

  const getImage = (gender: string) => {
    if (
      selectedGender === gender ||
      (hoveredGender === gender && selectedGender !== gender)
    ) {
      return `/img/firstProfile/${gender}_active.svg`
    }
    return `/img/firstProfile/${gender}.svg`
  }
  const genderPick = (gender: string) => {
    if (validateGender(gender)) {
      onGenderChange(gender)
    } else {
      setError('Please choose a gender.')
    }
  }

  useEffect(() => {
    if (showWithError) {
      setError('Please choose a gender.')
    }
  }, [showWithError, selectedGender])

  return (
    <>
      <Typography variant="h1" className={classes.title}>
        More about you
      </Typography>
      <Typography variant="body1" className={classes.description}>
        What is your gender?
      </Typography>

      <Box className={classes.containerPosition}>
        {['female', 'male'].map((gender) => (
          <Box key={gender} className={classes.innerContainerPosition}>
            <IconButton
              disableRipple
              className={classes.genderIcon}
              onClick={() => genderPick(gender)}
              onMouseEnter={() => setHoveredGender(gender)}
              onMouseLeave={() => setHoveredGender(null)}
            >
              <Box
                component="img"
                src={getImage(gender)}
                alt={`${gender} logo`}
              />
            </IconButton>
            <Typography className={classes.genderText}>{gender}</Typography>
          </Box>
        ))}
      </Box>
      <FormHelperText error={true}>{error}</FormHelperText>
    </>
  )
}

export default Gender

const useStyles = makeStyles()((theme) => ({
  title: {
    marginBottom: 60,
    padding: 0,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    lineHeight: 1.5,
    fontWeight: 500,
    marginBottom: 30,
    color: theme.palette.text.primary,
    textAlign: 'center',
  },
  genderText: {
    display: 'flex',
    justifyContent: 'center',
    color: '#3B4054',
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: '1.125rem',
    lineHeight: '150%',
    textTransform: 'capitalize',
  },
  containerPosition: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0 auto',
    gap: 24,
  },
  genderIcon: {
    padding: 0,
  },
  innerContainerPosition: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
}))
