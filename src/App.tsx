import { useRoutes } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from '@mui/material'
import theme from 'styles/createTheme'
import routes from './routes/Routes'
import { Auth0ProviderWithNavigate } from 'provider/Auth0ProviderWithNavigate'
import GenderRedirectGuard from './components/userAuth/GenderRedirectGuard'
import { useConversationsSubscription } from 'zustand/useConversationsSubscription'

const App = () => {
  const content = useRoutes(routes)
  useConversationsSubscription()
  return (
    <Auth0ProviderWithNavigate>
      <ThemeProvider theme={theme}>
        <GenderRedirectGuard>{content}</GenderRedirectGuard>
      </ThemeProvider>
    </Auth0ProviderWithNavigate>
  )
}

export default App
