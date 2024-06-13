import { db } from "@config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export async function generateStaticParams() {
  const querySnapshot = await getDocs(collection(db, "dosen"));
  const paths = querySnapshot.docs.map((doc) => ({
    id: doc.id,
  }));

  return paths.map((path) => ({ id: path.id }));
}
