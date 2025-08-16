import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMqkFTsWZe8_DG8YJx1ZH2G9pXOY36obE",
  authDomain: "my-portfolio-93a3e.firebaseapp.com",
  projectId: "my-portfolio-93a3e",
  storageBucket: "my-portfolio-93a3e.firebasestorage.app",
  messagingSenderId: "257952166503",
  appId: "1:257952166503:web:e04b20829c185bbf025ac2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
