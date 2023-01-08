
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCXZSP54P1Hc90Sf0yiHBbqIk7tUT4UFho",
  authDomain: "chat-eab2c.firebaseapp.com",
  projectId: "chat-eab2c",
  storageBucket: "chat-eab2c.appspot.com",
  messagingSenderId: "285295176402",
  appId: "1:285295176402:web:7f74a3be2d402e77911b0b",
  measurementId: "G-XB92G1R71Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage = getStorage();
export const db=getFirestore();
