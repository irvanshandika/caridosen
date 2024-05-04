import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDz55G_kkvD7pAt-cPSD07mlBnqgIn9x2A",
  authDomain: "caridosen-8fd50.firebaseapp.com",
  databaseURL: "https://caridosen-8fd50-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "caridosen-8fd50",
  storageBucket: "caridosen-8fd50.appspot.com",
  messagingSenderId: "195467509378",
  appId: "1:195467509378:web:9063a36a1728554b367e9b",
  measurementId: "G-LSCPLTR7F3",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

export { app, auth, db, storage };
