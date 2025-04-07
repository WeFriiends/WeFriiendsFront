import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

const LIMIT = 7

type GeoLocation = {
  latitude: number
  longitude: number
}

type AddressDetails = {
  house_number?: string
  road?: string
  suburb?: string
  city?: string
  state?: string
  postcode?: string
  country?: string
}

type LocationInfo = GeoLocation & {
  displayName: string
  addressDetails?: AddressDetails
}

type ResponseItem = {
  display_name: string
  lat: string
  lon: string
  address: AddressDetails
  boundingbox: string[]
}

function parseCoordinate(coordinate: string): number {
  return Number.parseFloat(coordinate.substring(0, LIMIT))
}

export const useSuggestedLocations = (
  location: string,
  bounceDuration: number,
  limit: number
) => {
  const [debouncedValue, _] = useDebounceValue<string>(location, bounceDuration)
  const [addresses, setAddresses] = useState<LocationInfo[]>([])

  useEffect(() => {
    async function getSuggestions() {
      if (debouncedValue.length < 4) {
        setAddresses([])
        return
      }
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${debouncedValue}&format=jsonv2&limit=${limit}`
        )
        const suggestions: LocationInfo[] = response.data.map(
          ({ display_name, lat, lon, address, boundingbox }: ResponseItem) => ({
            displayName: display_name,
            latitude: parseCoordinate(lat),
            longitude: parseCoordinate(lon),
            addressDetails: address,
            boundingbox,
          })
        )

        const uniqueSuggestions = [
          ...new Map(
            suggestions.map((item) => [item.displayName, item])
          ).values(),
        ]
        setAddresses(uniqueSuggestions)
      } catch (error) {
        console.error(error)
      }
    }

    getSuggestions()
  }, [debouncedValue, limit])

  return addresses
}
