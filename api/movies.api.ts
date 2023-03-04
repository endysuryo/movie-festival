import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { firebaseInit } from '~/utils/firebase'

async function getMoviesApi() {
  const data: any = []
  const db = firebaseInit().db
  const result = await getDocs(collection(db, 'movies'))
  result.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  return data
}

async function getDetailMoviesApi(id: string) {
  const db = firebaseInit().db
  const docRef = doc(db, 'movies', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  }

  return null
}

async function createMoviesApi(data: any) {
  const db = firebaseInit().db
  const result = await addDoc(collection(db, 'movies'), data)

  return result.id
}

async function updateMoviesApi(id: string, data: any) {
  const db = firebaseInit().db
  const dataRef = doc(db, 'movies', id)

  return await updateDoc(dataRef, data)
}

async function deleteMoviesApi(id: string) {
  const db = firebaseInit().db
  return await deleteDoc(doc(db, 'movies', id))
}

export {
  getMoviesApi,
  createMoviesApi,
  updateMoviesApi,
  deleteMoviesApi,
  getDetailMoviesApi,
}
