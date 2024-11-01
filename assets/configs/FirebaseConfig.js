// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuFIm5q_2KV8ch53kFWQJca18aR0IMm7Q",
  authDomain: "travel-app-75e8e.firebaseapp.com",
  projectId: "travel-app-75e8e",
  storageBucket: "travel-app-75e8e.firebasestorage.app",
  messagingSenderId: "854026705022",
  appId: "1:854026705022:web:bec18dc2cd74b14405e02f",
  measurementId: "G-7GMSV65ERB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const analytics = getAnalytics(app);