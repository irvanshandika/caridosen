/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Menu, Text, rem } from "@mantine/core";
import { IconUserCircle, IconRun } from "@tabler/icons-react";
import UserIcon from "@components/icons/UserIcon";
import { app } from "@config/FirebaseConfig";
import Image from "next/image";

const DropdownSidebar = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        // Redirect to the homepage if the user is not logged in
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error: any) {
      console.log("Error signing out: ", error.message);
    }
  };

  return (
    <div className="lg:pl-[80vw] pl-[40vw]">
      <Menu shadow="md">
        <Menu.Target>
          <button>{user && user.photoURL ? <Image src={user.photoURL} alt="Profile Picture" className="w-8 h-8 rounded-full ml-2" width={32} height={32} /> : <UserIcon />}</button>
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
          <Menu.Item leftSection={<IconRun style={{ width: rem(15), height: rem(15) }} />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default DropdownSidebar;
