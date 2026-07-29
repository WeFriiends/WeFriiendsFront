import axiosInstance from './axiosInstance'
import { removeFriend } from './friendsServices'
import { BLOCK_ENDPOINTS } from './endpoints'
import { deleteConversation } from './friendsServices'

export const blockUser = async (
  blockedUserId: string,
  blockerUserId: string
) => {
  // Проверяем, находимся ли мы на странице /friends
  const shouldCheckMatch = window.location.pathname.includes('/friends')

  // 1. Пытаемся удалить матч (только если мы на /friends)
  if (shouldCheckMatch) {
    try {
      await removeFriend(blockedUserId, blockerUserId)
    } catch (error: any) {
      if (error.response?.status !== 404 && error.response?.status !== 400) {
        console.error('Ошибка при удалении матча:', error)
      }
    }
  }

  // 2. Пытаемся удалить чат (всегда)
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
