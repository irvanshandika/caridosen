/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db, storage } from "@config/FirebaseConfig";
import SideBar from "@components/Sidebar";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Helmet } from "react-helmet";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

async function addDosen(nama: string, nip: string, email: string, urlFoto: string, tanggalLahir: string, deskripsi: string, universitas: string, createdBy: string) {
  try {
    const docRef = await addDoc(collection(db, "dosen"), {
      nama: nama,
      nip: nip,
      tanggalLahir: tanggalLahir,
      email: email,
      urlFoto: urlFoto,
      deskripsi: deskripsi,
      universitas: universitas,
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

const TambahDosen = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [nama, setNama] = useState("");
  const [nip, setNip] = useState("");
  const [email, setEmail] = useState("");
  const [urlFoto, setUrlFoto] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [universitas, setUniversitas] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [alertSubmit, setAlertSubmit] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
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
    const added = await addDosen(nama, nip, email, urlFoto, tanggalLahir, deskripsi, universitas, createdBy);
    if (added) {
      setNama("");
      setNip("");
      setEmail("");
      setUrlFoto("");
      setDeskripsi("");
      setTanggalLahir("");
      setUniversitas("");
      setShowAlert(true); // Show the alert
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      console.log("Add the todo successfully");
    } else {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 9000);
    }
    window.location.reload();
  };

  const handleImageUpload = (files: File[]) => {
    const file = files[0];
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit. Please upload a smaller file.");
      return;
    }

    setError(null); // Reset error state if file size is valid
    const storageRef = ref(storage, `dosenProfilePics/${user.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);
    setProgress(0);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Error uploading image:", error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setUrlFoto(downloadURL);
        setUploading(false);
      }
    );
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
      <Helmet>
        <title>Tambah Dosen | Sistem Informasi Akademik</title>
        <meta name="description" content="Tambah dosen baru di Sistem Informasi Akademik" />
      </Helmet>
      <SideBar>
        <span className="hidden">{user?.displayName}</span>
        <h1 className="text-center">Tambah Dosen</h1>
        {showAlert && (
          <div className="mt-4 p-4 bg-green-100 text-green-700">
            Data Dosen Berhasil Ditambahkan
          </div>
        )}
        {showErrorAlert && (
          <div className="mt-4 p-4 bg-red-100 text-red-700">
            Oops... Sepertinya Ada Masalah Pada Database!
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              value={nama}
              onChange={(e: any) => setNama(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nip" className="block text-sm font-medium text-gray-700">
              NIP
            </label>
            <input
              type="text"
              name="nip"
              id="nip"
              value={nip}
              onChange={(e: any) => setNip(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="urlFoto" className="block text-sm font-medium text-gray-700">
              Foto
            </label>
            <input
              type="file"
              name="urlFoto"
              id="urlFoto"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleImageUpload([file]);
                }
              }}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {urlFoto && <img src={urlFoto} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
            {uploading && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div className="bg-blue-600 h-2 rounded" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">{progress.toFixed(2)}%</div>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="tanggalLahir" className="block text-sm font-medium text-gray-700">
              Tanggal Lahir
            </label>
            <input
              type="date"
              name="tanggalLahir"
              id="tanggalLahir"
              value={tanggalLahir}
              onChange={(e: any) => setTanggalLahir(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">
              Deskripsi
            </label>
            <textarea
              name="deskripsi"
              id="deskripsi"
              value={deskripsi}
              onChange={(e: any) => setDeskripsi(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="universitas" className="block text-sm font-medium text-gray-700">
              Universitas
            </label>
            <input
              type="text"
              name="universitas"
              id="universitas"
              value={universitas}
              onChange={(e: any) => setUniversitas(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
              disabled={uploading} // Disable submit button while uploading
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Batal
            </button>
          </div>
          {error && <div className="mt-4 text-red-600">{error}</div>}
        </form>
      </SideBar>
    </>
  );
};

export default TambahDosen;
