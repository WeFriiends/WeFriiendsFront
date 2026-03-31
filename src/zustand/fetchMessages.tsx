import { useEffect, useRef } from 'react'
import useSWRInfinite from 'swr/infinite'
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore'
import { db } from 'services/firebase'
import { Message } from 'types/Chat'

type MessageData = {
  messages: Message[]
  lastDoc: QueryDocumentSnapshot<DocumentData> | null
}

async function fetchNextMessages(_key: string, previousPageData: MessageData) {
  const messagesRef = collection(db, 'messages')
  let q = query(messagesRef, orderBy('createdAt', 'desc'), limit(10))

  if (previousPageData.lastDoc) {
    q = query(
      messagesRef,
      orderBy('createdAt', 'desc'),
      startAfter(previousPageData.lastDoc),
      limit(10)
    )
  }

  const snapshot = await getDocs(q)
  const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

  return {
    messages,
    lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
  }
}
