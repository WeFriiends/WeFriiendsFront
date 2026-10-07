import axios from 'axios'
import { getAuthHeaders } from 'actions/authHeaders'

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/profile`

const request = async (method, url, data = {}, params = {}) => {
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    }

    return await axios({
      method,
      url: `${API_BASE_URL}${url}`,
      data,
      headers,
      params,
    })
  } catch (error) {
    console.error(`API ${method} ${url} failed:`, error)

    throw {
      data: error.response?.data,
      status: error.response?.status,
      message: error.message,
    }
  }
}

export const createProfile = (profileData) => request('post', '/', profileData)
export const getProfile = () => request('get', '/')
export const checkProfile = () => request('get', '/check')
export const updateProfile = (profileData) => request('patch', '/', profileData)
export const deleteProfile = () => request('delete', '/')
export const getUserById = async (userId) => {
  try {
    const response = await request('get', `/${userId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching user profile with userId=${userId}:`, error)
    throw error
  }
}
