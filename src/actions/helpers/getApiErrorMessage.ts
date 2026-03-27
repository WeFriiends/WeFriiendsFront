import axios from 'axios'

type ApiErrorResponse = {
  message?: string
}

export const getApiErrorMessage = (error: unknown): string | null => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message || null
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return null
}
