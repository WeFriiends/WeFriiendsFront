import { mutate } from 'swr'
mutate('matches')
import { UserProfileData } from 'types/UserProfileData'
import axiosInstance from './axiosInstance'
import mockAxiosInstance from '../mocks/mockAxiosInstance'
import { shouldUseMockData } from '../utils/mockUtils'
import { FriendsMatch } from 'types/Matches'

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

export const getMatches = async (
  url: string
): Promise<FriendsMatch[] | undefined> => {
  try {
    // Check if we should use mock data
    if (shouldUseMockData()) {
      //console.log('Using mock data for matches')
      const response = await mockAxiosInstance.get<FriendsMatch[]>(url)
      return response.data
    }

    // Otherwise use the original API call
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

export const addNewFriend = async (
  idFriend: string
): Promise<number | undefined> => {
  try {
    const response = await axiosInstance.post('matches', {
      user2_id: idFriend,
    })
    mutate('matches')
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

export const addDislike = async (
  idPotentialFriend: string
): Promise<number | undefined> => {
  try {
    const response = await axiosInstance.post('dislikes', {
      disliked_id: idPotentialFriend,
    })
    return response.status
  } catch (error) {
    console.error('Error by adding dislike for potential friend')
  }
}
