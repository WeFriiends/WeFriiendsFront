import * as React from 'react'
import { Box, Grid, Typography, FormHelperText } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'
import AgeRangeControl from './AgeRangeControl'
import DistanceControl from './DistanceControl'
import { useProfileStore } from '../../zustand/store'
import LocationInputAutocomplete from '../firstProfile/location/LocationAutocomplete'
import { Address } from '../firstProfile/profile'
import { useEffect, useState } from 'react'
import HelpAndSupport from './HelpAndSupport'
import MyProfile from './MyProfile'
import useBearerToken from '../../hooks/useBearToken'
import { getResolvedAddress } from '../firstProfile/utils/getResolvedAddress'

const MyAccount: React.FC = () => {
  const { classes } = useStyles()
  const {
    data: profile,
    loading,
    updateProfile: updateProfileAction,
  } = useProfileStore()
  const [friendsDistance, setFriendsDistance] = useState<number>(
    profile?.friendsDistance || 20
  )
  const [errorLocation, setErrorLocation] = useState<string | null>(null)
  const [noticeLocation, setNoticeLocation] = useState<string | null>(
    'To change your address, type a street name along with the house number, then wait for suggestions.'
  )
  const [noticeFriendsDistance, setNoticeFriendsDistance] = useState<
    string | null
  >('')
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
  const timeoutSliderChange = React.useRef<NodeJS.Timeout | null>(null)

  const handleDistanceChange = async (newFriendsDistance: number) => {
    setNoticeFriendsDistance('Updating...')
    setFriendsDistance(newFriendsDistance)

    if (timeoutSliderChange.current) {
      clearTimeout(timeoutSliderChange.current) // Clear previous timeout
    }

    timeoutSliderChange.current = setTimeout(async () => {
      console.log('change') // Only logs the last change after 3 seconds
      if (token) {
        try {
          const response = await updateProfileAction(
            { friendsDistance: newFriendsDistance },
            token
          )

          if (response.status === 200) {
            setNoticeLocation('Updated!')
          } else {
            setErrorLocation('Failed to update the distance. Please try again.')
          }
        } catch (error) {
          console.error('Error updating distance:', error)
        }
      }
    }, 1000)
  }

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
    <Grid container spacing={3}>
      <Grid item xs={12} className={classes.twoColumnLayoutWrapper}>
        <Box className={classes.twoColumnLayoutColLeft}>
          <Typography variant="h1" className={classes.title}>
            My account
          </Typography>
          <Box className={classes.settingsDescription}>
            <Typography variant="h2" className={classes.subtitle}>
              Settings
            </Typography>
            <Typography variant="body2" className={classes.description}>
              Indicate what is important to you <br />
              and we will show you the best options.
            </Typography>
          </Box>
          <Box className={classes.settingsItem}>
            <Typography variant="h2" className={classes.subtitle}>
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
            <br />
            <br />

            <DistanceControl
              value={friendsDistance}
              onChange={handleDistanceChange}
            >
              <Typography variant="body2" className={classes.descriptionSlider}>
                Distance from location (100 km max)
              </Typography>
            </DistanceControl>
            {noticeFriendsDistance && (
              <FormHelperText sx={{ textAlign: 'left' }} error={false}>
                {noticeFriendsDistance}
              </FormHelperText>
            )}
          </Box>
          <Box className={classes.settingsItem}>
            <AgeRangeControl />
          </Box>
          <HelpAndSupport />
        </Box>
        <Box className={classes.twoColumnLayoutColRight}>
          <MyProfile />
        </Box>
      </Grid>
    </Grid>
  )
}

export default MyAccount

const useStyles = makeStyles()({
  twoColumnLayoutWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
    paddingBottom: 100,
    [theme.breakpoints.up(850)]: {
      alignItems: 'start',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    [theme.breakpoints.up('lg')]: {
      paddingBottom: 0,
    },
  },
  twoColumnLayoutColLeft: {
    width: 350,
    marginBottom: 50,
    maxWidth: '100%',
    [theme.breakpoints.up(850)]: {
      width: 350,
    },
  },
  twoColumnLayoutColRight: {
    width: 450,
    maxWidth: '100%',
    overflow: 'auto',
    [theme.breakpoints.up(850)]: {
      width: 450,
    },
  },

  title: {
    paddingTop: 60,
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 600,
    [theme.breakpoints.up('lg')]: {
      paddingTop: 0,
      paddingBottom: 20,
      textAlign: 'left',
      fontSize: 24,
      fontWeight: 500,
    },
  },
  subtitle: {
    fontSize: 16,
    lineHeight: '22px',
    marginTop: 15,
    marginBottom: 20,
  },
  noBottomMargin: {
    marginBottom: 0,
  },
  description: {
    lineHeight: 1.3,
    marginBottom: 30,
  },
  descriptionSlider: {
    lineHeight: 1.3,
  },
  settingsDescription: {
    marginBottom: 50,
  },
  settingsItem: {
    marginBottom: 30,
  },
})
