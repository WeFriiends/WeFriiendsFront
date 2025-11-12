import { ReactNode, useEffect, useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useAuthStore, useProfileStore } from '../zustand/store'
import { useMatchesStore } from '../zustand/friendsStore'
import { useConversationsStore } from '../zustand/conversationsStore'

interface AuthTokenAndStoreProviderProps {
  children: ReactNode
}

function isTokenExpired(token?: string, leewaySeconds = 30) {
  if (!token) return true
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const exp = payload.exp as number | undefined
    if (!exp) return true
    const now = Math.floor(Date.now() / 1000)
    return now + leewaySeconds >= exp // true если истёк или истекает через <30 сек
  } catch {
    return true
  }
}

const AuthTokenAndStoreProvider = ({
  children,
}: AuthTokenAndStoreProviderProps) => {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0()
  const { token, setToken, setUser } = useAuthStore()
  const {
    data: profile,
    getProfile,
    checkProfile,
    hasProfile,
  } = useProfileStore()
  const { fetchMatches, startPeriodicFetching, stopPeriodicFetching } =
    useMatchesStore()
  const { subscribeToConversations } = useConversationsStore()

  // Флаги, предотвращающие повторные запросы
  const hasFetchedProfile = useRef(false)
  const hasCheckedProfile = useRef(false)

  // Auth watcher
  useEffect(() => {
    if (isAuthenticated && user) {
      setUser(user)
    }
  }, [isAuthenticated, user, setUser])

  // Token + Profile pipeline
  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        let accessToken = token
        if (!accessToken || isTokenExpired(accessToken)) {
          accessToken = await getAccessTokenSilently()
          setToken(accessToken)
          console.log('🔄 Token refreshed or obtained')
        }

        // проверяем, что первый профиль заполнен и записываем в стор
        if (!hasCheckedProfile.current && accessToken) {
          hasCheckedProfile.current = true // Помечаем, что запрос происходит
          await checkProfile(accessToken) // Дождаться завершения запроса после этого можно проверять hasProfile в стор
        }

        // Если профиль есть, но в сторе его нет — получаем данные
        if (
          hasProfile === true && // при этом первый профиль заполнен
          !profile && // стор не наполнен
          accessToken && // токен получен
          !hasFetchedProfile.current // ранее не наполняли стор
        ) {
          hasFetchedProfile.current = true // Помечаем, что запрос происходит
          await getProfile(accessToken)
        }
      } catch (error) {
        console.error(
          'TODO here redirect to Error 500. Error fetching profile or token:',
          error
        )
      }
    }

    if (isAuthenticated) fetchAuthData()
  }, [
    isAuthenticated,
    token,
    hasProfile,
    profile,
    getAccessTokenSilently,
    setToken,
    checkProfile,
    getProfile,
  ])

  // Effect for fetching matches periodically
  useEffect(() => {
    if (hasProfile) {
      // Initial fetch
      fetchMatches()
      // Start periodic fetching every 2 minutes
      startPeriodicFetching()
    }
    // Cleanup function to stop periodic fetching when component unmounts
    return () => stopPeriodicFetching()
  }, [hasProfile, fetchMatches, startPeriodicFetching, stopPeriodicFetching])

  // Fetching conversations and subscribing to conversations updates
  useEffect(() => {
    if (hasProfile && user?.sub) {
      subscribeToConversations(user.sub)
    }
    // No cleanup function here - unsubscription happens only when browser is closed
    // via the beforeunload event listener in conversationsStore.ts
  }, [hasProfile, user?.sub, subscribeToConversations])

  return <>{children}</>
}

export default AuthTokenAndStoreProvider
