import axiosInstance from './axiosInstance'
import { BLOCK_ENDPOINT } from './endpoints'
import { deleteConversation } from './friendsServices'

export const blockUser = async (
  blockedUserId: string,
  blockerUserId: string
) => {
  const response = await axiosInstance.post(BLOCK_ENDPOINT, {
    blockedUserId,
  })

  try {
    await deleteConversation(blockerUserId, blockedUserId)
  } catch (error) {
    console.error('Error deleting the chat after block:', error)
    throw new Error(
      'The user is blocked, but the chat could not be deleted. Please try again.'
    )
  }

  return response.data
}
