import { useAuth0 } from '@auth0/auth0-react'
import Loader from 'common/svg/Loader'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useProfileStore } from '../zustand/store'

const AuthCallbackPage = () => {
  const { isLoading, isAuthenticated, error } = useAuth0()
  const navigate = useNavigate()
  const location = useLocation()
  const gender = useProfileStore((state) => state.data?.gender)
  const { hasProfile, loading } = useProfileStore()

  // Redirect handling based on profile data
  useEffect(() => {
    if (isLoading || loading) return

    if (isAuthenticated) {
      if (hasProfile === false) {
        navigate('/fill-profile')
      } else if (hasProfile === true) {
        if (gender === 'male') {
          navigate('/no-friends-in-your-area')
        } else {
          navigate('/friends')
        }
      }
    } else if (
      !isLoading &&
      !isAuthenticated &&
      !location.search.includes('code=')
    ) {
      // If loading is completed, we are not authenticated
      // and there is no code in the URL - something went wrong
      navigate('/')
    }
  }, [
    hasProfile,
    loading,
    navigate,
    gender,
    isLoading,
    isAuthenticated,
    location.search,
  ])

  // Handling special parameters from Auth0
  // (email verification and etc.)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const message = searchParams.get('message')
    const errorDescription = searchParams.get('error_description')

    if (message?.includes('Your email was verified')) {
      navigate('/email-confirmed')
    } else if (message?.includes('This URL can be used only once')) {
      navigate('/email-already-confirmed')
    } else if (
      errorDescription?.includes('Please verify your email before logging in')
    ) {
      navigate('/account-created')
    }
  }, [location.search, navigate])

  // Auth0 error handling
  useEffect(() => {
    if (error) {
      console.error('Auth0 Callback Error:', error)
      // In case of any authentication error,
      // redirect to the main page after a short delay
      const timer = setTimeout(() => {
        navigate('/')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [error, navigate])

  return <Loader />
}

export default AuthCallbackPage
