import axios from 'axios'

// Define the base URL for your API
const API_BASE_URL = 'http://localhost:8080/api/profile'
//const API_BASE_URL = 'https://wefriiends.com/wefriiendsprofile/api/profile'

interface ProfileData {
  name: string
  dateOfBirth: string
  gender: string
  location: Location
  reasons: string[]
  userPreferences: UserPreferences
  userPicsStorage: UserPicsType[]
}

// Function to create a profile
export const createProfile = async (
  data: ProfileData,
  token: string
): Promise<any> => {
  const {
    name,
    dateOfBirth,
    gender,
    location,
    reasons,
    userPreferences,
    userPicsStorage,
  } = data

  const choosenFiles: UserPicsType[] = userPicsStorage.filter(
    (cf: UserPicsType) => cf.url
  )
  const formData = new FormData()

  formData.append('name', name)
  formData.append('dateOfBirth', dateOfBirth)
  formData.append('gender', gender)
  formData.append('location', JSON.stringify(location))
  formData.append('reasons', JSON.stringify(reasons))
  formData.append('preferences', JSON.stringify(userPreferences))

  choosenFiles.forEach((cf, index) => {
    if (cf.blobFile) {
      formData.append(`file${index}`, cf.blobFile)
    } else {
      // Handle the case where cf.url is null or undefined
      console.error(`cf.url is null or undefined for index ${index}`)
    }
  })

  try {
    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (error: any) {
    console.error(
      'Error creating profile:',
      error.response?.data || error.message
    )
    throw new Error(error.response?.data?.message || 'Failed to create profile')
  }
}
