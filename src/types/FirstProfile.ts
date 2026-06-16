export interface Location {
  lat: number
  lng: number
  country: string
  city: string
  street: string
  houseNumber: string
}

export interface UserPicsType {
  id: string
  url: string | null
  blobFile?: Blob | null
  fileName?: string
  replacedUrl?: string
}

export interface UserPreferences {
  aboutMe?: string
  language?: string[]
  smoking?: string
  education?: string
  children?: string
  drink?: string
  pets?: string[]
  interests?: string[]
  questionary?: {
    [key: string]: string | string[]
  }
}

export interface ProfilePreferences {
  aboutMe?: string
  selectedLanguages?: string[]
  smoking?: string[]
  educationalLevel?: string[]
  children?: string[]
  drinking?: string[]
  pets?: string[]
  interests?: string[]
}

export type SavedPreferences = ProfilePreferences & {
  [key: string]: unknown
}

export interface Profile {
  id: string
  name: string
  dateOfBirth: Date
  zodiacSign?: string
  location: Location
  gender: string
  reasons: string[]
  photos: (string | UserPicsType)[]
  preferences?: UserPreferences
}
