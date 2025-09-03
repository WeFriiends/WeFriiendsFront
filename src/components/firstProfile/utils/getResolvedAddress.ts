import { Location } from 'types/FirstProfile'
import { validateLocation } from './validateLocation'

export const getResolvedAddress = (value: any): Location | null => {
  const resolvedAddress: Location = {
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
