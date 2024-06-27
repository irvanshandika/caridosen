/* eslint-disable @next/next/no-img-element */
"use client";
import React, { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import DropdownSidebar from "./DropdownSidebar";
import { db } from "@config/FirebaseConfig"; // Adjust the import path as needed
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AppShell, Burger, Group, Menu, rem, Breadcrumbs, Anchor } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUserFilled, IconCirclePlus } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";

type SidebarProps = {
  children: ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const auth = getAuth();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [opened, { toggle }] = useDisclosure();

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        window.location.href = "/forbidden";
      }
    });
    return () => unsubscribe();
  }, [auth]);

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
  useEffect(() => {
    const getUserSuperAdmin = async () => {
      if (user) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setIsSuperAdmin(doc.data().roles === "superadmin");
        });
      }
    };
    getUserSuperAdmin();
  }, [user]);

  const generateBreadcrumbs = () => {
    const pathnames = pathname.split("/").filter((x) => x);
    return [
      { label: "Dashboard", path: "/dashboard" },
      ...pathnames.map((_, index) => {
        const url = `/${pathnames.slice(0, index + 1).join("/")}`;
        return { label: pathnames[index], path: url };
      }),
    ];
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <>
      <AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }} padding="md">
        <AppShell.Header>
          <Group h="100%" className="lg:px-20 px-5">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Link href="/">
              <Image src="https://res.cloudinary.com/dszhlpm81/image/upload/v1711041098/assets/caridosen/logo_nf7fd1.png" className="w-[70px] h-[40px]" width={70} height={40} alt="Logo CariDosen" fetchPriority="high" />
            </Link>
            <DropdownSidebar />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            <ul className="space-y-1.5">
              <li>
                <Link href="/dashboard" className="cursor-pointer w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100">
                  <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Dashboard
                </Link>
              </li>

              {isAdmin && (
                <>
                  <li className="hs-accordion" id="projects-accordion">
                    <Menu shadow="md" width={200}>
                      <Menu.Target>
                        <button
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-neutral-700 rounded-lg hover:bg-gray-100">
                          <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                          </svg>
                          Dosen
                          <svg
                            className="hs-accordion-active:hidden ms-auto block size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                          <svg
                            className="hs-accordion-active:block ms-auto hidden size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                        </button>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item onClick={() => router.push("/dashboard/dosen/list-dosen")} leftSection={<IconUserFilled style={{ width: rem(14), height: rem(14) }} />}>
                          <Anchor style={{ color: "black" }}>List Dosen</Anchor>
                        </Menu.Item>
                        <Menu.Item onClick={() => router.push("/dashboard/dosen/tambah-dosen")} leftSection={<IconCirclePlus style={{ width: rem(14), height: rem(14) }} />}>
                          <Anchor style={{ color: "black" }}>Tambah Dosen</Anchor>
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </li>
                </>
              )}

              {isSuperAdmin && (
                <>
                  <li>
                    <Link href="/dashboard/manajemen-users" className="cursor-pointer w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5 size-4" width="32" height="32" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87m-3-12a4 4 0 0 1 0 7.75" />
                        </g>
                      </svg>
                      Manajement Users
                    </Link>
                  </li>
                  <li className="hs-accordion" id="projects-accordion">
                    <Menu shadow="md" width={200}>
                      <Menu.Target>
                        <button
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-neutral-700 rounded-lg hover:bg-gray-100">
                          <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                          </svg>
                          Dosen
                          <svg
                            className="hs-accordion-active:hidden ms-auto block size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                          <svg
                            className="hs-accordion-active:block ms-auto hidden size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                        </button>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Link href="/dashboard/dosen/list-dosen">
                          <Menu.Item leftSection={<IconUserFilled style={{ width: rem(14), height: rem(14) }} />}>
                            <Anchor style={{ color: "black" }}>List Dosen</Anchor>
                          </Menu.Item>
                        </Link>
                        <Link href="/dashboard/dosen/tambah-dosen">
                          <Menu.Item leftSection={<IconCirclePlus style={{ width: rem(14), height: rem(14) }} />}>
                            <Anchor style={{ color: "black" }}>Tambah Dosen</Anchor>
                          </Menu.Item>
                        </Link>
                      </Menu.Dropdown>
                    </Menu>
                  </li>
                </>
              )}
              <li>
                <Link href="/dashboard/kalender" className="cursor-pointer w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5 size-4" width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3M3 11h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 9h.01M12 13h.01M19 13h.01M5 17h.01M12 17h.01M19 17h.01"
                    />
                  </svg>
                  Kalender
                </Link>
              </li>
              <li>
                <Link href="/dashboard/dokumentasi" className="cursor-pointer w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5 size-4" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6h-4Zm2 3v5h5m-5 8h-4m4-4h-4" />
                  </svg>
                  Dokumentasi
                </Link>
              </li>
            </ul>
          </nav>
        </AppShell.Navbar>
        <AppShell.Main>
          <div className="mb-4">
            <Breadcrumbs>
              {breadcrumbs.map((crumb, index) => {
                if (index === 0 || crumb.label !== "dashboard") {
                  return (
                    <Anchor key={crumb.path} href={crumb.path}>
                      {crumb.label.charAt(0).toUpperCase() + crumb.label.slice(1)}
                    </Anchor>
                  );
                }
                return null;
              })}
            </Breadcrumbs>
          </div>
          {children}
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default Sidebar;
