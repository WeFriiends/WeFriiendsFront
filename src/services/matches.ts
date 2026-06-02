import { ref, off, onChildAdded, onChildRemoved, get } from 'firebase/database'
import { rtdb } from './firebase'
import { MatchEvent } from 'types/Matches'

export function subscribeToMatches(
  userId: string,
  callback: (data: MatchEvent) => void
) {
  const matchesRef = ref(rtdb, `user_matches/${userId}`)

  const added = onChildAdded(matchesRef, async (snapshot) => {
    const matchId = snapshot.key!

    const matchDataRef = ref(rtdb, `matches/${matchId}`)
    const matchSnapshot = await get(matchDataRef)
    const matchData = matchSnapshot.val()

    callback({
      type: 'added',
      userId,
      createdAt: matchData?.createdAt,
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
