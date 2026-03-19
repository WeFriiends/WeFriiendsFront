export const PROFILE_ENDPOINTS = {
  nearest: 'profile/nearest',
  search: 'profile/search',
  byId: (id: string) => `profile/${id}`,
} as const

export const MATCHES_ENDPOINT = 'matches'
export const DISLIKES_ENDPOINT = 'dislikes'

export const LIKE_ENDPOINTS = {
  likes: 'likes',
  onMe: 'likes/on-me',
} as const
