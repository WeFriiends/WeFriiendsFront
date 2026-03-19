import { mutate } from 'swr'
mutate('matches')
import { UserProfileData } from 'types/UserProfileData'
import axiosInstance from './axiosInstance'
import { FriendsMatch } from 'types/Matches'
import { db } from 'services/firebase'
import { doc, deleteDoc, collection, getDocs } from 'firebase/firestore'

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
    throw error
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

export const removeFriend = async (
  friendId: string,
  currentUserId?: string
): Promise<void> => {
  const response = await axiosInstance.delete('matches', {
    data: {
      user2_id: friendId,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })

  mutate('matches')

  if (currentUserId) {
    try {
      await deleteConversation(currentUserId, friendId)
    } catch {
      // Игнорируем ошибку удаления диалога
    }
  }

  if (response.status >= 200 && response.status < 300) {
    return
  } else {
    throw new Error(`Failed to remove friend. Status: ${response.status}`)
  }
}

export const deleteConversation = async (
  currentUserId: string,
  friendId: string
): Promise<void> => {
  const chatId = [currentUserId, friendId].sort().join('_')
  const conversationRef = doc(db, 'conversations', chatId)

  // 1. Get all the messages
  const messagesRef = collection(db, 'conversations', chatId, 'messages')
  const messagesSnap = await getDocs(messagesRef)

  // 2. Delete each one
  const deletePromises = messagesSnap.docs.map((doc) => deleteDoc(doc.ref))
  await Promise.all(deletePromises)

  // 3. Delete the document itself
  await deleteDoc(conversationRef)
}
