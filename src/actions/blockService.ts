import axiosInstance from './axiosInstance'
import { removeFriend } from './friendsServices'
import { BLOCK_ENDPOINTS } from './endpoints'
import { deleteConversation } from './friendsServices'

export const blockUser = async (
  blockedUserId: string,
  blockerUserId: string
) => {
  console.log('🚫 Блокировка пользователя:', { blockedUserId, blockerUserId })

  // 1. Пытаемся удалить матч (если есть)
  try {
    await removeFriend(blockedUserId, blockerUserId)
    console.log('✅ Матч удалён (если существовал)')
  } catch (error: any) {
    if (error.response?.status === 404 || error.response?.status === 400) {
      console.log('ℹ️ Матча не существовало, пропускаем')
    } else {
      console.error('Ошибка при удалении матча:', error)
    }
  }

  // 2. ВСЕГДА пытаемся удалить чат (если есть)
  try {
    await deleteConversation(blockerUserId, blockedUserId)
    console.log('✅ Чат удалён (если существовал)')
  } catch (error) {
    console.log('ℹ️ Чата не существовало, пропускаем')
  }

  // 3. Отправляем блокировку на бэкенд
  const response = await axiosInstance.post(BLOCK_ENDPOINTS.create, {
    blockedUserId,
    blockerUserId,
  })

  return response.data
}
