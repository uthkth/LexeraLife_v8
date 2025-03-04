import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDjpP16Yhzt07eOlpKmOa7ehTle7gMasc",
  authDomain: "lexeralife-game.firebaseapp.com",
  projectId: "lexeralife-game",
  storageBucket: "lexeralife-game.firebasestorage.app",
  messagingSenderId: "584803756633",
  appId: "1:584803756633:web:f7669987a7a1edddcadf48",
  measurementId: "G-Q69P5H1F76",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export { db, auth }

