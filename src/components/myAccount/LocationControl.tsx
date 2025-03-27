import * as React from 'react'
import { Typography, FormHelperText } from '@mui/material'
import LocationInputAutocomplete from '../firstProfile/location/LocationAutocomplete'
import { useProfileStore } from '../../zustand/store'
import useBearerToken from '../../hooks/useBearToken'
import { getResolvedAddress } from '../firstProfile/utils/getResolvedAddress'
import { useEffect, useState } from 'react'
import { Address } from '../firstProfile/profile'
import { makeStyles } from 'tss-react/mui'

const LocationControl: React.FC = () => {
  const { classes } = useStyles()
  const {
    data: profile,
    loading,
    updateProfile: updateProfileAction,
  } = useProfileStore()

  const [errorLocation, setErrorLocation] = React.useState<string | null>(null)
  const [noticeLocation, setNoticeLocation] = React.useState<string | null>(
    'To change your address, type a street name along with the house number, then wait for suggestions.'
  )

  const [, setAddress] = useState<Address | null>(null)
  const token = useBearerToken()

  useEffect(() => {
    if (profile?.location) {
      setAddress({
        country: profile.location.country || '',
        city: profile.location.city || '',
        street: profile.location.street || '',
        houseNumber: profile.location.houseNumber || '',
        lat: profile.location.lat || 0,
        lng: profile.location.lng || 0,
      })
    }
  }, [profile])

  const handleGetManualAddress = async (value: any) => {
    // Assume `value` is the selected address object (e.g., from LocationInputAutocomplete)

    const resolvedAddress = getResolvedAddress(value)

    if (resolvedAddress) {
      // Обновляем адрес на сервере
      setErrorLocation('Changing...')
      if (token) {
        try {
          const response = await updateProfileAction(
            {
              location: {
                lat: resolvedAddress.lat,
                lng: resolvedAddress.lng,
                country: resolvedAddress.country,
                city: resolvedAddress.city,
                street: resolvedAddress.street,
                houseNumber: resolvedAddress.houseNumber,
              },
            },
            token
          )

          if (response.status === 200) {
            setErrorLocation('')
            setNoticeLocation('The address has been successfully changed.')
          } else {
            setErrorLocation('Failed to update address. Please try again.')
          }
        } catch (err) {
          console.error('Error updating address:', err)
          setErrorLocation('Failed to update address.')
        }
      } else {
        console.error('Token is not available.')
        setErrorLocation('Authentication error. Please try logging in again.')
      }
    } else {
      setErrorLocation(
        'Invalid location data, accuracy up to house number is needed.'
      )
    }
  }

  const handleLocationChanged = () => {
    setErrorLocation('')
    setNoticeLocation('')
  }

  return (
    <>
      <Typography
        variant="h2"
        className={`${classes.subtitle} ${classes.noBottomMargin}`}
      >
        Location
      </Typography>
      <LocationInputAutocomplete
        onLocationSelected={handleGetManualAddress}
        onLocationChanged={handleLocationChanged}
        defaultValue={
          loading
            ? 'Loading...'
            : `${profile?.location.country || ''}, ${
                profile?.location.city || ''
              }, ${profile?.location.street || ''}${
                profile?.location.houseNumber
                  ? `, ${profile.location.houseNumber}`
                  : ''
              }`
        }
      />
      <FormHelperText sx={{ textAlign: 'left' }} error={true}>
        {errorLocation}
      </FormHelperText>
      <FormHelperText sx={{ textAlign: 'left' }} error={false}>
        {noticeLocation}
      </FormHelperText>
    </>
  )
}

export default LocationControl

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
})
