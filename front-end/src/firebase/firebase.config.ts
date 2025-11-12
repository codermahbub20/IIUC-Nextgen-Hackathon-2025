// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqIYuJYhhoNER2yd96jIYJw8P8LYibGIY",
  authDomain: "iiuc-nextgen-hackathon-25.firebaseapp.com",
  projectId: "iiuc-nextgen-hackathon-25",
  storageBucket: "iiuc-nextgen-hackathon-25.firebasestorage.app",
  messagingSenderId: "280662828389",
  appId: "1:280662828389:web:f8f7657fa1c96977e66d8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;