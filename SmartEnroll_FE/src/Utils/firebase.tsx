import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4ISCnozxGbWftoi0eRns63p6ZgT2KuO8",
  authDomain: "smartenrol-a256b.firebaseapp.com",
  projectId: "smartenrol-a256b",
  storageBucket: "smartenrol-a256b.firebasestorage.app",
  messagingSenderId: "254867808338",
  appId: "1:254867808338:web:d0d2d677f8645d596e3f8b",
  measurementId: "G-K2JEXSV4Y7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

export { auth, db, storage };
