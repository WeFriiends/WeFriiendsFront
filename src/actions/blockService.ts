import axiosInstance from './axiosInstance'
import { removeFriend } from './friendsServices'
import { BLOCK_ENDPOINTS } from './endpoints'
import { deleteConversation } from './friendsServices'

export const blockUser = async (
  blockedUserId: string,
  blockerUserId: string
) => {
  // 1. Пытаемся удалить матч (если есть)
  try {
    await removeFriend(blockedUserId, blockerUserId)
  } catch (error: any) {
    if (error.response?.status !== 404 && error.response?.status !== 400) {
      console.error('Ошибка при удалении матча:', error)
    }
  }

  // 2. пытаемся удалить чат (если есть)
  try {
    await deleteConversation(blockerUserId, blockedUserId)
  } catch (error) {
    // Если чата нет — просто игнорируем
  }

  // 3. Отправляем блокировку на бэкенд
  const response = await axiosInstance.post(BLOCK_ENDPOINTS.create, {
    blockedUserId,
    blockerUserId,
  })

  return response.data
}
