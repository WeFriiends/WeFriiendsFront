import { Address } from '../profile'
import { validateLocation } from './validateLocation'

export const getResolvedAddress = (value: any): Address | null => {
  const resolvedAddress: Address = {
    country: value.addressDetails.country || '',
    city:
      value.addressDetails.city ||
      value.addressDetails.town ||
      value.addressDetails.hamlet ||
      value.addressDetails.village ||
      '',
    street: value.addressDetails.road || '',
    houseNumber: value.addressDetails.house_number || '',
    lat: value.latitude,
    lng: value.longitude,
  }

  return validateLocation(resolvedAddress) ? resolvedAddress : null
}
