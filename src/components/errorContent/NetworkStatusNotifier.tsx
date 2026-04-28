import { useEffect, useRef } from 'react'
import { useNetworkStatus } from 'hooks/useNetworkStatus'
import { useSnackbarStore } from 'zustand/snackbarStore'
import { NETWORK_MESSAGES } from 'data/networkMessages'

export function NetworkStatusNotifier() {
  const isOnline = useNetworkStatus()
  const showSnackbar = useSnackbarStore((s) => s.showSnackbar)
  const prevOnlineStatus = useRef<boolean>(isOnline)

  useEffect(() => {
    if (prevOnlineStatus.current === isOnline) {
      return
    }

    if (!isOnline) {
      showSnackbar(
        `${NETWORK_MESSAGES.OFFLINE} ${NETWORK_MESSAGES.CHECK_CONNECTION}`,
        'error'
      )
    } else {
      showSnackbar(NETWORK_MESSAGES.ONLINE, 'success')
    }

    // Update the ref for the next change
    prevOnlineStatus.current = isOnline
  }, [isOnline, showSnackbar])

  return null
}
