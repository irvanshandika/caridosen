/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { db } from "@config/FirebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { NewDosenType } from "@src/types/DosenType";
import { Menu, Button, rem, Modal, TextInput, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrashFilled, IconPencil } from "@tabler/icons-react";

const Dosen = () => {
  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [dosen, setDosen] = useState<NewDosenType[]>([]);
  const [createdBy, setCreatedBy] = useState({});
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedDosen, setSelectedDosen] = useState<NewDosenType | null>(null);
  const [confirmDosenId, setConfirmDosenId] = useState<string>("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        setCreatedBy(email ?? "");
      } else {
        console.log("User is not signed in");
      }
    });
  }, [auth]);

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
          router.push("/forbidden");
        }
      } else {
        router.push("/forbidden");
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const handleDelete = async (id: string | undefined) => {
    if (id && id === confirmDosenId) {
      try {
        await deleteDoc(doc(db, "dosen", id));
        setDosen(dosen.filter((item: NewDosenType) => item.id !== id));
        close();
        setConfirmDosenId("");
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("ID does not match");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      if (user) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setIsAdmin(doc.data().roles === "admin");
        });
      }
    };
    getUser();
  }, [user, router]);

  useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, "dosen"), where("createdBy", "==", createdBy));
      const querySnapshot = await getDocs(q);
      setDosen(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            nama: doc.data().nama,
            nip: doc.data().nip,
            email: doc.data().email,
            urlFoto: doc.data().urlFoto,
          };
        })
      );
    };
    getData();
  }, [createdBy]);

  return (
    <>
      <span className="hidden">{user?.displayName}</span>
      <h1 className="text-center">Daftar Dosen</h1>
      <div className="mb-2">
        <Button onClick={() => router.push("/dashboard/dosen/tambah-dosen")}>
          <span className="mr-1">
            <i className="fa-solid fa-user-plus"></i>
          </span>
          Buat Dosen
        </Button>
      </div>
      {dosen && dosen.length === 0 ? (
        <div className="min-h-60 flex flex-col bg-white border shadow-sm rounded-xl">
          <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
            <svg className="size-10 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" x2="2" y1="12" y2="12"></line>
              <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
              <line x1="6" x2="6.01" y1="16" y2="16"></line>
              <line x1="10" x2="10.01" y1="16" y2="16"></line>
            </svg>
            <p className="mt-2 text-sm text-gray-800">Belum Ada Dosen</p>
          </div>
        </div>
      ) : (
        <>
          {dosen?.map((dosen) => (
            <div key={dosen.id} className="flex mt-2 items-center justify-between p-2 bg-white border shadow-sm rounded-xl">
              <div className="flex items-center">
                <img className="w-12 h-12 rounded-full" src={dosen.urlFoto} alt="profil" fetchPriority="high" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">{dosen.nama}</h3>
                  <p className="text-sm text-gray-500">{dosen.id}</p>
                  <p className="text-sm text-gray-500">{dosen.nip}</p>
                </div>
              </div>
              <div className="flex flex-col mr-5">
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Button px="10px">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <g fill="none">
                          <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                          <path fill="currentColor" d="M12 16.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m0-6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m0-6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3" />
                        </g>
                      </svg>
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item leftSection={<IconPencil style={{ width: rem(20), height: rem(20) }} />} onClick={() => router.push(`/dashboard/dosen/edit-dosen/${dosen.id}`)}>
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconTrashFilled style={{ width: rem(20), height: rem(20) }} />}
                      onClick={() => {
                        setSelectedDosen(dosen);
                        open();
                      }}>
                      Hapus
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            </div>
          ))}
        </>
      )}
      <Modal opened={opened} onClose={close} title="Konfirmasi Hapus">
        <Text>Masukkan ID dosen untuk konfirmasi penghapusan:</Text>
        <TextInput value={confirmDosenId} onChange={(event) => setConfirmDosenId(event.currentTarget.value)} placeholder="Masukkan ID dosen" />
        <Group mt="md">
          <Button onClick={() => handleDelete(selectedDosen?.id)}>Hapus</Button>
          <Button variant="default" onClick={close}>
            Batal
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default Dosen;
