import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeYhUPAKrn0xdCTEJ6xtn97hL4kM6Mj6I",
  authDomain: "projectmentor--solohack.firebaseapp.com",
  projectId: "projectmentor--solohack",
  storageBucket: "projectmentor--solohack.firebasestorage.app",
  messagingSenderId: "382233208148",
  appId: "1:382233208148:web:d50b3d0140e6f2098a54c1"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
