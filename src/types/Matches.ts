export interface FriendsMatch {
  id: string
  name: string
  age: number
  photo: string
}

export type MatchEvent = {
  type: 'added' | 'removed'
  userId: string
}
