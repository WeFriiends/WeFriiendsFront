import axios from 'axios'
import { getAuthHeaders } from 'actions/authHeaders'

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(async (config) => {
  config.headers.set(await getAuthHeaders())
  return config
})

axiosInstance.interceptors.response.use(undefined, (error) => {
  return Promise.reject(error)
})

export default axiosInstance
