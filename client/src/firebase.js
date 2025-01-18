// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-649a4.firebaseapp.com",
  projectId: "mern-auth-649a4",
  storageBucket: "mern-auth-649a4.firebasestorage.app",
  messagingSenderId: "588301870119",
  appId: "1:588301870119:web:360ed38ed69258aee29a02"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);