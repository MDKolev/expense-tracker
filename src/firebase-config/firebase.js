import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCQxOOLWoXgiEFiYbvKanl2uGfLkL-Gxvc",
  authDomain: "expense-tracker-a0da0.firebaseapp.com",
  projectId: "expense-tracker-a0da0",
  storageBucket: "expense-tracker-a0da0.appspot.com",
  messagingSenderId: "724309687308",
  appId: "1:724309687308:web:87a56b1219d56b7d9b0229"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider();