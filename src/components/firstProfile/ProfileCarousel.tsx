import { useState, useCallback } from 'react'
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
import Loader from 'common/components/Loader'
import MobileStepper from '@mui/material/MobileStepper'
import { makeStyles } from 'tss-react/mui'
import { useAuthStore, useProfileStore } from '../../zustand/store'
import {
  setItemToSessionStorage,
  getItemFromSessionStorage,
  getRequiredItemFromSessionStorage,
  clearSessionStorage,
} from 'utils/sessionStorage'
import { validateName } from './utils/validateName'
import { validateDob } from './utils/validateDob'
import { validateGender } from './utils/validateGender'
import { validateLocation } from './utils/validateLocation'
import { REGISTRATION_STORAGE_KEYS } from './storageKeys'
import { Location } from 'types/FirstProfile'
import dayjs, { type Dayjs } from 'dayjs'
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
  const [isCreating, setIsCreating] = useState(false)

  const [name, setName] = useState<string>(
    getItemFromSessionStorage<string>(REGISTRATION_STORAGE_KEYS.name) || ''
  )
  const storedDob = getItemFromSessionStorage<string>(
    REGISTRATION_STORAGE_KEYS.dob
  )
  const [dob, setDob] = useState<Dayjs | null>(
    storedDob ? dayjs(storedDob) : null
  )
  const [gender, setGender] = useState<string | null>(
    getItemFromSessionStorage<string>(REGISTRATION_STORAGE_KEYS.gender) || null
  )
  const [location, setLocation] = useState<Location>({
    country:
      getItemFromSessionStorage<string>(REGISTRATION_STORAGE_KEYS.country) ||
      '',
    city:
      getItemFromSessionStorage<string>(REGISTRATION_STORAGE_KEYS.city) || '',
    street:
      getItemFromSessionStorage<string>(REGISTRATION_STORAGE_KEYS.street) || '',
    houseNumber:
      getItemFromSessionStorage<string>(
        REGISTRATION_STORAGE_KEYS.houseNumber
      ) || '',
    lat: getItemFromSessionStorage<number>(REGISTRATION_STORAGE_KEYS.lat) ?? 0,
    lng: getItemFromSessionStorage<number>(REGISTRATION_STORAGE_KEYS.lng) ?? 0,
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
          setItemToSessionStorage(REGISTRATION_STORAGE_KEYS.name, name)
          setShowNameError(false)
          proceedStep()
        } else setShowNameError(true)
        break

      case 1:
        if (validateDob(dob)) {
          setItemToSessionStorage(REGISTRATION_STORAGE_KEYS.dob, dob)
          setShowDobError(false)
          proceedStep()
        } else setShowDobError(true)
        break

      case 2:
        if (gender != null && validateGender(gender)) {
          setItemToSessionStorage(REGISTRATION_STORAGE_KEYS.gender, gender)
          setShowGenderError(false)
          proceedStep()
        } else setShowGenderError(true)
        break

      case 3:
        if (validateLocation(location)) {
          setItemToSessionStorage(
            REGISTRATION_STORAGE_KEYS.country,
            location.country
          )
          setItemToSessionStorage(REGISTRATION_STORAGE_KEYS.city, location.city)
          setItemToSessionStorage(
            REGISTRATION_STORAGE_KEYS.street,
            location.street
          )
          setItemToSessionStorage(
            REGISTRATION_STORAGE_KEYS.houseNumber,
            location.houseNumber
          )
          setItemToSessionStorage(REGISTRATION_STORAGE_KEYS.lat, location.lat)
          setItemToSessionStorage(REGISTRATION_STORAGE_KEYS.lng, location.lng)
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

      const name = getRequiredItemFromSessionStorage<string>(
        REGISTRATION_STORAGE_KEYS.name
      )
      const dob = getRequiredItemFromSessionStorage<string>(
        REGISTRATION_STORAGE_KEYS.dob
      )
      const gender = getRequiredItemFromSessionStorage<string>(
        REGISTRATION_STORAGE_KEYS.gender
      )
      const lat = getRequiredItemFromSessionStorage<number>(
        REGISTRATION_STORAGE_KEYS.lat
      )
      const lng = getRequiredItemFromSessionStorage<number>(
        REGISTRATION_STORAGE_KEYS.lng
      )
      const country = getRequiredItemFromSessionStorage<string>(
        REGISTRATION_STORAGE_KEYS.country
      )
      const city = getRequiredItemFromSessionStorage<string>(
        REGISTRATION_STORAGE_KEYS.city
      )
      const street = getRequiredItemFromSessionStorage<string>(
        REGISTRATION_STORAGE_KEYS.street
      )
      const houseNumber = getRequiredItemFromSessionStorage<string>(
        REGISTRATION_STORAGE_KEYS.houseNumber
      )
      const selectedStatuses = getRequiredItemFromSessionStorage<string[]>(
        REGISTRATION_STORAGE_KEYS.selectedStatuses
      )
      const userPreferences = getItemFromSessionStorage<
        Record<string, unknown>
      >(REGISTRATION_STORAGE_KEYS.userPreferences)

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

      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      clearSessionStorage(Object.values(REGISTRATION_STORAGE_KEYS))
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
        <NameInput
          name={name}
          onNameChange={onNameChange}
          showWithError={showNameError}
        />
      ),
    },
    {
      label: 'dob',
      component: (
        <DateOfBirthPicker
          dob={dob}
          onDobChange={onDobChange}
          showWithError={showDobError}
        />
      ),
    },
    {
      label: 'gender',
      component: (
        <GenderPick
          selectedGender={gender}
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
    { label: 'photos', component: <UploadPhotos /> },
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
            <PrimaryButton
              label="Submit"
              onClickHandler={onSubmit}
              disabled={tempPhotos.length === 0}
            />
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
