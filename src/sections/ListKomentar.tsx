import { useEffect, useState } from "react";
import { db } from "@src/config/FirebaseConfig";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Rating, Card } from "@mantine/core";

interface KomentarType {
  id: string;
  komentar: string;
  rating: number;
  email: string;
}

const ListKomentar = () => {
  const [listKomentar, setListKomentar] = useState<KomentarType[]>([]);
  const params = useParams();

  const q = query(collection(db, "rating"), where("dosenId", "==", params.id));

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(q);
      setListKomentar(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            komentar: doc.data().komentar,
            rating: doc.data().rating,
            email: doc.data().createdBy,
          };
        })
      );
    };
    fetchData();
  }, [q]);
  return (
    <>
      {listKomentar?.map((user) => {
        return (
          <>
            <Card shadow="xs" padding="md" radius="md" style={{ marginBottom: "10px" }}>
              <h1>{user.email}</h1>
              <Rating value={user.rating} color="orange" readOnly/>
              <p>{user.komentar}</p>
            </Card>
          </>
        );
      })}
    </>
  );
};

export default ListKomentar;
