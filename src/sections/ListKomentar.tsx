import { useEffect, useState } from "react";
import { db } from "@src/config/FirebaseConfig";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Rating, Card } from "@mantine/core";

interface KomentarType {
  id: string;
  komentar: string;
  displayName: string;
  photoURL: string;
  rating: number;
}

const ListKomentar = () => {
  const [listKomentar, setListKomentar] = useState<KomentarType[]>([]);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "rating"), where("dosenId", "==", params.id));
      const querySnapshot = await getDocs(q);
      setListKomentar(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            komentar: doc.data().komentar,
            displayName: doc.data().userName,
            photoURL: doc.data().photoURL,
            rating: doc.data().rating,
          };
        })
      );
    };
    fetchData();
  }, [params.id]);

  return (
    <>
      {listKomentar?.map((user) => (
        <Card key={user.id} shadow="xs" padding="xs" radius="md" className="flex flex-row gap-4 w-[80vw] justify-center items-start" style={{ marginBottom: "10px" }}>
          <div className="flex">
            <img src={user.photoURL} className="lg:w-12 lg:h-12 w-12 h-12 rounded-full object-cover" alt="Foto profile" />
            <h1 className="lg:p-3 p-1">{user.displayName}</h1>
          </div>
          <div className="flex justify-end items-end">
            <Rating value={user.rating} color="orange" readOnly />
          </div>
          <p>{user.komentar}</p>
        </Card>
      ))}
    </>
  );
};

export default ListKomentar;
