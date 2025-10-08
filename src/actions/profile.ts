import axios from 'axios'
import { UserPicsType, Location, UserPreferences } from 'types/FirstProfile'
import { clearLocalStorage } from 'utils/localStorage'

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/profile`

interface CreateProfileDto {
  name: string
  dateOfBirth: string
  gender: string
  location: Location
  reasons?: string[]
  userPreferences?: UserPreferences
  photos: UserPicsType[]
}

export const createProfile = async (
  data: CreateProfileDto,
  token: string
): Promise<any> => {
  const {
    name,
    dateOfBirth,
    gender,
    location,
    reasons = [],
    userPreferences,
    photos,
  } = data

  const chosenFiles: UserPicsType[] = photos.filter(
    (photo) => photo.blobFile instanceof File
  )

  const formData = new FormData()
  formData.append('name', name)
  formData.append('dateOfBirth', dateOfBirth)
  formData.append('gender', gender)
  formData.append('location', JSON.stringify(location))
  formData.append('reasons', JSON.stringify(reasons))
  formData.append('preferences', JSON.stringify(userPreferences || {}))

  chosenFiles.forEach((cf) => {
    formData.append('files', cf.blobFile as File)
  })

  try {
    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    clearLocalStorage(['userPreferences'])
    return response.data
  } catch (error: any) {
    console.error('❌ Error creating profile:', error.response?.data || error)
    throw new Error(error.response?.data?.message || 'Failed to create profile')
  }
}
