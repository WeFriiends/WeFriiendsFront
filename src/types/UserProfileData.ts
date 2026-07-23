import { UserPreferences } from './FirstProfile'

// A profile photo is just its URL. Aliased so that, if a photo ever needs
// extra fields (id, order…), only this line changes
export type ProfilePhoto = string

export interface UserProfileData {
  id: string
  name: string
  age: string
  photos: ProfilePhoto[]
  city: string
  distance: string
  likedMe: boolean
  reasons: string[]
  preferences?: UserPreferences
  likedByMe?: boolean
}

export type UserProfileDataShort = Pick<
  UserProfileData,
  'id' | 'name' | 'age' | 'photos'
>

export const emptyProfile: UserProfileData = {
  id: '-1',
  name: '',
  age: '',
  photos: [],
  city: '',
  distance: '',
  likedMe: false,
  reasons: [],
  preferences: {},
}

export interface UserChatProfile {
  id: string
  avatar: string
  name: string
  age: string
}

export interface ApiErrorResponse {
  message: string
  status?: number
  data?: unknown
}
