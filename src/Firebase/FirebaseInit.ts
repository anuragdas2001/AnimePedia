// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrp2sV-At2KToHfZQwd1meUFvjRF1Vko0",
  authDomain: "animepedia-d0a52.firebaseapp.com",
  projectId: "animepedia-d0a52",
  storageBucket: "animepedia-d0a52.appspot.com",
  messagingSenderId: "327570980214",
  appId: "1:327570980214:web:238b0ea48be59a55b08e57"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);