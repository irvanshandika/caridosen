/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Sidebar from "@components/Sidebar";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Helmet } from "react-helmet";
// import { UnverifiedIcon } from "@components/icons/UnverifiedIcon";
import { VerifiedIcon } from "@components/icons/VerifiedIcon";
import { Tooltip } from "@mantine/core";
import { db } from "@src/config/FirebaseConfig";

const Account = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

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
  return (
    <>
      <Helmet>
        <title>Akun Saya | CariDosen</title>
      </Helmet>
      <Sidebar>
        <section className="w-full overflow-hidden dark:bg-gray-900">
          <div className="w-full mx-auto">
            <img
              src="https://images.unsplash.com/photo-1560697529-7236591c0066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMHx8Y292ZXJ8ZW58MHwwfHx8MTcxMDQ4MTEwNnww&ixlib=rb-4.0.3&q=80&w=1080"
              alt="User Cover"
              className="w-full xl:h-[20rem] lg:h-[22rem] md:h-[16rem] sm:h-[13rem] xs:h-[9.5rem] -mt-10 z-30"
              loading="lazy"
            />

            <div className="w-full mx-auto flex justify-center">
              <img
                src={user?.photoURL}
                alt={user?.displayName}
                className="rounded-full object-cover xl:w-[16rem] xl:h-[16rem] lg:w-[16rem] lg:h-[16rem] md:w-[12rem] md:h-[12rem] sm:w-[10rem] sm:h-[10rem] xs:w-[8rem] xs:h-[8rem] outline outline-2 outline-offset-2 outline-yellow-500 shadow-xl relative xl:bottom-[7rem] lg:bottom-[8rem] md:bottom-[6rem] sm:bottom-[5rem] xs:bottom-[4.3rem]"
                loading="lazy"
              />
            </div>

            <div className="xl:w-[80%] lg:w-[90%] md:w-[94%] sm:w-[96%] xs:w-[92%] mx-auto flex flex-col gap-4 justify-center items-center relative xl:-top-[6rem] lg:-top-[6rem] md:-top-[4rem] sm:-top-[3rem] xs:-top-[2.2rem]">
              <h1 className="text-center text-gray-800 dark:text-white text-4xl flex">
                {user?.displayName}
                {/* <Tooltip label={user?.emailVerified ? "Email Terverifikasi" : "Email Belum Terverifikasi"}>
                  <span className="ml-2">{user?.emailVerified ? <VerifiedIcon className="w-6 h-full" /> : <UnverifiedIcon className="w-6 h-full" />}</span>
                </Tooltip> */}
                {isAdmin && (
                  <Tooltip label="Admin">
                    <span className="ml-2">
                      <VerifiedIcon className="w-6 h-full" />
                    </span>
                  </Tooltip>
                )}
              </h1>
              <p className="w-full text-gray-700 dark:text-gray-400 text-md text-pretty text-center">{user?.providerData[0].email || "No email"}</p>

              <div className="w-full flex gap-4 justify-center items-center mt-10">
                <div className="xl:w-1/4 xl:h-32 lg:w-1/5 lg:h-32 md:w-1/5 md:h-28 sm:w-1/3 sm:h-[5rem] xs:w-1/3 xs:h-[4rem] flex justify-center items-center rounded-sm text-center text-lg px-6 py-4 border-2 border-dashed border-gray-300 dark:text-white dark:border-2 dark:border-dashed dark:border-gray-700">
                  27
                </div>

                <div className="xl:w-1/4 xl:h-32 lg:w-1/5 lg:h-32 md:w-1/5 md:h-28 sm:w-1/3 sm:h-[5rem] xs:w-1/3 xs:h-[4rem] flex justify-center items-center rounded-sm text-center text-lg px-6 py-4 border-2 border-dashed border-gray-300 dark:text-white dark:border-2 dark:border-dashed dark:border-gray-700">
                  777
                </div>

                <div className="xl:w-1/4 xl:h-32 lg:w-1/5 lg:h-32 md:w-1/5 md:h-28 sm:w-1/3 sm:h-[5rem] xs:w-1/3 xs:h-[4rem] flex justify-center items-center rounded-sm text-center text-lg px-6 py-4 border-2 border-dashed border-gray-300 dark:text-white dark:border-2 dark:border-dashed dark:border-gray-700">
                  34
                </div>
              </div>
            </div>
          </div>
        </section>
      </Sidebar>
    </>
  );
};

export default Account;
