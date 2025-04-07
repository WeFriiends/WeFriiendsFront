export interface Location {
  lat: number
  lng: number
  country: string
  city: string
  street: string
  houseNumber: string
}

export interface UserPreferences {
  aboutMe?: string
  selectedLanguages?: string[]
  Smoking?: string[]
  EducationalLevel?: string[]
  Children?: string[]
  Drinking?: string[]
  Pets?: string[]
  Interests?: string[]
}

export interface UserPicsType {
  id: string
  url: string
  blobFile: Blob | null
}
