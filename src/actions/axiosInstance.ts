import axios from 'axios'
import { useAuthStore } from 'zustand/store'

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  // 🔧 ТЕСТ: реальный запрос, который висит 60с — чтобы сработал timeout
  if (config.url?.includes('nearest')) {
    return { ...config, baseURL: '', url: 'https://httpbin.org/delay/60' }
  }

  const { token } = useAuthStore.getState()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(undefined, (error) => {
  return Promise.reject(error)
})

export default axiosInstance
