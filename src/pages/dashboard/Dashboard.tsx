/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, updateProfile, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Sidebar from "@components/Sidebar";
import { Helmet } from "react-helmet";
import { Button, TextInput, Group, Text, Modal, Alert } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { db } from "@config/FirebaseConfig";
import { collection, query, where, getDocs, deleteDoc } from "firebase/firestore";

const Dashboard: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [photoURL, setPhotoURL] = useState<string>("");
  const [deleteConfirm, setDeleteConfirm] = useState<string>("");
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [alertSubmit, setAlertSubmit] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setDisplayName(user.displayName ?? "");
        setPhotoURL(user.photoURL ?? "");
      } else {
        navigate("/forbidden");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  const handleUpdateProfile = async () => {
    if (user) {
      try {
        await updateProfile(user, { displayName, photoURL });
        setUser({ ...user, displayName, photoURL });
        setAlertSubmit(true);
        setTimeout(() => {
          setAlertSubmit(false);
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (user && deleteConfirm === "DELETE") {
      const userCommentsQuery = query(collection(db, "RatingDosen"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(userCommentsQuery);
      const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));

      try {
        await Promise.all(deletePromises);
        await deleteUser(user);
        closeModal();
        navigate("/");
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    } else {
      alert('Ketik "DELETE" untuk mengkonfirmasi penghapusan akun');
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | CariDosen</title>
      </Helmet>
      <Sidebar>
        <div className="mb-4">
          <h1>Selamat Datang {user?.displayName}</h1>
        </div>

        {alertSubmit && (
          <Alert color="teal" title="Profil berhasil diperbarui" onClose={() => setAlertSubmit(false)}>
            Profil Anda berhasil diperbarui.
          </Alert>
        )}

        <TextInput label="Nama" placeholder="Masukkan nama" value={displayName} onChange={(event) => setDisplayName(event.currentTarget.value)} />
        <TextInput label="URL Foto" placeholder="Masukkan URL foto" value={photoURL} onChange={(event) => setPhotoURL(event.currentTarget.value)} />
        <Group mt="md">
          <Button onClick={handleUpdateProfile}>Update Profil</Button>
        </Group>
        <Group mt="md">
          <Button color="red" onClick={openModal}>
            Hapus Akun
          </Button>
        </Group>
      </Sidebar>

      <Modal opened={modalOpened} onClose={closeModal} title="Konfirmasi Penghapusan Akun" centered>
        <Text mb="10px">Hapus akun akan menghapus semua data yang telah Anda berikan, termasuk penilaian dosen yang telah Anda berikan.</Text>
        <Text>Ketik "DELETE" untuk menghapus akun Anda:</Text>
        <TextInput placeholder="DELETE" value={deleteConfirm} onChange={(event) => setDeleteConfirm(event.currentTarget.value)} mt="md" />
        <Group mt="md">
          <Button onClick={closeModal}>Batal</Button>
          <Button color="red" onClick={handleDeleteAccount}>
            Hapus Akun
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default Dashboard;
