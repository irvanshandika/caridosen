import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdgrxBiCU9alVlf0OthJh2J_nSb1wJFkA",
  authDomain: "paraphrases.firebaseapp.com",
  projectId: "paraphrases",
  storageBucket: "paraphrases.appspot.com",
  messagingSenderId: "901540884726",
  appId: "1:901540884726:web:2dfd83ab09706f39a2fcd7",
  measurementId: "G-609GMV5X1F",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

export { app, auth, db, storage };
