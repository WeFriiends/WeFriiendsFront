import * as React from 'react'
import { Typography, FormHelperText } from '@mui/material'
import RangeSliderDistance from './RangeSliderDistance'
import { useProfileStore } from '../../zustand/store'
import useBearerToken from '../../hooks/useBearToken'
import { useEffect, useRef, useState } from 'react'

const DistanceControl: React.FC = () => {
  const {
    data: profile,
    loading,
    updateProfile: updateProfileAction,
  } = useProfileStore()
  const token = useBearerToken()

  const [friendsDistance, setFriendsDistance] = useState<number>(0)
  const [noticeFriendsDistance, setNoticeFriendsDistance] = useState<
    string | null
  >(null)

  const timeoutSliderChange = useRef<NodeJS.Timeout | null>(null)

  const handleDistanceChange = (newFriendsDistance: number) => {
    setFriendsDistance(newFriendsDistance)
    setNoticeFriendsDistance('Updating...')

    if (timeoutSliderChange.current) {
      clearTimeout(timeoutSliderChange.current) // Очистка предыдущего таймера
    }

    timeoutSliderChange.current = setTimeout(async () => {
      console.log('Updating friendsDistance:', newFriendsDistance)

      if (!token) {
        setNoticeFriendsDistance(
          'Authentication error. Please try logging in again.'
        )
        return
      }

      try {
        const response = await updateProfileAction(
          { friendsDistance: newFriendsDistance },
          token
        )

        if (response.status === 200) {
          setNoticeFriendsDistance('Updated!')
        } else {
          setNoticeFriendsDistance(
            'Failed to update the distance. Please try again.'
          )
        }
      } catch (error) {
        console.error('Error updating distance:', error)
        setNoticeFriendsDistance('Failed to update. Network or server error.')
      }
    }, 1000)
  }

  useEffect(() => {
    if (profile?.friendsDistance !== undefined) {
      setFriendsDistance(profile.friendsDistance)
    }
  }, [profile])

  return (
    <>
      <RangeSliderDistance
        value={loading ? 0 : friendsDistance}
        onChange={handleDistanceChange}
      >
        <Typography variant="body2">
          Distance from location (100 km max)
        </Typography>
      </RangeSliderDistance>
      {noticeFriendsDistance && (
        <FormHelperText sx={{ textAlign: 'left' }} error={false}>
          {noticeFriendsDistance}
        </FormHelperText>
      )}
    </>
  )
}

export default DistanceControl
