/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { app, db } from "@src/config/FirebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getDoc, doc } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { Textarea } from "@components/ui/textarea";
import { Button } from "@components/ui/button";
import { Rating } from "@mantine/core";

const DetailDosen = () => {
  const [dosenDetail, setDosenDetail] = useState<any>({});
  const navigate = useNavigate();

  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    const getDosen = async () => {
      const dosenRef = doc(db, "dosen", params.id ?? "");
      const dosenSnap = await getDoc(dosenRef);
      if (dosenSnap.exists()) {
        setDosenDetail(dosenSnap.data());
        console.log("Document data:", dosenSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    getDosen();
  }, [params]);

  return (
    <>
      <Helmet>
        <title>Rating Dosen | CariDosen</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center lg:my-40 my-28">
        <Card className="lg:px-28 px-1">
          <CardHeader>
            <CardTitle>
              <img src={dosenDetail.urlFoto} alt={dosenDetail.nama} className="w-[200px] h-[200px] rounded-full mx-auto" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="flex flex-col justify-center items-start">
              <h1 className="font-semibold">{dosenDetail.nama}</h1>
              <p>{dosenDetail.nidn}</p>
              <p>{dosenDetail.email}</p>
            </CardDescription>
          </CardContent>
          <CardFooter className="flex flex-col justify-center items-center my-2">
            <Rating defaultValue={0} size="xl" />
            <h1>Komentar</h1>
            <div className="my-2">
              <Textarea className="px-20" />
            </div>
            <Button type="submit">Posting</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default DetailDosen;
