import { db } from './firebase'
import { MatchEvent } from 'types/Matches'
import { collection, query, onSnapshot, where } from 'firebase/firestore'

export function subscribeToMatches(
  userId: string,
  callback: (data: MatchEvent) => void
) {
  let initialized = false

  const q = query(
    collection(db, 'matches'),
    where('users', 'array-contains', userId)
  )

  return onSnapshot(
    q,
    (snapshot) => {
      if (!initialized) {
        initialized = true
        return
      }
      snapshot.docChanges().forEach((change) => {
        callback({
          type: change.type,
          userId,
        } as MatchEvent)
      })
    },
    (err) => {
      console.error(err)
    }
  )
}
