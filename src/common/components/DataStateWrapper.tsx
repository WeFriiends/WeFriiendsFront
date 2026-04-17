import { ReactNode } from 'react'
import { useNetworkStatus } from 'hooks/useNetworkStatus'
import { parseApiError } from 'helpers/getApiErrorMessage'
import { LocalErrorDisplay } from 'common/components/LocalErrorDisplay'
import { NETWORK_MESSAGES } from 'data/networkMessages'
import Loader from './Loader'

interface DataStateWrapperProps {
  isLoading: boolean
  error?: unknown
  hasData?: boolean
  children: ReactNode
  onRetry?: () => void
}

/**
 * A wrapper component that handles loading, error, and offline states for data-fetching pages.
 * It prevents unmounting of cached UI (hasData = true) when the network drops
 * but shows full-screen errors for initial load failures.
 */
export const DataStateWrapper = ({
  isLoading,
  error,
  hasData = false,
  children,
  onRetry,
}: DataStateWrapperProps) => {
  const isOnline = useNetworkStatus()

  // 1. Initial load + Offline -> Show local offline message
  if (!isOnline && !hasData) {
    return (
      <LocalErrorDisplay
        title={NETWORK_MESSAGES.NO_DATA}
        message={NETWORK_MESSAGES.CHECK_CONNECTION}
      />
    )
  }

  // 2. Initial load + Server Error -> Show local server error
  if (error && !hasData) {
    const { status, message } = parseApiError(error)
    return (
      <LocalErrorDisplay
        title={NETWORK_MESSAGES.NO_DATA}
        message={`${message} (${status || 'Unknown error'})`}
        onRetry={onRetry}
      />
    )
  }

  // 3. Initial load -> Show full screen loader
  if (isLoading && !hasData) {
    return <Loader />
  }

  // Final safety: If no data and no error/loading, but we are supposed to have data,
  // we just return null to avoid blank content.
  if (!hasData && !isLoading && !error) {
    return null
  }

  return <>{children}</>
}
