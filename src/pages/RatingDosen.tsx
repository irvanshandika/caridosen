/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { db } from "@src/config/FirebaseConfig";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getDoc, doc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { Textarea } from "@components/ui/textarea";
import { Button } from "@components/ui/button";
import { Rating } from "@mantine/core";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ListKomentar from "@/src/sections/ListKomentar";

const DetailDosen = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [dosenDetail, setDosenDetail] = useState<any>({});
  const [user, setUser] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [komentar, setKomentar] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [dosenId, setDosenId] = useState("");

  const params = useParams();
  // console.log(params.id);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/auth/signin");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    const getDosen = async () => {
      setDosenId(params.id ?? "");
      setCreatedBy(user.uid);
      const dosenRef = doc(db, "dosen", params.id ?? "");
      const dosenSnap = await getDoc(dosenRef);
      if (dosenSnap.exists()) {
        setDosenDetail(dosenSnap.data());
        // console.log("Document data:", dosenSnap.data());
      } else {
        // console.log("No such document!");
      }
    };
    getDosen();
  }, [params, user]);

  const handleSubmitRating = async (e: any) => {
    try {
      e.preventDefault();
      await addDoc(collection(db, "rating"), {
        dosenId: dosenId,
        rating: rating,
        komentar: komentar,
        createdBy: createdBy,
        createdAt: serverTimestamp(),
      });
      console.log(komentar);
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Rating Dosen | CariDosen</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center lg:my-40 my-28">
        <Card className="lg:px-[100px] lg:mx-[300px] mx-[20px] px-1">
          <CardHeader>
            <CardTitle>
              <img src={dosenDetail.urlFoto} alt={dosenDetail.nama} className="w-[200px] h-[200px] rounded-full mx-auto" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-center items-start ">
              <CardDescription>
                <h1 className="font-semibold">Nama Dosen</h1>
                <p>{dosenDetail.nama}</p>
              </CardDescription>
              <CardDescription className="mt-4">
                <h1 className="font-semibold">NIP Dosen</h1>
                <p>{dosenDetail.nip}</p>
              </CardDescription>
              <CardDescription className=" mt-4">
                <h1 className="font-semibold">Email Dosen</h1>
                <p>{dosenDetail.email}</p>
              </CardDescription>
              <CardDescription className=" mt-4">
                <h1 className="font-semibold">Deskripsi Dosen</h1>
                <p>{dosenDetail.deskripsi}</p>
              </CardDescription>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col justify-center items-center my-2">
              <form onSubmit={handleSubmitRating}>
                <div className="my-4">
                  <div className="flex justify-center items-center">
                    <Rating defaultValue={0} size="xl" value={rating} onChange={setRating} />
                  </div>
                  <h1>Komentar</h1>
                  <Textarea className="lg:w-[50vw] w-[80vw]" rows={8} value={komentar} onChange={(e) => setKomentar(e.target.value)} />
                </div>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
                  Posting
                </Button>
              </form>
            </div>
          </CardFooter>
          <CardFooter>
            <ListKomentar />
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default DetailDosen;
