import axios from 'axios'
import { getAuthHeaders } from 'actions/authHeaders'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export async function uploadFiles(files: File[]): Promise<string[]> {
  const fd = new FormData()
  files.forEach((file) => fd.append('images', file))

  const { data } = await axios.post<string[]>(
    `${API_BASE_URL}/api/photos/upload`,
    fd,
    {
      headers: {
        ...(await getAuthHeaders()),
        'Content-Type': 'multipart/form-data',
      },
    }
  )

  return data
}
