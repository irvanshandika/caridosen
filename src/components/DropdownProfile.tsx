/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { app } from "@config/FirebaseConfig";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import UserIcon from "@components/icons/UserIcon";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { Menu, Text, rem } from "@mantine/core";
import { IconRun, IconLayoutDashboardFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const DropdownSidebar = () => {
  const [user, setUser] = useState<any>(null);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const authInstance = getAuth(app);
    const unsubscribe = authInstance.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      router.push("/");
      await signOut(auth);
    } catch (error: any) {
      console.log("Error signing out: ", error.message);
    }
  };

  return (
    <>
      <Menu shadow="md">
        <Menu.Target>
          <button>{user && user.photoURL ? <Image src={user.photoURL} alt="Profile Picture" className="lg:size-11 size-11 rounded-full ml-2" width={44} height={44} /> : <UserIcon />}</button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>
            <Text size="sm" style={{ padding: rem(0.5), color: "black" }}>
              Sign in as
            </Text>
            <Text size="sm" style={{ padding: rem(0.5), color: "black" }}>
              {user && user.displayName}
            </Text>
          </Menu.Label>
          <Menu.Item leftSection={<IconLayoutDashboardFilled style={{ width: rem(14), height: rem(14) }} />}>
            <Link href="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item onClick={handleLogout} leftSection={<IconRun style={{ width: rem(14), height: rem(14) }} />}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default DropdownSidebar;
