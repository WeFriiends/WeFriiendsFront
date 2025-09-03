import React, { useState, useCallback } from 'react'
import GenericCarousel from '../../common/components/Carousel'
import useHandleCarousel from 'hooks/useHandleCarousel'
import NameInput from './name/NameInput'
import DateOfBirthPicker from './DateOfBirthPicker'
import GenderPick from './GenderPick'
import UserLocation from './location/UserLocation'
import Status from './Status'
import Interests from './interests/Interests'
import UploadPhotos from 'components/firstProfile/uploadPhotos/UploadPhotos'
import ArrowBackButton from 'common/components/ArrowBackButton'
import PrimaryButton from 'common/components/PrimaryButton'
import Loader from 'common/svg/Loader'
import MobileStepper from '@mui/material/MobileStepper'
import { makeStyles } from 'tss-react/mui'
import { useAuthStore, useProfileStore } from '../../zustand/store'
import {
  setItemToLocalStorage,
  getItemFromLocalStorage,
  getItemsFromLocalStorage,
  clearLocalStorage,
} from 'utils/localStorage'
import { validateName } from './utils/validateName'
import { validateDob } from './utils/validateDob'
import { validateGender } from './utils/validateGender'
import { validateLocation } from './utils/validateLocation'
import { Location } from 'types/FirstProfile'
import type { Dayjs } from 'dayjs'
import AuthPagesWrapper from './AuthPagesWrapper'
import axios from 'axios'

const ProfileCarousel = () => {
  const token = useAuthStore((s) => s.token)
  const { tempPhotos, clearTempPhotos } = useProfileStore()
  const {
    activeStep,
    handleBack,
    handleNext: proceedStep,
  } = useHandleCarousel()

  const [showNameError, setShowNameError] = useState(false)
  const [showDobError, setShowDobError] = useState(false)
  const [showGenderError, setShowGenderError] = useState(false)
  const [aboutMeError, setAboutMeError] = useState(false)
  const [isSubmitClicked, setSubmitClicked] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const [name, setName] = useState<string>(
    getItemFromLocalStorage('name') || ''
  )
  const [dob, setDob] = useState<Dayjs | null>(
    getItemFromLocalStorage('dob') || null
  )
  const [gender, setGender] = useState<string | null>(
    getItemFromLocalStorage('gender') || null
  )
  const [location, setLocation] = useState<Location>({
    country: getItemFromLocalStorage('country') || '',
    city: getItemFromLocalStorage('city') || '',
    street: getItemFromLocalStorage('street') || '',
    houseNumber: getItemFromLocalStorage('houseNumber') || '',
    lat: getItemFromLocalStorage('lat') || null,
    lng: getItemFromLocalStorage('lng') || null,
  })

  const onNameChange = (value: string) => setName(value)
  const onDobChange = (value: Dayjs | null) => setDob(value)
  const onGenderChange = (value: string | null) => setGender(value)
  const onLocationChange = useCallback(
    (value: Location) => setLocation(value),
    []
  )

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        if (validateName(name)) {
          setItemToLocalStorage('name', name)
          setShowNameError(false)
          proceedStep()
        } else setShowNameError(true)
        break

      case 1:
        if (validateDob(dob)) {
          setItemToLocalStorage('dob', dob)
          setShowDobError(false)
          proceedStep()
        } else setShowDobError(true)
        break

      case 2:
        if (gender != null && validateGender(gender)) {
          setItemToLocalStorage('gender', gender)
          setShowGenderError(false)
          proceedStep()
        } else setShowGenderError(true)
        break

      case 3:
        if (validateLocation(location)) {
          Object.entries(location).forEach(([key, value]) =>
            setItemToLocalStorage(key, value)
          )
          proceedStep()
        }
        break

      case 4:
        proceedStep()
        break

      case 5:
        if (!aboutMeError) proceedStep()
        break

      case 6:
        proceedStep()
        break

      default:
        break
    }
  }

  const blobToFile = (blob: Blob, fileName: string): File =>
    new File([blob], fileName, { type: blob.type, lastModified: Date.now() })

  const onSubmit = async () => {
    if (!token) {
      console.error('Token is absent.')
      return
    }
    setIsCreating(true)

    try {
      const filesToUpload: File[] = tempPhotos
        .filter((p) => p.blobFile)
        .map((p, i) => blobToFile(p.blobFile!, `photo${i}.jpg`))

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
        'userPreferences',
      ])

      const formData = new FormData()
      formData.append('name', name)
      formData.append('dateOfBirth', dob)
      formData.append('gender', gender)
      formData.append(
        'location',
        JSON.stringify({ lat, lng, country, city, street, houseNumber })
      )
      formData.append('reasons', JSON.stringify(selectedStatuses))
      formData.append('preferences', JSON.stringify(userPreferences || {}))

      filesToUpload.forEach((file) => formData.append('files', file))

      await axios.post('http://localhost:8080/api/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      clearLocalStorage([
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
        'userPreferences',
      ])
      clearTempPhotos()

      window.location.href = '/friends'
    } catch (error) {
      console.error('Profile creation error:', error)
      setIsCreating(false)
    }
  }

  const steps = [
    {
      label: 'name',
      component: (
        <NameInput onNameChange={onNameChange} showWithError={showNameError} />
      ),
    },
    {
      label: 'dob',
      component: (
        <DateOfBirthPicker
          onDobChange={onDobChange}
          showWithError={showDobError}
        />
      ),
    },
    {
      label: 'gender',
      component: (
        <GenderPick
          onGenderChange={onGenderChange}
          showWithError={showGenderError}
        />
      ),
    },
    {
      label: 'location',
      component: <UserLocation onLocationChange={onLocationChange} />,
    },
    { label: 'status', component: <Status /> },
    {
      label: 'interests',
      component: (
        <Interests
          hasAboutMeError={aboutMeError}
          setHasAboutMeError={setAboutMeError}
        />
      ),
    },
    {
      label: 'photos',
      component: (
        <UploadPhotos
          isSubmitClicked={isSubmitClicked}
          resetSubmitClicked={() => setSubmitClicked(false)}
          setIsPicHuge={() => null}
        />
      ),
    },
  ]

  const { classes } = useStyles()

  return (
    <AuthPagesWrapper
      width={activeStep === 5 || activeStep === 6 ? 580 : undefined}
    >
      {isCreating ? (
        <Loader />
      ) : (
        <>
          {activeStep > 0 && <ArrowBackButton stepBackHandler={handleBack} />}

          <GenericCarousel
            items={steps}
            renderItem={(item) => item.component}
            activeStep={activeStep}
          />

          {activeStep < steps.length - 1 && (
            <PrimaryButton label="Next" onClickHandler={handleNext} />
          )}
          {activeStep === steps.length - 1 && (
            <PrimaryButton label="Submit" onClickHandler={onSubmit} />
          )}

          <MobileStepper
            className={classes.stepper}
            variant="dots"
            steps={steps.length}
            position="static"
            activeStep={activeStep}
            backButton={<></>}
            nextButton={<></>}
          />
        </>
      )}
    </AuthPagesWrapper>
  )
}

export default ProfileCarousel

const useStyles = makeStyles()((theme) => ({
  stepper: {
    '& .MuiMobileStepper-dot': {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.palette.primary.main,
      margin: '0 6px',
    },
    '& .MuiMobileStepper-dotActive': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))
