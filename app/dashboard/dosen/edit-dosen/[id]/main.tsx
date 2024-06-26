// app/dashboard/dosen/edit-dosen/[id]/main.tsx
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { db, storage } from "@config/FirebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const EditDosen = ({ id }: { id: string }) => {
  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [dosenDetail, setDosenDetail] = useState<any>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/forbidden");
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  useEffect(() => {
    const getDosen = async () => {
      if (!user) return; // Ensure user is defined

      const dosenRef = doc(db, "dosen", id);
      const dosenSnap = await getDoc(dosenRef);
      if (dosenSnap.exists()) {
        const dosenData = dosenSnap.data();
        setDosenDetail(dosenData);
        setImagePreview(dosenData.urlFoto || "");
        console.log("Document data:", dosenData);
        if (dosenData.createdBy !== user.email) {
          router.push("/forbidden");
        }
      } else {
        console.log("No such document!");
      }
    };
    getDosen();
  }, [id, user, router]);

  const updateDosen = async (e: any) => {
    e.preventDefault();

    let imageUrl = dosenDetail.urlFoto;

    try {
      if (imageFile) {
        const imageRef = ref(storage, `dosenProfilePics/${id}`);
        const uploadTask = uploadBytesResumable(imageRef, imageFile);

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
            setError("Gagal mengunggah gambar");
          },
          async () => {
            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            setUploading(false);
            const dosenRef = doc(db, "dosen", id);
            await updateDoc(dosenRef, {
              ...dosenDetail,
              urlFoto: imageUrl,
            });

            setAlertMessage("Data berhasil diupdate");
            setAlertType("success");
          }
        );
      } else {
        const dosenRef = doc(db, "dosen", id);
        await updateDoc(dosenRef, {
          ...dosenDetail,
          urlFoto: imageUrl,
        });

        setAlertMessage("Data berhasil diupdate");
        setAlertType("success");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      setAlertMessage("Gagal mengupdate data");
      setAlertType("error");
    } finally {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setDosenDetail({ ...dosenDetail, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <span className="hidden">{user?.displayName}</span>
      <h1 className="text-center">Edit Dosen</h1>
      {showAlert && (
        <div className="my-4">
          <div className={`mt-4 p-4 ${alertType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{alertMessage}</div>
        </div>
      )}
      <form onSubmit={updateDosen}>
        <div className="mb-4">
          <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
            Nama
          </label>
          <input type="text" name="nama" id="nama" value={dosenDetail.nama} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="nip" className="block text-sm font-medium text-gray-700">
            NIP
          </label>
          <input type="text" name="nip" id="nip" value={dosenDetail.nip} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input type="email" name="email" id="email" value={dosenDetail.email} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="urlFoto" className="block text-sm font-medium text-gray-700">
            Foto
          </label>
          <input type="file" name="urlFoto" id="urlFoto" onChange={handleImageChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover" fetchPriority="high" />}
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
          <input type="date" name="tanggalLahir" id="tanggalLahir" value={dosenDetail.tanggalLahir} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">
            Deskripsi
          </label>
          <textarea name="deskripsi" id="deskripsi" rows={9} value={dosenDetail.deskripsi} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={uploading}>
          Submit
        </button>
      </form>
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </>
  );
};

export default EditDosen;
