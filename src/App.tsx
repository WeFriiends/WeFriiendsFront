import { useRoutes } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from '@mui/material'
import { ActivePageProvider } from './context/activePageContext'
import theme from 'styles/createTheme'
import { DialogProvider } from 'context/dialogContext'
import routes from './routes/Routes'
import { Auth0ProviderWithNavigate } from 'provider/Auth0ProviderWithNavigate'

const App = () => {
  const content = useRoutes(routes)
  return (
    <Auth0ProviderWithNavigate>
      <ThemeProvider theme={theme}>
        <DialogProvider>
          <ActivePageProvider>{content}</ActivePageProvider>
        </DialogProvider>
      </ThemeProvider>
    </Auth0ProviderWithNavigate>
  )
}

export default App
