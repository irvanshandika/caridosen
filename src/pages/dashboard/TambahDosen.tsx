/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "@src/config/FirebaseConfig";
import SideBar from "@components/Sidebar";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Label } from "@components/ui/label";

async function addDosen(nama: string, nip: string, email: string, urlFoto: string, tanggalLahir: string, deskripsi: string, createdBy: string) {
  try {
    const docRef = await addDoc(collection(db, "dosen"), {
      nama: nama,
      nip: nip,
      tanggalLahir: tanggalLahir,
      email: email,
      urlFoto: urlFoto,
      deskripsi: deskripsi,
      createdBy: createdBy,
      createdAt: serverTimestamp(),
    });
    console.log(`Dosen dengan nama ${nama}, NIP ${nip}, dan email ${email} berhasil ditambahkan.`, docRef);
    return true;
  } catch (error) {
    console.error("Terjadi kesalahan saat menambahkan dosen:", error);
    return false;
  }
}

const Dosen = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [nama, setNama] = useState("");
  const [nip, setNip] = useState("");
  const [email, setEmail] = useState("");
  const [urlFoto, setUrlFoto] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const email = user.email;
        console.log(email);
        setCreatedBy(email ?? "");
      } else {
        console.log("User is not signed in");
      }
    });
  }, [auth]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const added = await addDosen(nama, nip, email, urlFoto, tanggalLahir, deskripsi, createdBy);
    if (added) {
      setNama("");
      setNip("");
      setEmail("");
      setUrlFoto("");
      setDeskripsi("");
      setTanggalLahir("");
      setShowAlert(true); // Show the alert
      setTimeout(() => {
        setShowAlert(false); // Hide the alert after 4000ms
      }, 4000);
      console.log("Add the todo successfully");
    } else {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 4000);
    }
    window.location.reload();
  };

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

  return (
    <>
      <SideBar>
        <span className="hidden">{user?.displayName}</span>
        <div className="p-8 rounded border border-gray-200 dark:border-gray-600 dark:bg-gray-700">
          <h1 className="font-medium text-3xl">Tambah Dosen</h1>
          {showAlert && (
            <div className="px-8 py-6 bg-green-400 text-white flex justify-between rounded">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                <p>Data Dosen Berhasil Ditambahkan</p>
              </div>
              <button className="text-green-100 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          {showErrorAlert && (
            <div className="px-8 py-6 bg-red-400 text-white flex justify-between rounded">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-6 text-white" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="m15.46 15.88l1.42-1.42L19 16.59l2.12-2.12l1.41 1.41L20.41 18l2.13 2.12l-1.42 1.42L19 19.41l-2.12 2.12l-1.41-1.41L17.59 18zM12 3c4.42 0 8 1.79 8 4s-3.58 4-8 4s-8-1.79-8-4s3.58-4 8-4M4 9c0 2.21 3.58 4 8 4s8-1.79 8-4v3.08L19 12c-2.59 0-4.8 1.64-5.64 3.94L12 16c-4.42 0-8-1.79-8-4zm0 5c0 2.21 3.58 4 8 4h1c0 1.05.27 2.04.75 2.9L12 21c-4.42 0-8-1.79-8-4z"
                  />
                </svg>
                <p>Oops... Sepertinya Ada Masalah Pada Database!</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mt-8 grid lg:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="urlFoto" className="text-sm text-gray-700 block mb-1 font-medium dark:text-gray-200">
                  Url Foto
                </Label>
                <input
                  type="text"
                  name="urlFoto"
                  id="urlFoto"
                  value={urlFoto}
                  onChange={(e: any) => setUrlFoto(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full dark:bg-gray-600 dark:border-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <Label htmlFor="nama" className="text-sm text-gray-700 block mb-1 font-medium dark:text-gray-200">
                  Nama
                </Label>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  value={nama}
                  onChange={(e: any) => setNama(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full dark:bg-gray-600 dark:border-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm text-gray-700 block mb-1 font-medium dark:text-gray-200">
                  Email Adress
                </Label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full dark:bg-gray-600 dark:border-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400"
                  placeholder="yourmail@provider.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="nip" className="text-sm text-gray-700 block mb-1 font-medium dark:text-gray-200">
                  NIP
                </Label>
                <input
                  type="text"
                  name="nip"
                  id="nip"
                  value={nip}
                  onChange={(e: any) => setNip(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full dark:bg-gray-600 dark:border-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400"
                  placeholder="123xxxxx"
                  required
                />
              </div>
              <div>
                <Label htmlFor="tanggalLahir" className="text-sm text-gray-700 block mb-1 font-medium dark:text-gray-200">
                  Tanggal Lahir
                </Label>
                <input
                  type="date"
                  name="tanggalLahir"
                  id="tanggalLahir"
                  value={tanggalLahir}
                  onChange={(e: any) => setTanggalLahir(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full dark:bg-gray-600 dark:border-gray-700 dark:text-gray-400"
                  placeholder="(01/01/1993)"
                />
              </div>
              <div>
                <Label htmlFor="deskripsi" className="text-sm text-gray-700 block mb-1 font-medium dark:text-gray-200">
                  Deskripsi
                </Label>
                <textarea
                  name="deskripsi"
                  id="deskripsi"
                  value={deskripsi}
                  onChange={(e: any) => setDeskripsi(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full dark:bg-gray-600 dark:border-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400"
                  placeholder="Deskripsi singkat tentang dosen"
                  required
                />
              </div>
            </div>
            <div className="space-x-4 mt-8">
              <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">
                Save
              </button>
              <button onClick={() => navigate("/dashboard/dosen")} className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </SideBar>
    </>
  );
};

export default Dosen;
