import axiosInstance from './axiosInstance'
import { removeFriend } from './friendsServices'
import { BLOCK_ENDPOINTS } from './endpoints'

export const blockUser = async (
  blockedUserId: string,
  blockerUserId: string
) => {
  console.log('🚫 Блокировка пользователя:', { blockedUserId, blockerUserId })

  // Пытаемся удалить матч и чат (если они существуют)
  try {
    await removeFriend(blockedUserId, blockerUserId)
    console.log('✅ Матч и чат удалены (если существовали)')
  } catch (error) {
    // Если удалять нечего - игнорим
    console.log('ℹ️ Матча не существовало, пропускаем удаление')
  }

  // Всегда отправляем блокировку на бэк
  const response = await axiosInstance.post(BLOCK_ENDPOINTS.create, {
    blockedUserId,
    blockerUserId,
  })

  return response.data
}
