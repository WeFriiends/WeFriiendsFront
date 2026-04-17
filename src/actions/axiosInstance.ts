import axios from 'axios'
import { useAuthStore } from 'zustand/store'
import { useSnackbarStore } from 'zustand/snackbarStore'
import { NETWORK_MESSAGES } from 'data/networkMessages'

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(undefined, (error) => {
  if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
    useSnackbarStore
      .getState()
      .showSnackbar(
        `${NETWORK_MESSAGES.OFFLINE} ${NETWORK_MESSAGES.CHECK_CONNECTION}`,
        'error'
      )
  }
  return Promise.reject(error)
})

export default axiosInstance
