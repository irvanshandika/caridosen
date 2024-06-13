/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { app } from "@config/FirebaseConfig";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import UserIcon from "@components/icons/UserIcon";
import { Menu, Text, rem } from "@mantine/core";
import { IconUserCircle, IconRun } from "@tabler/icons-react";

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
      await signOut(auth);
      router.push("/");
    } catch (error: any) {
      console.log("Error signing out: ", error.message);
    }
  };

  return (
    <>
      <div className="lg:pl-[80vw] pl-[40vw]">
        <Menu shadow="md">
          <Menu.Target>
            <button>{user && user.photoURL ? <img src={user.photoURL} alt="Profile Picture" className="w-8 h-8 rounded-full ml-2" fetchPriority="high" /> : <UserIcon />}</button>
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
            <Menu.Item leftSection={<IconUserCircle style={{ width: rem(15), height: rem(15) }} />} onClick={() => router.push(`/dashboard/akun-saya/${user.uid}`)}>
              Profile
            </Menu.Item>
            <Menu.Item leftSection={<IconRun style={{ width: rem(15), height: rem(15) }} />} onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </>
  );
};

export default DropdownSidebar;
