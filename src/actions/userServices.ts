import axiosInstance from './axiosInstance'
import { UserProfileData } from 'types/UserProfileData'

export const getUserById = async (id: string): Promise<UserProfileData> => {
  try {
    const response = await axiosInstance.get(`profile/${id}`)
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
