import axios from 'axios'
import { UserPicsType } from 'types/FirstProfile'

/**
 * Загружает файлы на бек и возвращает cloudinary‑URL‑ы
 */
export async function uploadFiles(files: UserPicsType[], token: string) {
  const fd = new FormData()
  files.forEach((f) => f.blobFile && fd.append('images', f.blobFile))

  const { data } = await axios.post<string[]>('/api/photos/upload', fd, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })

  return data // массив строк‑URL
}
