import { useRoutes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { SWRConfig } from 'swr'
import theme from 'styles/createTheme'
import routes from 'routes/Routes'
import { Auth0ProviderWithNavigate } from 'provider/Auth0ProviderWithNavigate'
import GenderRedirectGuard from 'components/userAuth/GenderRedirectGuard'
import AppErrorBoundary from 'components/errorContent/AppErrorBoundary'
import { NetworkStatusNotifier } from 'components/errorContent/NetworkStatusNotifier'
import { GlobalSnackbar } from 'common/components/GlobalSnackbar'
import './App.css'

const App = () => {
  const content = useRoutes(routes)
  return (
    <Auth0ProviderWithNavigate>
      <ThemeProvider theme={theme}>
        <SWRConfig
          value={{
            errorRetryCount: 3,
            errorRetryInterval: 3000,
          }}
        >
          <AppErrorBoundary>
            <GenderRedirectGuard>{content}</GenderRedirectGuard>
            <NetworkStatusNotifier />
            <GlobalSnackbar />
          </AppErrorBoundary>
        </SWRConfig>
      </ThemeProvider>
    </Auth0ProviderWithNavigate>
  )
}

export default App
