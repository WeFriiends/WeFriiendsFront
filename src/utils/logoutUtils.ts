import { clearLocalStorageByPrefix } from './localStorage'
import { clearSessionStorage } from './sessionStorage'
import { markLogoutStarted } from 'actions/authHeaders'
import { AUTH0_STORAGE_PREFIX } from 'data/constants'
import {
  REGISTRATION_STORAGE_KEYS,
  PROFILE_EDIT_STORAGE_KEYS,
} from 'components/firstProfile/storageKeys'

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
  markLogoutStarted()

  // Clear localStorage
  clearLocalStorageByPrefix(AUTH0_STORAGE_PREFIX)

  clearSessionStorage([
    ...Object.values(REGISTRATION_STORAGE_KEYS),
    ...Object.values(PROFILE_EDIT_STORAGE_KEYS),
  ])

  // Call Auth0 logout function
  logoutFn({
    logoutParams: {
      returnTo,
      // todo: needed? federated: true,
    },
  })
}
