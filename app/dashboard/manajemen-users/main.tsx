/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { collection, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@config/FirebaseConfig";
import { Button, Group, Text, Modal, TextInput, Skeleton, Table, ActionIcon, Tooltip, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUserPlus, IconUserMinus, IconTrash } from "@tabler/icons-react";

interface UserType {
  uid: string;
  displayName: string | null;
  email: string | null;
  id: string;
  roles: string;
}

const ManajemenUsers: React.FC = () => {
  const auth = getAuth();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<UserType[]>([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await syncUserWithFirestore(user);
        const userDoc = await getDocs(collection(db, "users"));
        let isSuperAdmin = false;
        userDoc.forEach((doc) => {
          if (doc.data().uid === user.uid && doc.data().roles === "superadmin") {
            isSuperAdmin = true;
          }
        });
        setIsSuperAdmin(isSuperAdmin);
        if (!isSuperAdmin) {
          router.push("/forbidden");
        }
      } else {
        router.push("/forbidden");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth, router]);

  const syncUserWithFirestore = async (user: User) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        roles: "user",
      });
    } else {
      await setDoc(
        userRef,
        {
          ...userSnap.data(),
          displayName: user.displayName,
          email: user.email,
        },
        { merge: true }
      );
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);
      const usersData: UserType[] = querySnapshot.docs.map((docSnap) => {
        const userData = docSnap.data();
        return {
          uid: userData.uid,
          displayName: userData.displayName,
          email: userData.email,
          id: docSnap.id,
          roles: userData.roles,
        };
      });

      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleAddAdminRole = async (user: UserType) => {
    try {
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, { roles: "admin" });
      setUsers(users.map((u) => (u.id === user.id ? { ...u, roles: "admin" } : u)));
    } catch (error) {
      console.error("Error adding admin role:", error);
    }
  };
  const handleAddSuperAdminRole = async (user: UserType) => {
    try {
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, { roles: "superadmin" });
      setUsers(users.map((u) => (u.id === user.id ? { ...u, roles: "superadmin" } : u)));
    } catch (error) {
      console.error("Error adding super admin role:", error);
    }
  };

  const handleRemoveAdminRole = async (user: UserType) => {
    try {
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, { roles: "user" });
      setUsers(users.map((u) => (u.id === user.id ? { ...u, roles: "user" } : u)));
    } catch (error) {
      console.error("Error removing admin role:", error);
    }
  };
  const handleRemoveSuperAdminRole = async (user: UserType) => {
    try {
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, { roles: "user" });
      setUsers(users.map((u) => (u.id === user.id ? { ...u, roles: "user" } : u)));
    } catch (error) {
      console.error("Error removing super admin role:", error);
    }
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

  const openDeleteModal = (user: UserType) => {
    setSelectedUser(user);
    openModal();
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="text-center">Daftar Pengguna</h2>
      </div>

      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 border-1 border-black">
                <thead className="bg-[#DFF6FF]">
                  <tr>
                    <th scope="col" className="px-11 py-3 text-start text-xs font-bold text-black uppercase">
                      Nama
                    </th>
                    <th scope="col" className="px-11 py-3 text-start text-xs font-bold text-black uppercase">
                      Email
                    </th>
                    <th scope="col" className="px-11 py-3 text-start text-xs font-bold text-black uppercase">
                      Roles
                    </th>
                    <th scope="col" className="px-11 py-3 text-xs font-bold text-black uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-11 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{user.displayName}</td>
                      <td className="px-11 py-4 whitespace-nowrap text-sm text-gray-800">{user.email}</td>
                      <td className="px-11 py-4 whitespace-nowrap text-sm text-gray-800">{user.roles}</td>
                      <td className="px-11 py-4 whitespace-nowrap flex justify-center text-sm font-medium">
                        <Group>
                          <Menu>
                            <Menu.Target>
                              <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                  <g fill="none">
                                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                    <path fill="currentColor" d="M12 16.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m0-6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m0-6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3" />
                                  </g>
                                </svg>
                              </button>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Item>
                                <Tooltip label="Tambah Admin">
                                  <ActionIcon color="blue" onClick={() => handleAddAdminRole(user)}>
                                    <IconUserPlus size={16} />
                                  </ActionIcon>
                                </Tooltip>
                              </Menu.Item>
                              <Menu.Item>
                                <Tooltip label="Tambah Super Admin">
                                  <ActionIcon color="blue" onClick={() => handleAddSuperAdminRole(user)}>
                                    <IconUserPlus size={16} />
                                  </ActionIcon>
                                </Tooltip>
                              </Menu.Item>
                              <Menu.Item>
                                <Tooltip label="Hapus Admin Role">
                                  <ActionIcon color="red" onClick={() => handleRemoveAdminRole(user)}>
                                    <IconUserMinus size={16} />
                                  </ActionIcon>
                                </Tooltip>
                              </Menu.Item>
                              <Menu.Item>
                                <Tooltip label="Hapus Super Admin Role">
                                  <ActionIcon color="red" onClick={() => handleRemoveSuperAdminRole(user)}>
                                    <IconUserMinus size={16} />
                                  </ActionIcon>
                                </Tooltip>
                              </Menu.Item>
                              <Menu.Item>
                                <Tooltip label="Ban">
                                  <ActionIcon color="red" onClick={() => openDeleteModal(user)}>
                                    <IconTrash size={16} />
                                  </ActionIcon>
                                </Tooltip>
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </Group>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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
    </>
  );
};

export default ManajemenUsers;
