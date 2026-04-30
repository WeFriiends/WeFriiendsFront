import { Component, ReactNode, ErrorInfo } from 'react'
import ErrorPage from 'pages/ErrorPage'
import { APP_ROUTES } from 'routes/appRoutes'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class AppErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error in React render:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          code={500}
          onRetry={() => (window.location.href = APP_ROUTES.home)}
        />
      )
    }

    return this.props.children
  }
}

export default AppErrorBoundary
