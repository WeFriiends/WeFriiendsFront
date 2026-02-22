import { useContext } from 'react'
import { WhoLikedMeContext } from 'context/whoLikedMeContext'

export function useWhoLikedMeContext() {
  const context = useContext(WhoLikedMeContext)

  if (!context) {
    throw Error("can't use outside of provider")
  }

  return context
}
