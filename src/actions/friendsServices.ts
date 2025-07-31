import { mutate } from 'swr'
mutate('matches')
import { UserProfileData } from 'types/UserProfileData'
import axiosInstance from './axiosInstance'
import { FriendsMatch } from 'types/Matches'

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

export const getMatches = async (
  url: string
): Promise<FriendsMatch[] | undefined> => {
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
