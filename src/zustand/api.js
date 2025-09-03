import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/profile'

const request = async (method, url, data = {}, token = null) => {
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return await axios({
      method,
      url: `${API_BASE_URL}${url}`,
      data,
      headers,
    })
  } catch (error) {
    console.error(`API ${method} ${url} failed:`, error)
    throw error.response?.data || error.message
  }
}

export const createProfile = (profileData, token) =>
  request('post', '/', profileData, token)
export const getProfile = (token) => request('get', '/', {}, token)
export const checkProfile = (token) => request('get', '/check', {}, token)
export const updateProfile = (profileData, token) =>
  request('patch', '/', profileData, token)
export const deleteProfile = (token) => request('delete', '/', {}, token)
