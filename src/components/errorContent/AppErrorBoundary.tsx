import { Component, ReactNode, ErrorInfo } from 'react'
import ErrorPage from 'pages/ErrorPage'

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
    console.error('Uncaught error in React render:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorPage code={500} />
    }

    return this.props.children
  }
}

export default AppErrorBoundary
