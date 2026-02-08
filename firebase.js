import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6BJ5GVUB0AAzzSAyAltJ3cATLLsGTbAs",
  authDomain: "supply-chain-ai-58660.firebaseapp.com",
  projectId: "supply-chain-ai-58660",
  storageBucket: "supply-chain-ai-58660.firebasestorage.app",
  messagingSenderId: "1004319246941",
  appId: "1:1004319246941:web:74a3167bc9dd2cc7cd9bb4",
  measurementId: "G-LQ8Q25EHGF",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
