export interface UserMiniProfile {
  id: string
  name: string
  distance: number
  picture: string | null
  likedUsers?: boolean
}
