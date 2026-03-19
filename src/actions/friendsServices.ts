import { mutate } from 'swr'
import { UserProfileData } from 'types/UserProfileData'
import axiosInstance from './axiosInstance'
import { FriendsMatch } from 'types/Matches'
import {
  DISLIKES_ENDPOINT,
  LIKE_ENDPOINTS,
  MATCHES_ENDPOINT,
} from './endpoints'
import { getApiErrorMessage } from 'actions/helpers/getApiErrorMessage'

export const getFriends = async (
  url: string
): Promise<UserProfileData[] | undefined> => {
  try {
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

export const getMatches = async (
  url: string
): Promise<FriendsMatch[] | undefined> => {
  try {
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

export const addNewFriend = async (idFriend: string): Promise<number> => {
  try {
    const response = await axiosInstance.post(MATCHES_ENDPOINT, {
      user2_id: idFriend,
    })
    mutate(MATCHES_ENDPOINT)
    return response.status
  } catch (error: unknown) {
    console.error('Error by adding new friend:', error)
    throw new Error(getApiErrorMessage(error) || 'Failed to add a new friend')
  }
}

export const addLike = async (idPotentialFriend: string): Promise<number> => {
  try {
    const response = await axiosInstance.post(LIKE_ENDPOINTS.likes, {
      liked_id: idPotentialFriend,
    })
    return response.status
  } catch (error: unknown) {
    console.error('Error by adding like for potential friend:', error)
    throw new Error(getApiErrorMessage(error) || 'Failed to add like')
  }
}

export const addDislike = async (
  idPotentialFriend: string
): Promise<number> => {
  try {
    const response = await axiosInstance.post(DISLIKES_ENDPOINT, {
      disliked_id: idPotentialFriend,
    })
    return response.status
  } catch (error: unknown) {
    console.error('Error by adding dislike for potential friend:', error)
    throw new Error(getApiErrorMessage(error) || 'Failed to add dislike')
  }
}
