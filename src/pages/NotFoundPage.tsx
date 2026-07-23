import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import ErrorPage from './ErrorPage'
import { APP_ROUTES } from 'routes/appRoutes'

export const NotFoundPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth0()

  return (
    <ErrorPage
      code={404}
      onRetry={() =>
        navigate(isAuthenticated ? `/${APP_ROUTES.friends}` : APP_ROUTES.home)
      }
    />
  )
}
