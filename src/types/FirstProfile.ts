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
  smoking?: string[]
  educationalLevel?: string[]
  children?: string[]
  drinking?: string[]
  pets?: string[]
  interests?: string[]
  questionary?: {
    [key: string]: string | string[]
  }
}

export interface UserPicsType {
  id: string
  url: string | null
  blobFile: Blob | null
  fileName?: string
}
//!!! export interface CloudinaryPhoto {
//   url: string
//   publicId: string
// }
export type Address = {
  country: string
  city: string
  street: string
  houseNumber: string
  lat: number
  lng: number
}
