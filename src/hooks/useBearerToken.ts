/**
 * Файл может быть удален (оставлен на всякий случай)
 * Хук нигде не используется, возможно в будущем надо избавиться от токена в стор и всегда передавать
 * getAccessTokenSilently прямо в апи запросы. Сейчас у нас Zustand/Redux используется без персистентности (т.е. не
 * сохраняет состояние в браузерное хранилище), это примерно так же безопасно, как useState.
 *
 * Токен обновляется при изменении `user.sub`.
 * Проблемы данного хука:
 * getAccessTokenSilently() должен вызываться только если пользователь аутентифицирован.
 * Сейчас вызов происходит всегда, что может привести к ошибкам.
 */
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'

const useBearerToken = () => {
  const [token, setToken] = useState('')
  const { user, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently()
        setToken(accessToken)
      } catch (e) {
        console.error(e)
      }
    }

    getToken()
  }, [getAccessTokenSilently, user?.sub])

  return token
}

export default useBearerToken
