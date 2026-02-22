import axios from 'axios'
import axiosInstance from './axiosInstance'
import { UserObjectType } from 'common/types/userTypes'
import { UserProfileData } from 'types/UserProfileData'

export const getUsersData = async (url: string) => {
  try {
    const response = await axios.get(url)
    return response.data as Array<UserObjectType>
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export const getUserById = async (id: string): Promise<UserProfileData> => {
  try {
    const response = await axiosInstance.get(`profile/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
