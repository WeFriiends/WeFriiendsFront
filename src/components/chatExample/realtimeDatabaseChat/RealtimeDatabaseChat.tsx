import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, onValue, set } from 'firebase/database'
import React, { useState, useEffect } from 'react'
//import { firebaseConfig } from './FirebaseConfig'

/*
 * Firebase Realtime Database to store and manage your chat data
 * Initialization: You're initializing Firebase and getting a reference to the Realtime Database using initializeApp and getDatabase .
 * References: You're creating references to specific locations in the database using ref . For example, messagesRef = ref(db, rooms/${roomId}/messages ) points to the messages within a specific room.
 * Data Retrieval: You're using onValue to listen for changes in the database and update your component's state with the retrieved data.
 * Data Writing: You're using push to create new child nodes in the database and set to write data to those nodes. For example, you're using push to add new messages to the messages node and set to write the message data.
 * DB: https://console.firebase.google.com/u/0/project/wefriiends-cd7a3/database/wefriiends-cd7a3-default-rtdb/data/~2Frooms~2Froom2
 * Examples: https://firebase.google.com/docs/samples/
 */

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

interface Message {
  id: string
  sender: string
  message: string
  timestamp: number
}

interface ChatComponentProps {
  roomId: string
  userName: string // Add userName prop
}

function RealtimeDatabaseChat({ roomId, userName }: ChatComponentProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const messagesRef = ref(db, `rooms/${roomId}/messages`) // Reference to messages in the specific room

  useEffect(() => {
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val()
      if (isObject(data)) {
        const messagesArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        })) as Message[]
        setMessages(messagesArray)
      } else {
        setMessages([])
      }
    })

    return () => unsubscribe()
  }, [roomId, messagesRef]) // Include roomId in dependency array

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value)
  }

  function isObject(value: any): value is object {
    return typeof value === 'object' && value !== null
  }

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessageRef = push(messagesRef)
      set(newMessageRef, {
        sender: userName, // Use userName prop for sender
        message: newMessage,
        timestamp: Date.now(),
        readStatus: false,
      })
      setNewMessage('')
    }
  }

  return (
    <div>
      <h2>Chat Room {roomId}</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.sender}:</strong> {message.message}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Enter your message"
        />
        <button onClick={sendMessage}>Send as {userName}</button>
      </div>
    </div>
  )
}

export default RealtimeDatabaseChat
