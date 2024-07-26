interface Location {
  lat: number
  lng: number
  country: string
  city: string
}

interface Profile {
  _id: string
  name: string
  dateOfBirth: Date
  zodiacSign?: string
  location?: Location
  gender?: string
  reasons?: string[]
  photos: string[]
}
