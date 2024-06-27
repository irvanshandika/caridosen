/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { app } from "@config/FirebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import DropdownProfile from "@components/DropdownProfile";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const auth = getAuth(app);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth, router]);
  return (
    <>
      <nav className="bg-white border-solid border-y fixed w-full z-20 top-0 start-0 border-[#7ECBFF]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src="https://res.cloudinary.com/dszhlpm81/image/upload/v1711041098/assets/caridosen/logo_nf7fd1.png" className="w-[70px] h-[46px]" width={70} height={46} alt="CariDosen Logo" />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user ? (
              <>
                <DropdownProfile />
              </>
            ) : (
              <div className="flex flex-row gap-2">
                <Link href="/auth/signin">
                  <button type="button" className="text-[#1E96FC] bg-white border-[#1E96FC] border-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium lg:mr-2 mr-0 rounded-lg text-sm px-4 py-2 text-center">
                    Masuk
                  </button>
                </Link>
                <Link href="/auth/signup">
                  <button type="button" className="text-white bg-[#1E96FC] hover:bg-blue-700 border-[#1E96FC] border-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium lg:mr-2 mr-0 rounded-lg text-sm px-4 py-2 text-center">
                    Daftar
                  </button>
                </Link>
              </div>
            )}
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
              onClick={toggleNavbar}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className={`${isOpen ? "block" : "hidden"} items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-cta">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link href="/" className="block py-2 px-3 md:p-0 text-[#003566] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#fitur" className="block py-2 px-3 md:p-0 text-[#003566] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700">
                  Fitur
                </Link>
              </li>
              <li>
                <Link href="#" className="block py-2 px-3 md:p-0 text-[#003566] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700">
                  Tentang
                </Link>
              </li>
              <li>
                <Link href="#contact" className="block py-2 px-3 md:p-0 text-[#003566] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
