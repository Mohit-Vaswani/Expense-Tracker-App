// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBsl8GUgsRNGJPI9jijTAhm7m53cUvEK0",
  authDomain: "expense-tracker-40331.firebaseapp.com",
  projectId: "expense-tracker-40331",
  storageBucket: "expense-tracker-40331.appspot.com",
  messagingSenderId: "1007989277691",
  appId: "1:1007989277691:web:1f60d1096a071eecf1c15e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);