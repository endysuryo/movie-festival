/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const firebaseInit = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyCQ_FDoxT1t7Uq5HZYVapVa9r-msA8DIJg',
    authDomain: 'movie-festival-4fffd.firebaseapp.com',
    projectId: 'movie-festival-4fffd',
    storageBucket: 'movie-festival-4fffd.appspot.com',
    messagingSenderId: '29999201551',
    appId: '1:29999201551:web:4c7cda3bcd1931e216527a',
    measurementId: 'G-K6HJ2ZPYYN',
  }

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const analytics = getAnalytics(app)

  return { app, db, analytics }
}

export { firebaseInit }
