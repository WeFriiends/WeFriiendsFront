import { UserMiniProfile } from 'common/types/userTypes'
import axiosInstance from './axiosInstance'

export const getUsersWhoLikedMe = async (): Promise<UserMiniProfile[]> => {
  try {
    const response = await axiosInstance.get('likes/on-me')
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
