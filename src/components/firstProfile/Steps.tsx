import React, { ChangeEvent, useEffect, useState } from 'react'
import GetName from './steps/GetName'
import GetDateOfBirth from './steps/GetDateOfBirth'
import GetGender from './steps/GetGender'
import GetPurpose from './steps/GetPurpose'
import Carousel from '../../common/Carousel'
import { useLocalStorageState } from '../../hooks/useLocalStorageState'
import { useLocalStorageEffect } from '../../hooks/useLocalStorageEffect'
import Pagination from 'common/Pagination'

interface StepsProps {
  activeStep: number
  setNextDisabled: React.Dispatch<React.SetStateAction<boolean>>
  handleClickPagination: (index: number) => void
}

const Steps: React.FC<StepsProps> = ({
  activeStep,
  setNextDisabled,
  handleClickPagination,
}) => {
  const [profileInput, setProfileInput] = useState<string>('')
  const [dob, setDob] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [lookingFor, setLookingFor] = useState<string>('')
  const [maleHovered, setMaleHovered] = useState<boolean>(false)
  const [femaleHovered, setFemaleHovered] = useState<boolean>(false)
  const [maleClicked, setMaleClicked] = useState<boolean>(false)
  const [femaleClicked, setFemaleClicked] = useState<boolean>(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileInput(event.target.value)
  }

  const handleDobChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDob(event.target.value)
    setNextDisabled(false)
  }

  const handleGenderChange = (selectedGender: string) => {
    setGender(selectedGender)
    if (selectedGender === 'male') {
      setMaleClicked(true)
      setFemaleClicked(false)
    } else {
      setFemaleClicked(true)
      setMaleClicked(false)
    }
    setNextDisabled(false)
  }

  const handleLookingForChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLookingFor(event.target.value)
    setNextDisabled(false)
  }

  const components = [
    {
      label: 'GetName',
      component: (
        <GetName handleNameChange={handleInputChange} name={profileInput} />
      ),
    },
    {
      label: 'GetDateOfBirth',
      component: <GetDateOfBirth dob={dob} handleDobChange={handleDobChange} />,
    },
    {
      label: 'GetGender',
      component: (
        <GetGender
          handleGenderChange={handleGenderChange}
          maleHovered={maleHovered}
          femaleHovered={femaleHovered}
          setMaleHovered={setMaleHovered}
          setFemaleHovered={setFemaleHovered}
          maleClicked={maleClicked}
          femaleClicked={femaleClicked}
        />
      ),
    },
    {
      label: 'GetPurpose',
      component: (
        <GetPurpose
          lookingFor={lookingFor}
          handleLookingForChange={handleLookingForChange}
        />
      ),
    },
  ]

  //TODO: refactor local storage logic
  useLocalStorageState(
    ['name', 'dob', 'gender', 'lookingFor'],
    (key: string, value: string) => {
      switch (key) {
        case 'name':
          setName(value)
          break
        case 'dob':
          setDob(value)
          break
        case 'gender':
          setGender(value)
          break
        case 'lookingFor':
          setLookingFor(value)
          break
      }
    }
  )

  useLocalStorageEffect({
    name,
    dob,
    gender,
    lookingFor,
  })

  return (
    <>
      <Carousel components={components} activeStep={activeStep} />
      <Pagination
        //TODO: component.label can be passed as key
        activeStep={activeStep}
        dots={components.length}
        onChangeIndex={handleClickPagination}
      />
    </>
  )
}

export default Steps
