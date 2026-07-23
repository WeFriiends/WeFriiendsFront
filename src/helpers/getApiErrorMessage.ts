import axios from 'axios'

interface ApiErrorResponse {
  message?: string
}

export interface ParsedApiError {
  message: string | null
  status: number | null
}

export const parseApiError = (error: unknown): ParsedApiError => {
  // axios error
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return {
      message: error.response?.data?.message || error.message || null,
      status: error.response?.status ?? null,
    }
  }

  // standard Error
  if (error instanceof Error) {
    return {
      message: error.message,
      status: null,
    }
  }

  return {
    message: null,
    status: null,
  }
}

export const getApiErrorMessage = (error: unknown): string | null => {
  const parsed = parseApiError(error)
  return parsed.message
}
