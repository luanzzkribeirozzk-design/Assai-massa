import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDFQVFQGXvP6CISwo8kgwauAcSCHIQ_ek",
  authDomain: "assaiteria-f2597.firebaseapp.com",
  projectId: "assaiteria-f2597",
  storageBucket: "assaiteria-f2597.firebasestorage.app",
  messagingSenderId: "725325088259",
  appId: "1:725325088259:web:cf3645525252ae0fbb7036"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
