// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAN-T3Dy2aZcvwJCg35n75m3N36s58n0o",
  authDomain: "tobeit67hackathon.firebaseapp.com",
  projectId: "tobeit67hackathon",
  storageBucket: "tobeit67hackathon.appspot.com",
  messagingSenderId: "195365048954",
  appId: "1:195365048954:web:0f4de9abdf5fd68af8e1c3"
};

// Initialize Firebase
let app;

if (!getApps().length) app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export { auth, db };