/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Sidebar from "@components/Sidebar";
import { Helmet } from "react-helmet";
import { collection, getDocs, deleteDoc, doc, query } from "firebase/firestore";
import { db } from "@config/FirebaseConfig";
import { Button, Group, Text, Modal, TextInput, Alert } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const ManajemenUsers: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        let isAdmin = false;
        querySnapshot.forEach((doc) => {
          if (doc.data().roles === "admin") {
            isAdmin = true;
          }
        });
        setIsAdmin(isAdmin);
        if (!isAdmin) {
          navigate("/forbidden");
        }
      } else {
        navigate("/forbidden");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  const handleWarnUser = (userId: string) => {
    alert(`Peringatan telah dikirimkan ke pengguna dengan ID: ${userId}`);
  };

  const handleDeleteUser = async () => {
    if (selectedUser && deleteConfirm === "DELETE") {
      try {
        await deleteDoc(doc(db, "users", selectedUser.id));
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        closeModal();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    } else {
      alert('Ketik "DELETE" untuk mengkonfirmasi penghapusan akun');
    }
  };

  const openDeleteModal = (user: any) => {
    setSelectedUser(user);
    openModal();
  };

  return (
    <>
      <Helmet>
        <title>Manajemen Users | CariDosen</title>
      </Helmet>
      <Sidebar>
        <div className="mb-4">
          <h2>Daftar Pengguna</h2>
        </div>
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <Text>{user.displayName || "Pengguna tanpa nama"}</Text>
            <Text>{user.email}</Text>
            <Group mt="md">
              <Button onClick={() => handleWarnUser(user.id)}>Warn Account</Button>
              <Button color="red" onClick={() => openDeleteModal(user)}>
                Banned
              </Button>
            </Group>
          </div>
        ))}

        <Modal opened={modalOpened} onClose={closeModal} title="Konfirmasi Penghapusan Akun" centered>
          <Text mb="10px">Menghapus akun ini akan menghapus semua data yang terkait dengan pengguna ini.</Text>
          <Text>Ketik "DELETE" untuk menghapus akun:</Text>
          <TextInput placeholder="DELETE" value={deleteConfirm} onChange={(event) => setDeleteConfirm(event.currentTarget.value)} mt="md" />
          <Group mt="md">
            <Button onClick={closeModal}>Batal</Button>
            <Button color="red" onClick={handleDeleteUser}>
              Hapus Akun
            </Button>
          </Group>
        </Modal>
      </Sidebar>
    </>
  );
};

export default ManajemenUsers;
function where(arg0: string, arg1: string, uid: string): import("@firebase/firestore").QueryCompositeFilterConstraint {
  throw new Error("Function not implemented.");
}
