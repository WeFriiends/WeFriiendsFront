import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react'
import { UserProfileData } from 'types/UserProfileData'

interface Context {
  selectedUserId: string | null
  setSelectedUserId: Dispatch<SetStateAction<string | null>>
  likedUser: UserProfileData | null
  setLikedUser: Dispatch<SetStateAction<UserProfileData | null>>
}

export const WhoLikedMeContext = createContext<Context | null>(null)

export function WhoLikedMeProvider({ children }: { children: ReactNode }) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [likedUser, setLikedUser] = useState<UserProfileData | null>(null)

  const value = useMemo(
    () => ({ selectedUserId, setSelectedUserId, likedUser, setLikedUser }),
    [likedUser, selectedUserId]
  )

  return (
    <WhoLikedMeContext.Provider value={value}>
      {children}
    </WhoLikedMeContext.Provider>
  )
}
