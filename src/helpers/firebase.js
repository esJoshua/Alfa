// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqC-wwUrhRyWAMCx5RsCukhAdwWA5e9Eg",
  authDomain: "alfa-web1.firebaseapp.com",
  projectId: "alfa-web1",
  storageBucket: "alfa-web1.appspot.com",
  messagingSenderId: "363014214490",
  appId: "1:363014214490:web:9bed2f9acff8e2db5ad963",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
