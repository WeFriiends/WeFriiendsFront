import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// import { getAuth, onAuthStateChanged } from 'firebase/auth'

// const auth = getAuth()
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log('User is signed in:', user)
//   } else {
//     console.log('No user is signed in')
//   }
// })

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)

export { db }
