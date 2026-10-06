type AccessTokenGetter = () => Promise<string>

let accessTokenGetter: AccessTokenGetter | null = null

export const setAccessTokenGetter = (getter: AccessTokenGetter) => {
  accessTokenGetter = getter
}

// The getter is Auth0's getAccessTokenSilently: it returns the cached token
// and renews it via the refresh token once expired, so call it per request.
export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  if (!accessTokenGetter) return {}

  try {
    const token = await accessTokenGetter()
    return { Authorization: `Bearer ${token}` }
  } catch (error) {
    // No token (session ended) — send the request as is so the backend answers 401
    console.error('Failed to get access token:', error)
    return {}
  }
}
