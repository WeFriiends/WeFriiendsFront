import { clearLocalStorage, clearLocalStorageByPrefix } from './localStorage'
import { useAuthStore } from '../zustand/store'
import { AUTH_STORAGE_KEY, AUTH0_STORAGE_PREFIX } from 'data/constants'

/**
 * Utility function to handle logout process
 * Clears all data from localStorage
 * By default, redirects to the login page after logout
 * @param logoutFn - The Auth0 logout function
 * @param returnTo - The URL to redirect to after logout
 */
export const handleLogout = (
  logoutFn: (options: { logoutParams: { returnTo: string } }) => void,
  returnTo: string = window.location.origin + '/'
) => {
  // Clear localStorage
  clearLocalStorage([AUTH_STORAGE_KEY])
  clearLocalStorageByPrefix(AUTH0_STORAGE_PREFIX)

  // Reset the auth store state
  const resetAuthStore = useAuthStore.getState().setToken
  resetAuthStore(null)

  // Call Auth0 logout function
  logoutFn({
    logoutParams: {
      returnTo,
      // todo: needed? federated: true,
    },
  })
}
