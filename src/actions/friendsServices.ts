import { UserProfileData } from 'types/UserProfileData'
import axiosInstance from './axiosInstance'

export const getFriends = async (
  url: string
): Promise<UserProfileData[] | undefined> => {
  try {
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export const addNewFriend = async (
  idFriend: string
): Promise<number | undefined> => {
  try {
    const response = await axiosInstance.post('matches', {
      user2_id: idFriend,
    })
    return response.status
  } catch (error) {
    console.error('Error by adding new friend:', error)
  }
}

export const addLike = async (
  idPotentialFriend: string
): Promise<number | undefined> => {
  try {
    const response = await axiosInstance.post('likes', {
      liked_id: idPotentialFriend,
    })
    return response.status
  } catch (error) {
    console.error('Error by adding like for potential friend')
  }
}
