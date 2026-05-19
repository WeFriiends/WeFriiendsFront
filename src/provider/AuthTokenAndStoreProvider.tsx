import { ReactNode, useEffect, useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useAuthStore, useProfileStore } from '../zustand/store'
import { useMatchesStore } from '../zustand/friendsStore'
import { useConversationsStore } from '../zustand/conversationsStore'
import { handleLogout } from '../utils/logoutUtils'
import { ApiErrorResponse } from 'types/UserProfileData'

interface AuthTokenAndStoreProviderProps {
  children: ReactNode
}

const AuthTokenAndStoreProvider = ({
  children,
}: AuthTokenAndStoreProviderProps) => {
  const { isAuthenticated, getAccessTokenSilently, user, isLoading, logout } =
    useAuth0()
  const { token, setToken } = useAuthStore()
  const {
    data: profile,
    getProfile,
    checkProfile,
    hasProfile,
  } = useProfileStore()

  const { fetchMatches, startPeriodicFetching, stopPeriodicFetching } =
    useMatchesStore()

  const { subscribeToConversations, fetchConversations } =
    useConversationsStore()

  // Флаги, предотвращающие повторные запросы
  const hasFetchedProfile = useRef(false)
  const hasCheckedProfile = useRef(false)

  useEffect(() => {
    // Если Auth0 ещё загружается или пользователь не аутентифицирован - выходим
    if (isLoading || !isAuthenticated) return

    const fetchAuthData = async () => {
      try {
        let accessToken = token
        if (!accessToken) {
          accessToken = await getAccessTokenSilently()
          setToken(accessToken)
        }
      } catch (error) {
        // если не пришли данные профиля с бэка, по причине что бэк не залогинен
        console.error(
          'Consent or Login required (message from backend):',
          error
        )
      }

      try {
        // проверяем, что первый профиль заполнен и записываем в стор
        if (!hasCheckedProfile.current && token) {
          hasCheckedProfile.current = true // Помечаем, что запрос происходит
          await checkProfile(token) // Дождаться завершения запроса после этого можно проверять hasProfile в стор
        }
        if (
          !profile && // стор не наполнен
          hasProfile === true && // при этом первый профиль заполнен
          token && // токен получен
          !hasFetchedProfile.current // ранее не наполняли стор
        ) {
          hasFetchedProfile.current = true // Помечаем, что запрос происходит
          getProfile(token)
        }
      } catch (error: unknown) {
        const apiError = error as ApiErrorResponse
        if (apiError.status === 401 || apiError.status === 404) {
          handleLogout(logout)
        } else {
          console.error('Unexpected error in checkProfile:', error)
        }
      }
    }

    fetchAuthData()
  }, [
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    token,
    setToken,
    profile,
    checkProfile,
    getProfile,
    hasProfile,
    logout,
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
    return () => {
      stopPeriodicFetching()
    }
  }, [hasProfile, fetchMatches, startPeriodicFetching, stopPeriodicFetching])

  // Effect for fetching and subscribing to conversations
  useEffect(() => {
    if (hasProfile && user?.sub) {
      // Initial fetch - no need
      // fetchConversations(user.sub)
      // Subscribe to real-time updates for conversations
      subscribeToConversations(user.sub)
    }
    // No cleanup function here - unsubscription happens only when browser is closed
    // via the beforeunload event listener in conversationsStore.ts
  }, [hasProfile, user, fetchConversations, subscribeToConversations])

  return <>{children}</>
}

export default AuthTokenAndStoreProvider
