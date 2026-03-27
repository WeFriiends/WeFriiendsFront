import axiosInstance from './axiosInstance'
import { UserProfileData } from 'types/UserProfileData'
import { PROFILE_ENDPOINTS } from './endpoints'

export const getUserById = async (id: string): Promise<UserProfileData> => {
  try {
    const response = await axiosInstance.get(PROFILE_ENDPOINTS.byId(id))
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const getUsersData = async <T>(url: string): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(url)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
