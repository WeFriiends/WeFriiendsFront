import axiosInstance from './axiosInstance'
import { BLOCK_ENDPOINT } from './endpoints'
import { deleteConversation } from './friendsServices'

export const blockUser = async (
  blockedUserId: string,
  blockerUserId: string
) => {
  const response = await axiosInstance.post(BLOCK_ENDPOINT, {
    blockedUserId,
    blockerUserId,
  })

  // Only after a confirmed block we delete the chat, so a failed
  // request can never leave the conversation deleted without a block.
  try {
    await deleteConversation(blockerUserId, blockedUserId)
  } catch {
    // There might be no chat between the users — not an error
  }

  return response.data
}
