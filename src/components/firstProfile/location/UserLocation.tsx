import { useState } from 'react'
import {
  getItemFromSessionStorage,
  setItemToSessionStorage,
} from 'utils/sessionStorage'
import { REGISTRATION_STORAGE_KEYS } from '../storageKeys'
import { Box, FormHelperText, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import LocationInputAutocomplete from './LocationAutocomplete'
import { Location } from 'types/FirstProfile'
import { getResolvedAddress } from '../utils/getResolvedAddress'

// todo: Check with PM the behaviour:
// when the location is already saved in Local Storage, and then we choose another one,
// and it's not valid, the button Next is still working and the last valid location is applied.
// It can be fixed after MVP (Olga Zavizonnaia)
// todo: refactoring?

interface UserLocationProps {
  onLocationChange: (location: Location) => void
}

// MVP-1: automatic geolocation is disabled, so the browser permission prompt
// is never requested. The user always enters the location manually.
// To restore, see git history

const UserLocation = ({ onLocationChange }: UserLocationProps) => {
  const { classes } = useStyles()
  const [address, setAddress] = useState<Location | null>(() => {
    const country = getItemFromSessionStorage<string>(
      REGISTRATION_STORAGE_KEYS.country
    )
    if (!country) return null
    return {
      country,
      city:
        getItemFromSessionStorage<string>(REGISTRATION_STORAGE_KEYS.city) || '',
      street:
        getItemFromSessionStorage<string>(REGISTRATION_STORAGE_KEYS.street) ||
        '',
      houseNumber:
        getItemFromSessionStorage<string>(
          REGISTRATION_STORAGE_KEYS.houseNumber
        ) || '',
      lat: getItemFromSessionStorage<number>(REGISTRATION_STORAGE_KEYS.lat)!,
      lng: getItemFromSessionStorage<number>(REGISTRATION_STORAGE_KEYS.lng)!,
    }
  })
  const [errorLocation, setErrorLocation] = useState<string | null>(null)
  const [noticeLocation, setNoticeLocation] = useState<string | null>(
    'To change your address, type a street name along with the house number, then wait for suggestions.'
  )

  const handleGetManualAddress = (value: any) => {
    // Assume `value` is the selected address object (e.g., from LocationInputAutocomplete)
    const resolvedAddress = getResolvedAddress(value)
    if (resolvedAddress) {
      setAddress(resolvedAddress) // Update the state with the selected address
      onLocationChange(resolvedAddress) // Call the onLocationChange callback to notify parent component
      setErrorLocation(null)
    } else {
      onLocationChange({
        country: '',
        city: '',
        street: '',
        houseNumber: '',
        lat: 0,
        lng: 0,
      })

      setItemToSessionStorage(REGISTRATION_STORAGE_KEYS.country, '')
      setItemToSessionStorage(REGISTRATION_STORAGE_KEYS.city, '')
      setItemToSessionStorage(REGISTRATION_STORAGE_KEYS.street, '')
      setItemToSessionStorage(REGISTRATION_STORAGE_KEYS.houseNumber, '')
      setItemToSessionStorage(REGISTRATION_STORAGE_KEYS.lat, '')
      setItemToSessionStorage(REGISTRATION_STORAGE_KEYS.lng, '')

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
    <Box>
      <FormHelperText className={classes.helperText}>
        Please, note! This location will be used as a permanent one
      </FormHelperText>

      <Typography variant="h1" className={classes.headingText}>
        Select your location
      </Typography>

      <LocationInputAutocomplete
        onLocationSelected={handleGetManualAddress}
        onLocationChanged={handleLocationChanged}
        defaultValue={
          address?.country
            ? `${address?.country}, ${address?.city}, ${address?.street}${
                address?.houseNumber ? `, ${address.houseNumber}` : ''
              }`
            : 'Search location'
        }
      />

      <FormHelperText error={true}>{errorLocation}</FormHelperText>
      <FormHelperText error={false}>{noticeLocation}</FormHelperText>
    </Box>
  )
}

export default UserLocation

const useStyles = makeStyles()((theme) => ({
  messageText: {
    fontSize: 12,
    lineHeight: '22px',
    color: '#1D878C',
  },
  headingText: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '27px',
    color: theme.palette.text.primary,
    textAlign: 'center',
  },
  helperText: {
    marginTop: 0,
    marginBottom: 30,
  },
  text: {
    fontSize: 12,
  },
}))
