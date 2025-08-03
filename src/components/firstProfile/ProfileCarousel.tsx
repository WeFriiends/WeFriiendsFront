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
import Loader from 'common/svg/Loader'
import MobileStepper from '@mui/material/MobileStepper'
import { makeStyles } from 'tss-react/mui'

import { createProfile } from 'actions/profile'
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
import { Location, UserPicsType } from 'types/FirstProfile'
import type { Dayjs } from 'dayjs'
import AuthPagesWrapper from './AuthPagesWrapper'
import { uploadFiles } from './utils/photoApi'

const ProfileCarousel = () => {
  const token = useAuthStore((s) => s.token)
  const { tempPhotos, clearTempPhotos } = useProfileStore()
  const { activeStep, handleBack, handleNext: proceed } = useHandleCarousel()

  const [showNameError, setShowNameError] = useState(false)
  const [showDobError, setShowDobError] = useState(false)
  const [showGenderError, setShowGenderError] = useState(false)
  const [isPicHuge, setIsPicHuge] = useState(false)
  const [isSubmitClicked, setSubmitClicked] = useState(false)
  const [creating, setCreating] = useState(false)
  const [aboutMeError, setAboutMeError] = useState(false)

  const [name, setName] = useState(getItemFromLocalStorage('name'))
  const [dob, setDob] = useState(getItemFromLocalStorage('dob'))
  const [gender, setGender] = useState(getItemFromLocalStorage('gender'))
  const [loc, setLoc] = useState<Location>(() => ({
    country: getItemFromLocalStorage('country') || '',
    city: getItemFromLocalStorage('city') || '',
    street: getItemFromLocalStorage('street') || '',
    houseNumber: getItemFromLocalStorage('houseNumber') || '',
    lat: getItemFromLocalStorage('lat') || null,
    lng: getItemFromLocalStorage('lng') || null,
  }))

  const onName = (v: string) => setName(v)
  const onDob = (v: Dayjs | null) => setDob(v)
  const onGender = (v: string | null) => setGender(v)
  const onLoc = useCallback((v: Location) => setLoc(v), [])

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        if (validateName(name)) {
          setItemToLocalStorage('name', name)
          setShowNameError(false)
          proceed()
        } else setShowNameError(true)
        break

      case 1:
        if (validateDob(dob)) {
          setItemToLocalStorage('dob', dob)
          setShowDobError(false)
          proceed()
        } else setShowDobError(true)
        break

      case 2:
        if (validateGender(gender)) {
          setItemToLocalStorage('gender', gender)
          setShowGenderError(false)
          proceed()
        } else setShowGenderError(true)
        break

      case 3:
        if (validateLocation(loc)) {
          Object.entries(loc).forEach(([k, v]) => setItemToLocalStorage(k, v))
          proceed()
        }
        break

      case 4:
        proceed()
        break

      case 5:
        if (!aboutMeError) proceed()
        break

      case 6:
        proceed()
        break
    }
  }
  function blobToFile(blob: Blob, fileName: string): File {
    return new File([blob], fileName, {
      type: blob.type,
      lastModified: Date.now(),
    })
  }

  const onSubmit = async () => {
    console.log(
      'Photos URLs:',
      tempPhotos.map((p) => p.url)
    )
    if (tempPhotos.length === 0) {
      setSubmitClicked(true)
      return
    }
    if (!token) {
      console.error('Token is absent.')
      return
    }

    setCreating(true)

    try {
      const filesToUpload: File[] = tempPhotos
        .filter((p) => p.blobFile)
        .map((p, i) => blobToFile(p.blobFile!, `photo${i}.jpg`))

      console.log('👉 filesToUpload.length:', filesToUpload.length)
      console.log(
        '👉 filesToUpload names:',
        filesToUpload.map((f) => f.name)
      )
      console.log('🔐 token (first 20):', token?.slice(0, 20))

      let photoUrls = tempPhotos
        .map((p) => p.url)
        .filter((url): url is string => !!url)

      if (filesToUpload.length > 0) {
        const uploadedUrls = await uploadFiles(filesToUpload, token)
        photoUrls = [...photoUrls, ...uploadedUrls]
      }
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

      await createProfile(
        {
          name,
          dateOfBirth: dob,
          gender,
          location: { lat, lng, country, city, street, houseNumber },
          reasons: selectedStatuses,
          photos: photoUrls,
          userPreferences,
        },
        token
      )

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
    } catch (err) {
      console.error(err)
      setCreating(false)
    }
  }

  const steps = [
    {
      label: 'name',
      component: (
        <NameInput onNameChange={onName} showWithError={showNameError} />
      ),
    },
    {
      label: 'dob',
      component: (
        <DateOfBirthPicker onDobChange={onDob} showWithError={showDobError} />
      ),
    },
    {
      label: 'gender',
      component: (
        <GenderPick onGenderChange={onGender} showWithError={showGenderError} />
      ),
    },
    { label: 'location', component: <UserLocation onLocationChange={onLoc} /> },
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
          setIsPicHuge={setIsPicHuge}
        />
      ),
    },
  ]

  const { classes } = useStyles()

  return (
    <AuthPagesWrapper
      width={activeStep === 5 || activeStep === 6 ? 580 : undefined}
    >
      {creating ? (
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
//!!! import React, { useEffect } from 'react'
// import GenericCarousel from '../../common/components/Carousel'
// import useHandleCarousel from 'hooks/useHandleCarousel'
// import NameInput from './name/NameInput'
// import DateOfBirthPicker from './DateOfBirthPicker'
// import PrimaryButton from 'common/components/PrimaryButton'
// import { createProfile } from 'actions/profile'
// import GenderPick from './GenderPick'
// import ArrowBackButton from 'common/components/ArrowBackButton'
// import Status from './Status'
// import UserLocation from './location/UserLocation'
// import Interests from './interests/Interests'
// import UploadPhotos from 'components/firstProfile/uploadPhotos/UploadPhotos'
// import MobileStepper from '@mui/material/MobileStepper'
// import { makeStyles } from 'tss-react/mui'
// import { useCallback, useState } from 'react'
// import { validateName } from './utils/validateName'
// import { validateDob } from './utils/validateDob'
// import { validateGender } from './utils/validateGender'
// import {
//   setItemToLocalStorage,
//   getItemFromLocalStorage,
//   getItemsFromLocalStorage,
//   clearLocalStorage,
// } from 'utils/localStorage'
// import { Dayjs } from 'dayjs'
// import { validateLocation } from './utils/validateLocation'
// import { Location } from 'types/FirstProfile'
// import AuthPagesWrapper from './AuthPagesWrapper'
// import Loader from '../../common/svg/Loader'
// import { useAuthStore, useProfileStore } from '../../zustand/store'

// // todo: check the connection with WeFriiendsProfile and show the error before allowing to fill out the form.
// // todo: check if the user is already filled the first profile and show the error.

// const ProfileCarousel = () => {
//   const profile = useProfileStore((state) => state.data)

//   useEffect(() => {
//     console.log('✅ Профиль из Zustand:', profile)
//   }, [profile])

//   //const photos = useProfileStore((state) => state.data.photos)
//   const { classes } = useStyles()
//   const token = useAuthStore((state) => state.token)
//   const {
//     activeStep,
//     handleBack,
//     handleNext: proceedToNextStep,
//   } = useHandleCarousel()
//   const [showNameWithError, setShowNameWithError] = useState(false)
//   const [showDobWithError, setShowDobWithError] = useState(false)
//   const [showGenderWithError, setShowGenderWithError] = useState(false)
//   const [isPhotoSubmitted, setIsPhotoSubmitted] = useState(false)
//   const [isSubmitClicked, setIsSubmitClicked] = useState(false)
//   const [isProfileCreating, setIsProfileCreating] = useState(false)
//   const [hasAboutMeError, setHasAboutMeError] = useState(false)

//   const [nameChange, setNameChange] = useState(getItemFromLocalStorage('name'))
//   const [dobChange, setDobChange] = useState(getItemFromLocalStorage('dob'))
//   const [genderChange, setGenderChange] = useState(
//     getItemFromLocalStorage('gender')
//   )
//   const [locationChange, setLocationChange] = useState(() => ({
//     country: getItemFromLocalStorage('country') || '',
//     city: getItemFromLocalStorage('city') || '',
//     street: getItemFromLocalStorage('street') || '',
//     houseNumber: getItemFromLocalStorage('houseNumber') || '',
//     lat: getItemFromLocalStorage('lat') || null,
//     lng: getItemFromLocalStorage('lng') || null,
//   }))

//   const handleNameChange = (value: string) => {
//     setNameChange(value)
//   }

//   const handleDobChange = (value: Dayjs | null) => {
//     setDobChange(value)
//   }

//   const handleGenderChange = (value: string | null) => {
//     setGenderChange(value)
//   }

//   const handleLocationChange = useCallback((value: Location) => {
//     setLocationChange(value)
//   }, [])

//   const handleNext = () => {
//     if (activeStep === 0) {
//       // Name
//       if (validateName(nameChange)) {
//         setItemToLocalStorage('name', nameChange)
//         setShowNameWithError(false)
//         proceedToNextStep()
//       } else {
//         setShowNameWithError(true)
//         return
//       }
//     } else if (activeStep === 1) {
//       // DOB
//       if (validateDob(dobChange)) {
//         setItemToLocalStorage('dob', dobChange)
//         setShowDobWithError(false)
//         proceedToNextStep()
//       } else {
//         setShowDobWithError(true)
//         return
//       }
//     } else if (activeStep === 2) {
//       // Gender
//       if (validateGender(genderChange)) {
//         setItemToLocalStorage('gender', genderChange)
//         setShowGenderWithError(false)
//         proceedToNextStep()
//       } else {
//         setShowGenderWithError(true)
//         return
//       }
//     } else if (activeStep === 3) {
//       // Location
//       if (validateLocation(locationChange)) {
//         setItemToLocalStorage('country', locationChange.country)
//         setItemToLocalStorage('city', locationChange.city)
//         setItemToLocalStorage('street', locationChange.street)
//         setItemToLocalStorage('houseNumber', locationChange.houseNumber)
//         setItemToLocalStorage('lat', locationChange.lat)
//         setItemToLocalStorage('lng', locationChange.lng)
//         proceedToNextStep()
//       } else {
//         return
//       }
//     } else if (activeStep === 4) {
//       // Statuses looking for
//       proceedToNextStep()
//     } else if (activeStep === 5) {
//       // Lifestyle and About me
//       if (!hasAboutMeError) {
//         proceedToNextStep()
//       }
//     } else if (activeStep === 6) {
//       // Photo
//       proceedToNextStep()
//     }
//   }

//   interface UserPicsType {
//     id: string
//     url: string | null
//   }

//   const [photos, setPhotos] = useState<UserPicsType[]>([])
//   const handlePicChange = (photos: UserPicsType[]) => {
//     setPhotos(photos)
//   }

//   const carouselData = [
//     {
//       component: (
//         <NameInput
//           onNameChange={handleNameChange}
//           showWithError={showNameWithError}
//         />
//       ),
//       label: 'nameInput',
//     },
//     {
//       component: (
//         <DateOfBirthPicker
//           onDobChange={handleDobChange}
//           showWithError={showDobWithError}
//         />
//       ),
//       label: 'dateOfBirthPicker',
//     },
//     {
//       component: (
//         <GenderPick
//           onGenderChange={handleGenderChange}
//           showWithError={showGenderWithError}
//         />
//       ),
//       label: 'genderPick',
//     },
//     {
//       component: <UserLocation onLocationChange={handleLocationChange} />,
//       label: 'userLocation',
//     },
//     {
//       component: <Status />,
//       label: 'status',
//     },
//     {
//       component: (
//         <Interests
//           hasAboutMeError={hasAboutMeError}
//           setHasAboutMeError={setHasAboutMeError}
//         />
//       ),
//       label: 'interests',
//     },
//     {
//       component: (
//         <UploadPhotos
//           isPhotoSubmitted={isPhotoSubmitted}
//           setIsPhotoSubmitted={setIsPhotoSubmitted}
//           isSubmitClicked={isSubmitClicked}
//           setIsSubmitClicked={setIsSubmitClicked}
//           onPicChange={handlePicChange}
//         />
//       ),
//       label: 'uploadPhotos',
//     },
//   ]

//   const carouselDataLength = carouselData.length

//   // send values to backend

//   if (!token) {
//     console.error('Token is absent.')
//     return
//   }

//   const onSubmit = async () => {
//     if (!isPhotoSubmitted) {
//       setIsSubmitClicked(true)
//     } else {
//       setIsProfileCreating(true)
//       const {
//         name,
//         dob,
//         gender,
//         lat,
//         lng,
//         country,
//         city,
//         street,
//         houseNumber,
//         selectedStatuses,
//         userPreferences,
//       } = getItemsFromLocalStorage([
//         'name',
//         'dob',
//         'gender',
//         'lat',
//         'lng',
//         'country',
//         'city',
//         'street',
//         'houseNumber',
//         'selectedStatuses',
//         'userPicsStorage',
//         'userPreferences',
//       ])
//       try {
//         await createProfile(
//           {
//             name,
//             dateOfBirth: dob,
//             gender,
//             location: { lat, lng, country, city, street, houseNumber },
//             reasons: selectedStatuses,
//             photos,
//             userPreferences,
//             userPicsStorage: [],
//           },
//           token
//         )
//         clearLocalStorage([
//           'name',
//           'dob',
//           'gender',
//           'lat',
//           'lng',
//           'country',
//           'city',
//           'street',
//           'houseNumber',
//           'selectedStatuses',
//           'userPreferences',
//           'userPicsStorage',
//         ])

//         setIsProfileCreating(false)
//         window.location.href = '/friends' // page reload needed
//         // todo: it can be replaced to navigate if we add store update after profile creating, or
//         //  rewrite profile.ts to createProfile() from api.js
//       } catch (error: any) {
//         setIsProfileCreating(false)
//         console.error(error)
//         throw new Error(error.message)
//       }
//     }
//   }
//   return (
//     <AuthPagesWrapper
//       width={activeStep == 5 || activeStep == 6 ? 580 : undefined}
//     >
//       {isProfileCreating ? (
//         <Loader />
//       ) : (
//         <>
//           {activeStep > 0 && <ArrowBackButton stepBackHandler={handleBack} />}
//           <GenericCarousel
//             items={carouselData}
//             renderItem={(item) => item.component}
//             activeStep={activeStep}
//           />
//           {activeStep < carouselDataLength - 1 && (
//             <PrimaryButton onClickHandler={handleNext} label="Next" />
//           )}
//           {activeStep === carouselDataLength - 1 && (
//             <PrimaryButton onClickHandler={onSubmit} label="Submit" />
//           )}
//           <MobileStepper
//             className={classes.stepper}
//             variant="dots"
//             steps={carouselData.length}
//             position="static"
//             activeStep={activeStep}
//             backButton={<></>}
//             nextButton={<></>}
//           />
//         </>
//       )}
//     </AuthPagesWrapper>
//   )
// }

// export default ProfileCarousel

// const useStyles = makeStyles()((theme) => ({
//   stepper: {
//     '& .MuiLinearProgress-root': { width: '100%' },
//     '& .MuiMobileStepper-dot': {
//       width: 10,
//       height: 10,
//       borderRadius: 5,
//       backgroundColor: theme.palette.primary.main,
//       margin: '0 6px',
//     },
//     '& .MuiMobileStepper-dot.MuiMobileStepper-dotActive': {
//       backgroundColor: theme.palette.secondary.main,
//     },
//   },
// }))
