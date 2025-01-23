import * as React from 'react'
import {
  Box,
  Grid,
  Icon,
  Typography,
  TextField,
  Autocomplete,
  Link,
  Button,
  FormHelperText,
} from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'
import IconNewTab from '../../common/svg/IconNewTab'
import AgeRangeControl from './AgeRangeControl'
import DistanceControl from './DistanceControl'
import { useAuth0 } from '@auth0/auth0-react'
import PhotoCarousel from 'components/userProfile/PhotoCarousel'
import Interests from 'components/firstProfile/interests/Interests'
import PrimaryButton from 'common/components/PrimaryButton'
import UploadPhotos from 'components/firstProfile/uploadPhotos/UploadPhotos'
import useProfileData from '../../hooks/useProfileData'
import LocationInputAutocomplete from '../firstProfile/location/LocationAutocomplete'
import { Address } from '../firstProfile/profile'
import { validateLocation } from '../firstProfile/utils/validateLocation'
import { useEffect, useState } from 'react'
import { getItemFromLocalStorage } from '../../utils/localStorage'
import { useNavigate } from 'react-router-dom'

const MyAccount: React.FC = () => {
  const { classes } = useStyles()
  const { logout } = useAuth0()
  const { profile, loading, error } = useProfileData()
  const [errorForm, setFormError] = useState<string | null>(null)
  const [address, setAddress] = useState<Address | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (profile?.location) {
      setAddress({
        country: profile.location.country || '',
        city: profile.location.city || '',
        street: profile.location.street || '',
        houseNumber: profile.location.city || '',
        lat: profile.location.lat || 0,
        lng: profile.location.lng || 0,
      })
    }
  }, [profile])

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin, // Redirects to home after logout
      },
    })
  }

  const locationNamesTempList = [
    { label: 'New York' },
    { label: 'Seoul' },
    { label: 'Istanbul' },
    { label: 'Beijing' },
    { label: 'São Paulo' },
    { label: 'Buenos Aires' },
    { label: 'Tokyo' },
  ]
  const userPhoto = [
    { src: '/img/photo_Elena.jpg' },
    { src: '/img/photo_Elena_2.jpg' },
    { src: '/img/photo_Elena_3.jpg' },
  ]
  const [isEditing, setIsEditing] = React.useState(false)
  const handleEditClick = () => {
    setIsEditing(true)
  }
  const handleSaveClick = () => {
    setIsEditing(false)
  }

  const handleGetManualAddress = (value: any) => {
    // Assume `value` is the selected address object (e.g., from LocationInputAutocomplete)
    const resolvedAddress: Address = {
      country: value.addressDetails.country || '',
      city: value.addressDetails.city || '',
      street: value.addressDetails.road || '',
      houseNumber: value.addressDetails.house_number || '',
      lat: value.latitude || 0,
      lng: value.longitude || 0,
    }

    console.log(resolvedAddress)
    //
    // if (validateLocation(resolvedAddress)) {
    //   setAddress(resolvedAddress) // Update the state with the selected address
    //   onLocationChange(resolvedAddress) // Call the onLocationChange callback to notify parent component
    //   setFormError(null)
    // } else {
    //   setFormError(
    //       'Invalid location data, accuracy up to house number is needed.'
    //   )
    // }
  }

  return (
    <Grid container spacing={3}>
      <Button
        variant="text"
        onClick={() => navigate('/account')}
        sx={{ textDecoration: 'none', color: '#007bff' }}
      >
        Change account
      </Button>
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
              onLocationChange={handleGetManualAddress}
            />
            <FormHelperText error={true}>{errorForm}</FormHelperText>
            <br />
            <br />
            <br />
            {`${profile?.location.country}, ${profile?.location.city}, ${profile?.location.street}`}
            {profile?.location.houseNumber} &&{' '}
            {`, ${profile?.location.houseNumber}`}
            <Box className={classes.btnLocation}>
              <Autocomplete
                className={classes.inputLocation}
                disablePortal
                id="location"
                options={locationNamesTempList}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="" />}
              />
              <Icon>
                <img
                  className={classes.btnLocationIcon}
                  src="/img/icon-location-arrow.svg"
                  alt="Change location"
                />
              </Icon>
            </Box>
            <DistanceControl>
              <Typography variant="body2" className={classes.descriptionSlider}>
                Distance from location (100 km max)
              </Typography>
            </DistanceControl>
          </Box>
          <Box className={classes.settingsItem}>
            <AgeRangeControl />
          </Box>
          <Typography variant="h1" className={classes.helpTitle}>
            Help & support
          </Typography>
          <hr className={classes.separator} />
          <Typography variant="h2" className={classes.subtitle}>
            Security tips
          </Typography>
          <Typography variant="body2" className={classes.description}>
            <Link
              className={classes.linkGrey}
              href="https://wefriiends.com/documents/privacy.html"
              target="_blank"
              rel="noopener"
            >
              Rules of community
              <IconNewTab />
            </Link>
            <Link
              className={classes.linkGrey}
              href="https://wefriiends.com/documents/privacy.html"
              target="_blank"
              rel="noopener"
            >
              Security tips
              <IconNewTab />
            </Link>
          </Typography>
          <hr className={classes.separator} />
          <Typography variant="h2" className={classes.subtitle}>
            Legal data
          </Typography>
          <Typography variant="body2" className={classes.description}>
            <Link
              className={classes.linkGrey}
              href="https://wefriiends.com/documents/privacy.html"
              target="_blank"
              rel="noopener"
            >
              Privacy settings
              <IconNewTab />
            </Link>
            <Link
              className={classes.linkGrey}
              href="https://wefriiends.com/documents/privacy.html"
              target="_blank"
              rel="noopener"
            >
              Cookies
              <IconNewTab />
            </Link>
            <Link
              className={classes.linkGrey}
              href="https://wefriiends.com/documents/privacy.html"
              target="_blank"
              rel="noopener"
            >
              Privacy policy
              <IconNewTab />
            </Link>
            <Link
              className={classes.linkGrey}
              href="https://wefriiends.com/documents/privacy.html"
              target="_blank"
              rel="noopener"
            >
              Terms of use
              <IconNewTab />
            </Link>
          </Typography>
          <hr className={classes.separator} />
          <Link
            className={classes.linkOrange}
            href="https://wefriiends.com/documents/privacy.html"
            target="_blank"
            rel="noopener"
          >
            Share WeFriiends
          </Link>
          <hr className={classes.separator} />
          <Button
            variant="text"
            onClick={handleLogout}
            className={classes.linkOrange}
          >
            Log out
          </Button>
          <hr className={classes.separator} />
          <Link
            className={classes.linkOrange}
            href="https://wefriiends.com/documents/privacy.html"
            target="_blank"
            rel="noopener"
          >
            Delete account
          </Link>
          <hr className={classes.separator} />
          <Typography variant="body2" className={classes.version}>
            version 2.33
          </Typography>
        </Box>
        <Box className={classes.twoColumnLayoutColRight}>
          <Typography variant="h1" className={classes.title}>
            My profile
          </Typography>
          <PhotoCarousel items={userPhoto} />
          {isEditing ? (
            <>
              <UploadPhotos />
              <Box className={classes.interests}>
                <Interests isAboutMeShown={true} />
              </Box>
              <Box className={classes.buttonContainer}>
                <PrimaryButton label="Save" onClickHandler={handleSaveClick} />
              </Box>
            </>
          ) : (
            <Box className={classes.buttonContainer}>
              <PrimaryButton
                label="Change Profile"
                onClickHandler={handleEditClick}
              />
            </Box>
          )}
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
  helpTitle: {
    fontSize: 20,
    fontWeight: 500,
    lineHeight: '20px',
    marginTop: 200,
    paddingBottom: 20,
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
  btnLocation: {
    height: 34,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.common.white,
    boxShadow: '0 0 7px 1px rgba(217, 217, 217, 0.5)',
    borderRadius: 8,
    fontWeight: 500,
    fontSize: 12,
    marginBottom: 20,
    paddingRight: 10,
    color: theme.palette.common.black,
    textTransform: 'none',
    '& .MuiInputBase-root.MuiAutocomplete-inputRoot': {
      padding: 0,
    },
    '& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment': {
      display: 'none',
    },
    '& .MuiInputBase-input.MuiOutlinedInput-input': {
      padding: '8.5px 15px',
      fontWeight: 500,
      fontSize: 12,
      color: theme.palette.common.black,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent',
    },
    '& .MuiAutocomplete-hasPopupIcon .MuiOutlinedInput-root': {
      padding: 0,
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
      {
        border: 0,
      },
  },
  btnLocationIcon: {
    width: 15,
    height: 14,
    margin: '5px 0',
  },
  inputLocation: {
    border: 0,
  },
  separator: {
    height: 1.5,
    lineHeight: 0,
    border: 0,
    backgroundColor: theme.customPalette.colorInputGrey,
    marginBottom: 25,
  },
  linkGrey: {
    fontSize: 16,
    lineHeight: '22px',
    color: theme.customPalette.colorActiveGrey,
    textDecoration: 'none',
    display: 'flex',
    maxWidth: '190px',
    justifyContent: 'space-between',
    marginBottom: 5,
    '&:hover': {
      fontWeight: 600,
      '& svg path': {
        fill: theme.palette.primary.main,
      },
    },
  },
  linkOrange: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '20px',
    color: theme.palette.primary.dark,
    textDecoration: 'none',
    margin: '15px 0 20px',
    display: 'block',
    padding: 0,
    textTransform: 'none',
  },
  version: {
    fontSize: 14,
    lineHeight: '22px',
    color: theme.customPalette.colorActiveGrey,
  },
  interests: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: 60,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
})
