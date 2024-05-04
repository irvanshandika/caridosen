import { collection, getFirestore } from "firebase/firestore";
import { app } from "@src/config/FirebaseConfig";

export const firestore = getFirestore(app);

export const DosenController = collection(firestore, "dosen");
