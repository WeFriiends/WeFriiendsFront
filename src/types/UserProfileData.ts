import { UserPreferences } from './FirstProfile'

export interface UserPhoto {
  src: string
}

export interface UserProfileData {
  id: string
  name: string
  age: string
  photos: UserPhoto[]
  city: string
  distance: string
  likedMe: boolean
  reasons: string[]
  preferences?: UserPreferences
}

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
