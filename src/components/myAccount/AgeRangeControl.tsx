import * as React from 'react'
import { Box, Typography, FormHelperText } from '@mui/material'
import RangeSlider from './RangeSlider'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'
import { useProfileStore } from '../../zustand/store'
import useBearerToken from '../../hooks/useBearToken'
import { useEffect, useRef, useState } from 'react'

const minAgeDiff = 1
const ageRangeMin = 18
const ageRangeMax = 65

const AgeRangeControl = () => {
  const { classes } = useStyles()
  const {
    data: profile,
    loading,
    updateProfile: updateProfileAction,
  } = useProfileStore()
  const token = useBearerToken()

  const [ageRange, setAgeRange] = useState<number[]>([ageRangeMin, ageRangeMax])
  const [noticeAgeRange, setNoticeAgeRange] = useState<string | null>(null)
  const [errorAgeRange, setErrorAgeRange] = useState<string | null>(null)

  const timeoutSliderChange = useRef<NodeJS.Timeout | null>(null)

  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) return

    const updatedAgeRange = [...newValue]

    if (activeThumb === 0) {
      updatedAgeRange[0] = Math.min(newValue[0], ageRange[1] - minAgeDiff)
    } else {
      updatedAgeRange[1] = Math.max(newValue[1], ageRange[0] + minAgeDiff)
    }

    setAgeRange(updatedAgeRange)
    setNoticeAgeRange('Loading...')

    if (timeoutSliderChange.current) {
      clearTimeout(timeoutSliderChange.current)
    }

    timeoutSliderChange.current = setTimeout(async () => {
      if (!token) {
        setErrorAgeRange('Authentication error. Please try logging in again.')
        return
      }

      try {
        const response = await updateProfileAction(
          {
            friendsAgeMin: updatedAgeRange[0],
            friendsAgeMax: updatedAgeRange[1],
          },
          token
        )

        if (response.status === 200) {
          setNoticeAgeRange(null)
        } else {
          setErrorAgeRange('Failed to update. Please try again.')
        }
      } catch (error) {
        console.error('Error updating age range:', error)
        setErrorAgeRange('Failed to update. Network or server error.')
      }
    }, 1000)
  }

  useEffect(() => {
    if (
      profile?.friendsAgeMin !== undefined &&
      profile?.friendsAgeMax !== undefined
    ) {
      setAgeRange([profile.friendsAgeMin, profile.friendsAgeMax])
    }
  }, [profile])

  return (
    <>
      <Typography
        variant="h2"
        className={`${classes.subtitle} ${classes.noBottomMargin}`}
      >
        Age range
        <Box component="span" className={classes.settingsAgeRange}>
          {(loading || noticeAgeRange) && <> Loading...</>}
        </Box>
        <Box component="span" className={classes.settingsAgeRange}>
          {ageRange[0]}&ndash;{ageRange[1]}
        </Box>
      </Typography>
      <RangeSlider
        disableSwap
        value={ageRange}
        onChange={handleSliderChange}
        min={ageRangeMin}
        max={ageRangeMax}
        valueLabelDisplay="auto"
      />
      {errorAgeRange && (
        <FormHelperText error={true} sx={{ textAlign: 'left' }}>
          {errorAgeRange}
        </FormHelperText>
      )}
    </>
  )
}

export default AgeRangeControl

const useStyles = makeStyles()({
  subtitle: {
    fontSize: 16,
    lineHeight: '22px',
    marginTop: 15,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between',
  },
  noBottomMargin: {
    marginBottom: 0,
  },
  settingsAgeRange: {
    float: 'right',
    fontSize: 14,
    color: theme.palette.text.primary,
  },
})
