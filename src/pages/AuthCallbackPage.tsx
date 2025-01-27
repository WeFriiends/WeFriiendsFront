import { useAuth0 } from '@auth0/auth0-react'
import Loader from 'common/svg/Loader'
import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthCallbackPage = () => {
  const { handleRedirectCallback } = useAuth0()
  const navigate = useNavigate()
  const location = useLocation()
  const shouldRedirect = useRef(true)

  useEffect(() => {
    const urlSearchParams = () => {
      const searchParam = new URLSearchParams(location.search)
      const message = searchParam.get('message')
      const errorDescription = searchParam.get('error_description')
      const code = searchParam.has('code')
      const state = searchParam.has('state')
      return { message, errorDescription, code, state }
    }
    const processCallback = async () => {
      try {
        const { message, errorDescription, code, state } = urlSearchParams()

        if (message?.includes('Your email was verified')) {
          navigate('/email-confirmed')
        } else if (
          errorDescription?.includes(
            'Please verify your email before logging in'
          )
        ) {
          navigate('/email-verify')
        } else if (code && state) {
          await handleRedirectCallback()
          navigate('/fill-profile')
        } else {
          console.warn('No valid callback parameters found in URL.')
        }
      } catch (error) {
        console.error('Error during callback:', error)
        console.error(error)
      }
    }

    // This prevents calling handleRedirectCallback() twice, as useEffect is being called twice.
    // See https://community.auth0.com/t/error-invalid-state-when-calling-handleredirectcallback-on-react-app/95329 for details
    if (shouldRedirect.current) {
      shouldRedirect.current = false
      processCallback()
    }
  }, [handleRedirectCallback, navigate, location.search])

  return <Loader />
}

export default AuthCallbackPage
