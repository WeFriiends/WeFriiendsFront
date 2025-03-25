import React from 'react'
import GenericCarousel from '../../common/components/Carousel'
import useHandleCarousel from 'hooks/useHandleCarousel'
import NameInput from './name/NameInput'
import DateOfBirthPicker from './DateOfBirthPicker'
import PrimaryButton from 'common/components/PrimaryButton'
import { createProfile } from 'actions/profile'
import useBearerToken from 'hooks/useBearToken'
import { useNavigate } from 'react-router-dom'
import GenderPick from './GenderPick'
import ArrowBackButton from 'common/components/ArrowBackButton'
import Status from './Status'
import UserLocation from './location/UserLocation'
import Interests from './interests/Interests'
import UploadPhotos from 'components/firstProfile/uploadPhotos/UploadPhotos'
import MobileStepper from '@mui/material/MobileStepper'
import { makeStyles } from 'tss-react/mui'
import { useCallback, useState } from 'react'
import { validateName } from './utils/validateName'
import { validateDob } from './utils/validateDob'
import { validateGender } from './utils/validateGender'
import {
  setItemToLocalStorage,
  getItemFromLocalStorage,
  getItemsFromLocalStorage,
} from 'utils/localStorage'
import { Dayjs } from 'dayjs'
import { validateLocation } from './utils/validateLocation'
import { Address } from './profile'

// todo: check the connection with WeFriiendsProfile and show the error before allowing to fill out the form.
// todo: check if the user is already filled the first profile and show the error.

const ProfileCarousel = () => {
  //const photos = useProfileStore((state) => state.data.photos)
  const { classes } = useStyles()
  const token = useBearerToken()
  const {
    activeStep,
    handleBack,
    handleNext: proceedToNextStep,
  } = useHandleCarousel()
  const [showNameWithError, setShowNameWithError] = useState(false)
  const [showDobWithError, setShowDobWithError] = useState(false)
  const [showGenderWithError, setShowGenderWithError] = useState(false)
  const [isPhotoSubmitted, setIsPhotoSubmitted] = useState(false)
  const [isSubmitClicked, setIsSubmitClicked] = useState(false)
  const [hasAboutMeError, setHasAboutMeError] = useState(false)

  const [nameChange, setNameChange] = useState(getItemFromLocalStorage('name'))
  const [dobChange, setDobChange] = useState(getItemFromLocalStorage('dob'))
  const [genderChange, setGenderChange] = useState(
    getItemFromLocalStorage('gender')
  )
  const [locationChange, setLocationChange] = useState(() => ({
    country: getItemFromLocalStorage('country') || '',
    city: getItemFromLocalStorage('city') || '',
    street: getItemFromLocalStorage('street') || '',
    houseNumber: getItemFromLocalStorage('houseNumber') || '',
    lat: getItemFromLocalStorage('lat') || null,
    lng: getItemFromLocalStorage('lng') || null,
  }))

  const handleNameChange = (value: string) => {
    setNameChange(value)
  }

  const handleDobChange = (value: Dayjs | null) => {
    setDobChange(value)
  }

  const handleGenderChange = (value: string | null) => {
    setGenderChange(value)
  }

  const handleLocationChange = useCallback((value: Address) => {
    setLocationChange(value)
  }, [])

  const handleNext = () => {
    if (activeStep === 0) {
      // Name
      if (validateName(nameChange)) {
        setItemToLocalStorage('name', nameChange)
        setShowNameWithError(false)
        proceedToNextStep()
      } else {
        setShowNameWithError(true)
        return
      }
    } else if (activeStep === 1) {
      // DOB
      if (validateDob(dobChange)) {
        setItemToLocalStorage('dob', dobChange)
        setShowDobWithError(false)
        proceedToNextStep()
      } else {
        setShowDobWithError(true)
        return
      }
    } else if (activeStep === 2) {
      // Gender
      if (validateGender(genderChange)) {
        setItemToLocalStorage('gender', genderChange)
        setShowGenderWithError(false)
        proceedToNextStep()
      } else {
        setShowGenderWithError(true)
        return
      }
    } else if (activeStep === 3) {
      // Location
      if (validateLocation(locationChange)) {
        setItemToLocalStorage('country', locationChange.country)
        setItemToLocalStorage('city', locationChange.city)
        setItemToLocalStorage('street', locationChange.street)
        setItemToLocalStorage('houseNumber', locationChange.houseNumber)
        setItemToLocalStorage('lat', locationChange.lat)
        setItemToLocalStorage('lng', locationChange.lng)
        proceedToNextStep()
      } else {
        return
      }
    } else if (activeStep === 4) {
      // Statuses looking for
      proceedToNextStep()
    } else if (activeStep === 5) {
      // Lifestyle and About me
      if (!hasAboutMeError) {
        proceedToNextStep()
      }
    } else if (activeStep === 6) {
      // Photo
      proceedToNextStep()
    }
  }

  interface UserPicsType {
    id: string
    url: string | null
  }

  const [photos, setPhotos] = useState<UserPicsType[]>([])
  const handlePicChange = (photos: UserPicsType[]) => {
    setPhotos(photos)
  }

  const carouselData = [
    {
      component: (
        <NameInput
          onNameChange={handleNameChange}
          showWithError={showNameWithError}
        />
      ),
      label: 'nameInput',
    },
    {
      component: (
        <DateOfBirthPicker
          onDobChange={handleDobChange}
          showWithError={showDobWithError}
        />
      ),
      label: 'dateOfBirthPicker',
    },
    {
      component: (
        <GenderPick
          onGenderChange={handleGenderChange}
          showWithError={showGenderWithError}
        />
      ),
      label: 'genderPick',
    },
    {
      component: <UserLocation onLocationChange={handleLocationChange} />,
      label: 'userLocation',
    },
    {
      component: <Status />,
      label: 'status',
    },
    {
      component: (
        <Interests
          hasAboutMeError={hasAboutMeError}
          setHasAboutMeError={setHasAboutMeError}
        />
      ),
      label: 'interests',
    },
    {
      component: (
        <UploadPhotos
          isPhotoSubmitted={isPhotoSubmitted}
          setIsPhotoSubmitted={setIsPhotoSubmitted}
          isSubmitClicked={isSubmitClicked}
          setIsSubmitClicked={setIsSubmitClicked}
          onPicChange={handlePicChange}
        />
      ),
      label: 'uploadPhotos',
    },
  ]

  const carouselDataLength = carouselData.length

  // send values to backend
  const navigate = useNavigate()

  const onSubmit = async () => {
    if (!isPhotoSubmitted) {
      setIsSubmitClicked(true)
    } else {
      const {
        name,
        dob,
        gender,
        lat,
        lng,
        country,
        city,
        street,
        houseNumber,
        selectedStatuses,
        userPreferences,
      } = getItemsFromLocalStorage([
        'name',
        'dob',
        'gender',
        'lat',
        'lng',
        'country',
        'city',
        'street',
        'houseNumber',
        'selectedStatuses',
        'userPicsStorage',
        'userPreferences',
      ])
      await createProfile(
        {
          name,
          dateOfBirth: dob,
          gender,
          location: { lat, lng, country, city, street, houseNumber },
          reasons: selectedStatuses,
          photos,
          userPreferences,
          userPicsStorage: [],
        },
        token
      )
      navigate('/friends')
    }
  }
  return (
    <>
      {activeStep > 0 && <ArrowBackButton stepBackHandler={handleBack} />}
      <GenericCarousel
        items={carouselData}
        renderItem={(item) => item.component}
        activeStep={activeStep}
      />
      {activeStep < carouselDataLength - 1 && (
        <PrimaryButton onClickHandler={handleNext} label="Next" />
      )}
      {activeStep === carouselDataLength - 1 && (
        <PrimaryButton onClickHandler={onSubmit} label="Submit" />
      )}
      <MobileStepper
        className={classes.stepper}
        variant="dots"
        steps={carouselData.length}
        position="static"
        activeStep={activeStep}
        backButton={<></>}
        nextButton={<></>}
      />
    </>
  )
}

export default ProfileCarousel

const useStyles = makeStyles()((theme) => ({
  stepper: {
    '& .MuiLinearProgress-root': { width: '100%' },
    '& .MuiMobileStepper-dot': {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.palette.primary.main,
      margin: '0 6px',
    },
    '& .MuiMobileStepper-dot.MuiMobileStepper-dotActive': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))
