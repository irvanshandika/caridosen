/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useState, useEffect } from "react";
import DropdownSidebar from "./DropdownSidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "@src/config/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AppShell, Burger, Group, Card, Menu, rem, Breadcrumbs, Anchor } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUserFilled, IconCirclePlus } from "@tabler/icons-react";

type SidebarProps = {
  children: ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [opened, { toggle }] = useDisclosure();

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

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
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
            <button onClick={() => navigate("/")}>
              <img src="https://res.cloudinary.com/dszhlpm81/image/upload/v1711041098/assets/caridosen/logo_nf7fd1.png" className="w-[70px]" alt="Logo CariDosen" fetchPriority="low" />
            </button>
            <DropdownSidebar />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            <ul className="space-y-1.5">
              <li>
                <a
                  className="cursor-pointer w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
                  href="/dashboard">
                  <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  className="cursor-pointer w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
                  href={`/dashboard/akun-saya/${user?.uid}`}>
                  <svg className="flex-shrink-0 mt-0.5 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="15" r="3" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M10 15H6a4 4 0 0 0-4 4v2" />
                    <path d="m21.7 16.4-.9-.3" />
                    <path d="m15.2 13.9-.9-.3" />
                    <path d="m16.6 18.7.3-.9" />
                    <path d="m19.1 12.2.3-.9" />
                    <path d="m19.6 18.7-.4-1" />
                    <path d="m16.8 12.3-.4-1" />
                    <path d="m14.3 16.6 1-.4" />
                    <path d="m20.7 13.8 1-.4" />
                  </svg>
                  Akun Saya
                </a>
              </li>

              {isAdmin && (
                <>
                  <li>
                    <a
                      className="cursor-pointer w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
                      href="/dashboard/manajemen-users">
                      <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5 size-4" width="32" height="32" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87m-3-12a4 4 0 0 1 0 7.75" />
                        </g>
                      </svg>
                      Manajement Users
                    </a>
                  </li>
                  <li className="hs-accordion" id="projects-accordion">
                    <Menu shadow="md" width={200}>
                      <Menu.Target>
                        <button
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-neutral-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hs-accordion-active:text-white">
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
                        <Menu.Item leftSection={<IconUserFilled style={{ width: rem(14), height: rem(14) }} />} onClick={() => navigate("/dashboard/dosen/lihat-dosen")}>
                          <Anchor href="/dashboard/dosen/lihat-dosen" style={{ color: "black" }}>
                            List Dosen
                          </Anchor>
                        </Menu.Item>
                        <Menu.Item leftSection={<IconCirclePlus style={{ width: rem(14), height: rem(14) }} />} onClick={() => navigate("/dashboard/dosen/dosen/tambah-dosen")}>
                          <Anchor href="/dashboard/dosen/tambah-dosen" style={{ color: "black" }}>Tambah Dosen</Anchor>
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </li>
                </>
              )}
              <li>
                <a
                  className="cursor-pointer w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
                  href="/dashboard/kalender">
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
                </a>
              </li>
              <li>
                <a
                  className="cursor-pointer w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
                  href="/dashboard/dokumentasi">
                  <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5 size-4" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8L14 2h-4Zm2 3v5h5m-5 8h-4m4-4h-4" />
                  </svg>
                  Dokumentasi
                </a>
              </li>
            </ul>
          </nav>
        </AppShell.Navbar>
        <AppShell.Main>
          <Card shadow="xs" padding="xl" className="-m-[10px] bg-gray-300 h-screen">
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
          </Card>
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default Sidebar;
