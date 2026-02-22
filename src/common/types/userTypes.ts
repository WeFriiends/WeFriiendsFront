export type UserObjectType = {
  likedUsers: string[]
  id: string
  location: string
  picture: string
  name: string
}

export interface UserMiniProfile {
  id: string
  name: string
  distance: number
  picture: string | null
}
