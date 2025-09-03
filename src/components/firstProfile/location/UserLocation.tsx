import React, { useState, useEffect } from 'react'
import { reverseGeocode } from '../../../actions/geocoding'
import { useGeolocation } from '@uidotdev/usehooks'
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from 'utils/localStorage'
import { Box, FormHelperText, Icon, Typography } from '@mui/material'
import Loader from 'common/svg/Loader'
import { makeStyles } from 'tss-react/mui'
import { validateLocation } from '../utils/validateLocation'
import LocationInputAutocomplete from './LocationAutocomplete'
import { Location } from 'types/FirstProfile'
import { getResolvedAddress } from '../utils/getResolvedAddress'

// todo: Check with PM the behaviour:
// when the location is already saved in Local Storage, and then we choose another one,
// and it's not valid, the button Next is still working and the last valid location is applied.
// It can be fixed after MVP (Olga Zavizonnaia)
// todo: refactoring?

export const checkGeolocationPermission = async () => {
  if (!navigator.permissions) {
    return 'unsupported'
  }

  try {
    const result = await navigator.permissions.query({ name: 'geolocation' })
    return result.state // 'granted', 'denied', or 'prompt'
  } catch (error) {
    console.error('Error checking geolocation permission:', error)
    return 'error'
  }
}

interface UserLocationProps {
  onLocationChange: (location: Location) => void
}

const UserLocation = ({ onLocationChange }: UserLocationProps) => {
  const { classes } = useStyles()
  const { latitude, longitude, error } = useGeolocation()
  const [address, setAddress] = useState<Location | null>({
    country: getItemFromLocalStorage('country'),
    city: getItemFromLocalStorage('city'),
    street: getItemFromLocalStorage('street'),
    houseNumber: getItemFromLocalStorage('houseNumber'),
    lat: getItemFromLocalStorage('lat'),
    lng: getItemFromLocalStorage('lng'),
  })
  const [showManualInput, setShowManualInput] = useState(false)
  const [errorLocation, setErrorLocation] = useState<string | null>(null)
  const [noticeLocation, setNoticeLocation] = useState<string | null>(
    'To change your address, type a street name along with the house number, then wait for suggestions.'
  )
  const [loading, setLoading] = useState(true)

  // Проверяем разрешение геолокации
  useEffect(() => {
    const checkPermission = async () => {
      const permissionState = await checkGeolocationPermission()
      if (permissionState === 'denied' || error) {
        setShowManualInput(true) // Показываем ручной ввод при отказе или ошибке
      } else {
        setShowManualInput(false) // Используем автоматическую геолокацию
      }
    }
    checkPermission()
  }, [error])

  // Получаем адрес с геолокации
  useEffect(() => {
    if (latitude && longitude && !showManualInput) {
      //setAddress({ lat: latitude, lng: longitude })
      const fetchAddress = async () => {
        try {
          const response = await reverseGeocode(latitude, longitude)
          const { country, city, town, village, road, house_number } =
            response.address

          const resolvedAddress: Location = {
            lat: latitude,
            lng: longitude,
            country: country || '',
            city: city || town || village || '',
            street: road || '',
            houseNumber: house_number || '',
          }

          // Validate the address before saving
          if (validateLocation(resolvedAddress)) {
            setAddress(resolvedAddress) // Update the state with the selected address
            onLocationChange(resolvedAddress) // Call the onLocationChange callback to notify parent component
            setErrorLocation(null)
          } else {
            setErrorLocation('Invalid location data: ' + resolvedAddress)
          }
        } catch (err) {
          console.error('Error fetching address:', err)
          setErrorLocation('Error fetching address: ' + err)
        } finally {
          setLoading(false) // Stop loading once address is resolved
        }
      }
      fetchAddress()
    }
  }, [latitude, longitude, showManualInput, onLocationChange])

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

      setItemToLocalStorage('country', '')
      setItemToLocalStorage('city', '')
      setItemToLocalStorage('street', '')
      setItemToLocalStorage('houseNumber', '')
      setItemToLocalStorage('lat', '')
      setItemToLocalStorage('lng', '')

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
      {loading && !showManualInput && (
        <Box className={classes.loaderWrapper}>
          <Loader />
        </Box>
      )}
      {showManualInput && (
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
        </Box>
      )}
      {!showManualInput && address && !loading && (
        <>
          <Box className={classes.textAddress}>
            <Icon>
              <img src="/img/icon-search.svg" alt="Close" />
            </Icon>
            {`${address.country}, ${address.city}, ${address.street}, ${address.houseNumber}`}
          </Box>
        </>
      )}
      <FormHelperText error={true}>{errorLocation}</FormHelperText>
      <FormHelperText error={false}>{noticeLocation}</FormHelperText>
    </Box>
  )
}

export default UserLocation

const useStyles = makeStyles()((theme) => ({
  loaderWrapper: {
    position: 'relative',
    width: 'auto',
    height: 100,
  },
  textAddress: {
    display: 'flex',
    gap: 12,
    borderBottom: '2px solid #C5C5C5',
    paddingBottom: 10,
    color: theme.customPalette.colorActiveGrey,
  },
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
