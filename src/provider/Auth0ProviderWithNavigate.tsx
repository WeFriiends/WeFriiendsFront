import { AppState, Auth0Provider } from '@auth0/auth0-react'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from 'routes/appRoutes'
import AuthTokenAndStoreProvider from './AuthTokenAndStoreProvider'

interface Auth0ProviderWithNavigateProps {
  children: ReactNode
}

export const Auth0ProviderWithNavigate = ({
  children,
}: Auth0ProviderWithNavigateProps) => {
  const navigate = useNavigate()

  const domain = process.env.REACT_APP_AUTH0_DOMAIN
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
  const redirectUri = `${window.location.origin}/${APP_ROUTES.callback}`

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || APP_ROUTES.home)
  }

  if (!(domain && clientId)) {
    return null
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: `https://${domain}/api/v2/`,
        scope: 'read:current_user',
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      useCookiesForTransactions={true}
    >
      <AuthTokenAndStoreProvider>{children}</AuthTokenAndStoreProvider>
    </Auth0Provider>
  )
}
