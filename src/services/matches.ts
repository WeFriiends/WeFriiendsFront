import { ref, off, onChildAdded, onChildRemoved, get } from 'firebase/database'
import { rtdb } from './firebase'
import { MatchEvent } from 'types/Matches'

export function subscribeToMatches(
  userId: string,
  callback: (data: MatchEvent) => void
) {
  const matchesRef = ref(rtdb, `matches/${userId}`)

  const existing = new Set<string>()
  get(matchesRef).then((snapshot) => {
    snapshot.forEach((child) => {
      existing.add(child.key!)
    })
  })

  const added = onChildAdded(matchesRef, async (snapshot) => {
    const key = snapshot.key!

    if (existing.has(key)) {
      existing.delete(key)
      return
    }

    callback({
      type: 'added',
      userId,
    })
  })

  const removed = onChildRemoved(matchesRef, () => {
    callback({ type: 'removed', userId })
  })

  return () => {
    off(matchesRef, 'child_added', added)
    off(matchesRef, 'child_removed', removed)
  }
}
