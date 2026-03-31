import axiosInstance from './axiosInstance'

interface Profile {
  name: string
  dateOfBirth: string
  location: Location
  files: (string | { url: string })[]
  gender: string
  reasons: string[]
  preferences?: Preferences
}

interface Preferences {
  aboutMe?: string
  selectedLanguages?: string[]
  smoking?: string[]
  educationalLevel?: string[]
  children?: string[]
  drinking?: string[]
  pets?: string[]
  interests?: string[]
}

const BASE = 'profile'

export async function createProfile(data: Profile) {
  const response = await axiosInstance.post(`${BASE}/`, data)
  return response.data
}

export async function updateProfile(data: Profile) {
  const response = await axiosInstance.patch(`${BASE}/`, data)
  return response.data
}

export async function deleteProfile() {
  const response = await axiosInstance.delete(`${BASE}/`)
  return response.data
}

export async function getCurrentProfile() {
  const response = await axiosInstance.get(`${BASE}/`)
  return response.data
}

export async function checkCurrentProfile() {
  const response = await axiosInstance.get(`${BASE}/check`)
  return response.data
}
