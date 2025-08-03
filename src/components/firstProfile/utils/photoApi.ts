// utils/photoApi.ts
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080' // тот же порт и хост, что и для профиля

export async function uploadFiles(
  files: File[],
  token: string
): Promise<string[]> {
  const fd = new FormData()
  files.forEach((file) => fd.append('images', file))
  console.log('🔐 Token:', token?.slice(0, 20)) // только часть токена, для безопасности
  console.log(
    '📁 Files:',
    files.map((f) => f.name)
  )

  const { data } = await axios.post(`${API_BASE_URL}/api/photos/upload`, fd, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })

  return data // ожидается массив URL строк
}
