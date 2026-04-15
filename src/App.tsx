import { useRoutes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import theme from 'styles/createTheme'
import routes from 'routes/Routes'
import { Auth0ProviderWithNavigate } from 'provider/Auth0ProviderWithNavigate'
import GenderRedirectGuard from 'components/userAuth/GenderRedirectGuard'
import AppErrorBoundary from 'components/errorContent/AppErrorBoundary'
import './App.css'

const App = () => {
  const content = useRoutes(routes)
  return (
    <Auth0ProviderWithNavigate>
      <ThemeProvider theme={theme}>
        <AppErrorBoundary>
          <GenderRedirectGuard>{content}</GenderRedirectGuard>
        </AppErrorBoundary>
      </ThemeProvider>
    </Auth0ProviderWithNavigate>
  )
}

export default App
