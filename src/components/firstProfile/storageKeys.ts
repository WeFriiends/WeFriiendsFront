export const REGISTRATION_STORAGE_KEYS = {
  name: 'reg_name',
  dob: 'reg_dob',
  gender: 'reg_gender',
  country: 'reg_country',
  city: 'reg_city',
  street: 'reg_street',
  houseNumber: 'reg_houseNumber',
  lat: 'reg_lat',
  lng: 'reg_lng',
  selectedStatuses: 'reg_selectedStatuses',
  userPreferences: 'reg_userPreferences',
} as const

export const PROFILE_EDIT_STORAGE_KEYS = {
  selectedStatuses: 'edit_selectedStatuses',
  userPreferences: 'edit_userPreferences',
} as const
