import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQMnKPhDPLMkHKXXTo_JV2xpJNEahFkUo",
  authDomain: "tokosaya-7cafa.firebaseapp.com",
  projectId: "tokosaya-7cafa",
  storageBucket: "tokosaya-7cafa.appspot.com",
  messagingSenderId: "420735191106",
  appId: "1:420735191106:web:558455a24d22432793c5db",
  measurementId: "G-5PX6GN62VP",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

const db = getFirestore(app);

export { app, auth, db };
