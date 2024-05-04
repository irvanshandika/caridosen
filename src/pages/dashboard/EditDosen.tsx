/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { app, db } from "@src/config/FirebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Sidebar from "@components/Sidebar";
import { doc, updateDoc, getDoc } from "firebase/firestore";

interface dosenDetail {
  nama: string;
  nidn: string;
  email: string;
  urlFoto: string;
  tanggalLahir: string;
}

const EditDosen = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [nama, setNama] = useState("");
  const [nidn, setNidn] = useState("");
  const [email, setEmail] = useState("");
  const [urlFoto, setUrlFoto] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [dosenDetail, setDosenDetail] = useState<any>({});

  const params = useParams();
  // console.log(params.id);

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

  const updateDosen = async (e: any) => {
    e.preventDefault();
    const dosenRef = doc(db, "dosen", params.id ?? "");
    console.log(dosenDetail);
    await updateDoc(dosenRef, {
      ...dosenDetail,
    });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
    window.location.reload();
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setDosenDetail({ ...dosenDetail, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Edit Dosen | CariDosen</title>
      </Helmet>
      <Sidebar>
        <h1 className="text-center">Edit Dosen</h1>
        <form onSubmit={updateDosen}>
          <div className="mb-4">
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input type="text" name="nama" id="nama" value={dosenDetail.nama} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="nidn" className="block text-sm font-medium text-gray-700">
              NIDN
            </label>
            <input type="text" name="nidn" id="nidn" value={dosenDetail.nidn} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" name="email" id="email" value={dosenDetail.email} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="urlFoto" className="block text-sm font-medium text-gray-700">
              URL Foto
            </label>
            <input type="text" name="urlFoto" id="urlFoto" value={dosenDetail.urlFoto} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="tanggalLahir" className="block text-sm font-medium text-gray-700">
              Tanggal Lahir
            </label>
            <input type="date" name="tanggalLahir" id="tanggalLahir" value={dosenDetail.tanggalLahir} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
          {showAlert && <div className="mt-4 p-4 bg-green-100 text-green-700">Data berhasil diupdate</div>}
        </form>
      </Sidebar>
    </>
  );
};

export default EditDosen;
