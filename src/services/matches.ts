import { ref, onChildAdded, onChildRemoved, get } from 'firebase/database'
import { rtdb } from './firebase'
import { MatchEvent } from 'types/Matches'

export function subscribeToMatches(
  userId: string,
  callback: (data: MatchEvent) => void
) {
  const matchesRef = ref(rtdb, `matches/${userId}`)
  let initialized = false

  const existing = new Set<string>()

  const unsubscribeAdded = onChildAdded(matchesRef, async (snapshot) => {
    const key = snapshot.key!

    if (!initialized) {
      existing.add(key)
      return
    }

    if (existing.has(key)) {
      existing.delete(key)
      return
    }

    callback({
      type: 'added',
      userId,
    })
  })

  get(matchesRef).then((snapshot) => {
    snapshot.forEach((child) => {
      existing.add(child.key!)
    })

    initialized = true
  })

  const unsubscribeRemoved = onChildRemoved(matchesRef, () => {
    callback({ type: 'removed', userId })
  })

  return () => {
    unsubscribeAdded()
    unsubscribeRemoved()
  }
}
