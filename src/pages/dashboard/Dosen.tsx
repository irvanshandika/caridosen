/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { db } from "@src/config/FirebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Sidebar from "@components/Sidebar";
import { Helmet } from "react-helmet";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { NewDosenType } from "@src/types/dosen";
import { Button } from "@components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

const Dosen = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [dosen, setDosen] = useState<NewDosenType[]>([]);
  const [createdBy, setCreatedBy] = useState({});
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        // console.log(email);
        setCreatedBy(email ?? "");
      } else {
        console.log("User is not signed in");
      }
    });
  }, [auth]);

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

  const handleDelete = async (id: string | undefined) => {
    try {
      if (id) {
        await deleteDoc(doc(db, "dosen", id));
        setDosen(dosen.filter((item: NewDosenType) => item.id !== id));
      }
    } catch (err) {
      console.log(err);
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
  }, [user]);
  console.log(isAdmin);

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
      // console.log(querySnapshot);
    };
    getData();
  }, [createdBy]);

  return (
    <>
      <Helmet>
        <title>Dosen | CariDosen</title>
      </Helmet>
      <Sidebar>
        <span className="hidden">{user?.displayName}</span>
        <h1 className="text-center">Daftar Dosen</h1>
        <div className="mb-2">
          {isAdmin && (
            <Button onClick={() => navigate("/dashboard/dosen/tambah-dosen")}>
              <span className="mr-1">
                <i className="fa-solid fa-user-plus"></i>
              </span>
              Buat Dosen
            </Button>
          )}
        </div>
        {dosen && dosen.length === 0 ? (
          <div className="min-h-60 flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
              <svg
                className="size-10 text-gray-500 dark:text-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round">
                <line x1="22" x2="2" y1="12" y2="12"></line>
                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                <line x1="6" x2="6.01" y1="16" y2="16"></line>
                <line x1="10" x2="10.01" y1="16" y2="16"></line>
              </svg>
              <p className="mt-2 text-sm text-gray-800 dark:text-neutral-300">Belum Ada Dosen</p>
            </div>
          </div>
        ) : (
          <>
            {dosen?.map((dosen) => (
              <>
                <div className="flex mt-2 items-center justify-between p-2 bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                  <div className="flex items-center">
                    <img className="w-12 h-12 rounded-full" src={dosen.urlFoto} alt="profil" />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-100">{dosen.nama}</h3>
                      <p className="text-sm text-gray-500 dark:text-neutral-400">{dosen.id}</p>
                      <p className="text-sm text-gray-500 dark:text-neutral-400">{dosen.nip}</p>
                    </div>
                  </div>
                  <div className="flex flex-col mr-5">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                          <g fill="none">
                            <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                            <path fill="currentColor" d="M12 16.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m0-6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m0-6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3" />
                          </g>
                        </svg>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Button
                            onClick={() => {
                              navigate(`/dashboard/dosen/edit-dosen/${dosen.id}`);
                            }}>
                            <span className="mr-2">
                              <i className="fa-solid fa-pencil-alt"></i>
                            </span>
                            Edit
                          </Button>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="my-2">
                          <Button
                            onClick={() => {
                              navigate(`/dashboard/dosen/detail-dosen/${dosen.id}`);
                            }}>
                            <span className="mr-2">
                              <i className="fa-solid fa-eye"></i>
                            </span>
                            Detail
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Button variant="destructive" onClick={() => handleDelete(dosen.id)}>
                            <span className="mr-2">
                              <i className="fa-solid fa-trash"></i>
                            </span>
                            Hapus
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </>
            ))}
          </>
        )}
      </Sidebar>
    </>
  );
};

export default Dosen;
