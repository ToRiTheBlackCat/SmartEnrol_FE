import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTLktW_Qy0Vm4cdLnefhSLWDLUlY8PSAs",
  authDomain: "auth-try-1eab5.firebaseapp.com",
  projectId: "auth-try-1eab5",
  storageBucket: "auth-try-1eab5.appspot.com",
  messagingSenderId: "949377894898",
  appId: "1:949377894898:web:866d9a32603e016c10436b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

export { auth, db, storage };