import { GenericError } from '@auth0/auth0-react'

type AccessTokenGetter = () => Promise<string>

// Auth0 error codes meaning the refresh token is gone or expired
const SESSION_ENDED_ERRORS = [
  'invalid_grant',
  'login_required',
  'missing_refresh_token',
]

let accessTokenGetter: AccessTokenGetter | null = null
let onSessionEnded: (() => void) | null = null
let logoutInProgress = false

export const setAuthHandlers = (
  getter: AccessTokenGetter,
  sessionEndedHandler: () => void
) => {
  accessTokenGetter = getter
  onSessionEnded = sessionEndedHandler
}

export const isSessionEndedError = (error: unknown): boolean =>
  error instanceof GenericError && SESSION_ENDED_ERRORS.includes(error.error)

// Set by every logout, not only on session end: once the SDK cache is cleared,
// token errors are expected and must not be taken for an expired session
export const markLogoutStarted = () => {
  logoutInProgress = true
}

export const isLogoutInProgress = () => logoutInProgress

// Never resolves: keeps callers pending until the logout redirect unloads the page,
// so they neither render 401 errors nor start their own redirects
export const waitForLogoutRedirect = () => new Promise<never>(() => undefined)

// Parallel requests fail together — log out once
export const handleSessionEnded = () => {
  if (logoutInProgress || !onSessionEnded) return
  markLogoutStarted()
  onSessionEnded()
}

// The getter is Auth0's getAccessTokenSilently: it returns the cached token
// and renews it via the refresh token once expired, so call it per request.
export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  if (!accessTokenGetter) return {}
  if (logoutInProgress) return waitForLogoutRedirect()

  try {
    const token = await accessTokenGetter()
    return { Authorization: `Bearer ${token}` }
  } catch (error) {
    if (isSessionEndedError(error)) {
      handleSessionEnded()
      return waitForLogoutRedirect()
    }
    console.error('Failed to get access token:', error)
    return {}
  }
}
