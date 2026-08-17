import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBuW4fo1_ta9B7xFdozsi8xdswLzSOHbyE',
  authDomain: 'mtm6404-contact-book-a2001.firebaseapp.com',
  projectId: 'mtm6404-contact-book-a2001',
  storageBucket: 'mtm6404-contact-book-a2001.firebasestorage.app',
  messagingSenderId: '181778567590',
  appId: '1:181778567590:web:d6060ef3593f7d496cbf67'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db