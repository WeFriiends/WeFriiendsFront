import { UserProfileData } from 'types/UserProfileData'
import axiosInstance from './axiosInstance'
import mockAxiosInstance from '../mocks/mockAxiosInstance'
import { shouldUseMockData } from '../utils/mockUtils'

export const getFriends = async (
  url: string
): Promise<UserProfileData[] | undefined> => {
  try {
    // Check if we should use mock data
    if (shouldUseMockData()) {
      //console.log('Using mock data for friends')
      const response = await mockAxiosInstance.get<UserProfileData[]>(url)
      return response.data
    }

    // Otherwise use the original API call
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching data shouldUseMockData:', error)
    return []
  }
}

export const addNewFriend = async (
  friendData: UserProfileData
): Promise<number | undefined> => {
  try {
    const response = await axiosInstance.post('newFriends', friendData)
    return response.status
  } catch (error) {
    console.error('Error by adding new friend:', error)
  }
}

export const deletePotentialFriend = async (
  id: string
): Promise<number | undefined> => {
  try {
    const response = await axiosInstance.delete(`potentialFriends/${id}`)
    return response.status
  } catch (error) {
    console.error('Error deleting data:', error)
  }
}

export const addLike = async (
  userId: string,
  idPotentialFriend: string
): Promise<number | undefined> => {
  try {
    const response = await axiosInstance.post(
      `users/${userId}/likedUsers`,
      idPotentialFriend
    )
    return response.status
  } catch (error) {
    console.error('Error by adding like for potential friend')
  }
}
