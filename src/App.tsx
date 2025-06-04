import { useRoutes } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from '@mui/material'
import { ActivePageProvider } from './context/activePageContext'
import theme from 'styles/createTheme'
import routes from './routes/Routes'
import { Auth0ProviderWithNavigate } from 'provider/Auth0ProviderWithNavigate'
import GenderRedirectGuard from './components/userAuth/GenderRedirectGuard'

const App = () => {
  const content = useRoutes(routes)
  return (
    <Auth0ProviderWithNavigate>
      <ThemeProvider theme={theme}>
        <ActivePageProvider>
          <GenderRedirectGuard>{content}</GenderRedirectGuard>
        </ActivePageProvider>
      </ThemeProvider>
    </Auth0ProviderWithNavigate>
  )
}

export default App
