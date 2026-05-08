import { useEffect, useRef } from 'react'
import { useProfileStore } from 'zustand/store'
import { UserPicsType } from 'types/FirstProfile'

export function useRestorePhotos() {
  const { setTempPhotos, data } = useProfileStore()
  const restoredRef = useRef(false)

  useEffect(() => {
    if (restoredRef.current || !data?.photos?.length) return
    restoredRef.current = true
    const restored: UserPicsType[] = data.photos.map((photo, i) => ({
      id: `url-${i}`,
      url: typeof photo === 'string' ? photo : photo.url,
      blobFile: null,
    }))
    setTempPhotos(restored)
  }, [data?.photos, setTempPhotos])
}
