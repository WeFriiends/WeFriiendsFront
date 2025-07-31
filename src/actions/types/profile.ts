interface Location {
  lat: number
  lng: number
  country: string
  city: string
  street: string
  houseNumber: string
}

interface Profile {
  id: string
  name: string
  dateOfBirth: Date
  zodiacSign?: string
  location: Location
  gender: string
  reasons: string[]
  photos: string[]
}
