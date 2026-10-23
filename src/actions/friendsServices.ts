import { mutate } from 'swr'
import { UserProfileData } from 'types/UserProfileData'
import axiosInstance from './axiosInstance'
import { FriendsMatch } from 'types/Matches'
import { db } from 'services/firebase'
import { doc, deleteDoc, collection, getDoc, getDocs } from 'firebase/firestore'
import {
  DISLIKES_ENDPOINT,
  LIKE_ENDPOINTS,
  MATCHES_ENDPOINT,
} from './endpoints'
import { getApiErrorMessage, parseApiError } from 'helpers/getApiErrorMessage'

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

// Backend answers 404 for any removeMatch failure (DB errors included),
// so only this exact message means the match is really gone.
const MATCH_NOT_FOUND_MESSAGE = 'There is no such match'

const isMatchAlreadyRemoved = (error: unknown): boolean => {
  const { status, message } = parseApiError(error)
  return status === 404 && message === MATCH_NOT_FOUND_MESSAGE
}

export const removeFriend = async (
  friendId: string,
  currentUserId?: string
): Promise<void> => {
  try {
    await axiosInstance.delete('matches', {
      data: {
        user2_id: friendId,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    if (!isMatchAlreadyRemoved(error)) {
      throw error
    }
  }

  mutate('matches')

  // A failure here is safe to retry: the next call gets "no such match"
  // from the backend and deletes the chat again.
  if (currentUserId) {
    await deleteConversation(currentUserId, friendId)
  }
}

/**
 * Deletes the conversation between two users together with its messages.
 * A missing conversation is not an error — there is simply nothing to delete.
 * Any real failure (permissions, network) is thrown to the caller.
 */
export const deleteConversation = async (
  currentUserId: string,
  friendId: string
): Promise<void> => {
  const chatId = [currentUserId, friendId].sort().join('_')
  const conversationRef = doc(db, 'conversations', chatId)

  const conversationSnap = await getDoc(conversationRef)
  if (!conversationSnap.exists()) {
    return
  }

  // 1. Get all the messages
  const messagesRef = collection(db, 'conversations', chatId, 'messages')
  const messagesSnap = await getDocs(messagesRef)

  // 2. Delete each one
  const deletePromises = messagesSnap.docs.map((doc) => deleteDoc(doc.ref))
  await Promise.all(deletePromises)

  // 3. Delete the document itself
  await deleteDoc(conversationRef)
}
