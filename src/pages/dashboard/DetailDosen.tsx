/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { db } from "@src/config/FirebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "@components/Sidebar";
import { Helmet } from "react-helmet";
import { getDoc, doc } from "firebase/firestore";

const DetailDosen = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [dosenDetail, setDosenDetail] = useState<any>({});

  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/forbidden");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

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
        <title>Detail Dosen | CariDosen</title>
      </Helmet>
      <span className="hidden">{user?.displayName}</span>
      <Sidebar>
        <h1 className="text-center">Informasi Dosen</h1>
        {dosenDetail && (
          <>
            <div className="flex justify-center">
              <img src={dosenDetail.urlFoto} alt={dosenDetail.nama} className="w-40 h-40 rounded-full" />
            </div>
            <div className="mt-4">
              <p>
                <strong>Nama:</strong> {dosenDetail.nama}
              </p>
              <p>
                <strong>NIDN:</strong> {dosenDetail.nidn}
              </p>
              <p>
                <strong>Tanggal Lahir:</strong> {dosenDetail.tanggalLahir}
              </p>
              <p>
                <strong>Email:</strong> {dosenDetail.email}
              </p>
            </div>
          </>
        )}
      </Sidebar>
    </>
  );
};

export default DetailDosen;
