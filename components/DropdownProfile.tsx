/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { app } from "@src/config/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import UserIcon from "@components/icons/UserIcon";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@components/ui/dropdown-menu";

const DropdownSidebar = () => {
  const [user, setUser] = useState<any>(null);
  const auth = getAuth();
  const navigate = useNavigate();

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
      navigate("/");
    } catch (error: any) {
      console.log("Error signing out: ", error.message);
    }
  };

  return (
    <>
      <div className="relative inline-flex">
        <DropdownMenu>
          <DropdownMenuTrigger>{user && user.photoURL ? <img src={user.photoURL} alt="Profile Picture" className="w-8 h-8 rounded-full ml-2" fetchPriority="low" /> : <UserIcon />}</DropdownMenuTrigger>
          <DropdownMenuContent>
            <button>
              <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-neutral-800">
                <DropdownMenuLabel>
                  <p className="text-sm text-gray-500 dark:text-neutral-400">Signed in as</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-neutral-300">{user?.email}</p>
                </DropdownMenuLabel>
              </div>
            </button>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
              onClick={() => navigate("/dashboard")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="flex-shrink-0 size-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M12 4.75c-1.06 0-1.91.328-3.934 1.138L5.257 7.01c-1.01.404-1.71.686-2.164.924a4.11 4.11 0 0 0-.12.065l.12.065c.454.238 1.154.52 2.164.924l2.809 1.123c2.025.81 2.874 1.138 3.934 1.138s1.91-.328 3.934-1.138l2.809-1.123c1.01-.404 1.71-.686 2.164-.924l.12-.065a4.086 4.086 0 0 0-.12-.065c-.454-.238-1.154-.52-2.164-.924l-2.809-1.123C13.91 5.078 13.06 4.75 12 4.75m-4.376-.301C9.501 3.698 10.621 3.25 12 3.25c1.38 0 2.499.448 4.376 1.199l.115.046l2.854 1.142c.955.382 1.728.69 2.259.969c.268.14.528.3.729.493c.206.198.417.498.417.901s-.21.703-.417.901c-.2.193-.46.352-.73.493c-.53.278-1.303.587-2.258.97l-2.854 1.14l-.115.047c-1.877.751-2.997 1.199-4.376 1.199c-1.38 0-2.499-.448-4.376-1.199l-.115-.046l-2.854-1.142c-.955-.382-1.728-.69-2.259-.969a3.21 3.21 0 0 1-.729-.493C1.461 8.703 1.25 8.403 1.25 8s.21-.703.417-.901c.2-.193.46-.352.73-.493c.53-.278 1.303-.587 2.258-.97l2.854-1.14zM2.5 11.44l.004.003l.024.021a7.568 7.568 0 0 0 .626.451c.46.299 1.161.696 2.104 1.074l2.809 1.123c2.025.81 2.874 1.138 3.934 1.138s1.91-.328 3.934-1.138l2.809-1.123a12.23 12.23 0 0 0 2.104-1.074a7.557 7.557 0 0 0 .65-.472l.003-.002l.001-.001a.75.75 0 0 1 1 1.118L22 12l.5.558v.002l-.002.001l-.005.004l-.014.012c-.01.01-.026.023-.045.039a9.109 9.109 0 0 1-.77.558A13.72 13.72 0 0 1 19.3 14.38l-2.809 1.124l-.115.046c-1.877.751-2.997 1.199-4.376 1.199c-1.38 0-2.499-.448-4.376-1.199l-.115-.046L4.7 14.38a13.72 13.72 0 0 1-2.363-1.207a9.088 9.088 0 0 1-.771-.558a2.962 2.962 0 0 1-.045-.039l-.014-.012l-.005-.004l-.001-.002H1.5L2 12l-.5.559a.75.75 0 0 1 .999-1.119m19 4.001l.002-.001a.75.75 0 0 1 1 1.118L22 16l.5.558v.002l-.002.001l-.005.004l-.014.012a5.337 5.337 0 0 1-.207.168c-.14.108-.342.256-.609.429A13.72 13.72 0 0 1 19.3 18.38l-2.809 1.124l-.115.046c-1.877.751-2.997 1.199-4.376 1.199c-1.38 0-2.499-.448-4.376-1.199l-.115-.046L4.7 18.38a13.72 13.72 0 0 1-2.363-1.207a9.088 9.088 0 0 1-.771-.558a2.962 2.962 0 0 1-.045-.039l-.014-.012l-.005-.004l-.001-.002H1.5L2 16l-.5.559a.75.75 0 0 1 1-1.118l.003.002l.024.021a7.568 7.568 0 0 0 .626.451c.46.299 1.161.696 2.104 1.074l2.809 1.123c2.025.81 2.874 1.138 3.934 1.138s1.91-.328 3.934-1.138l2.809-1.123a12.23 12.23 0 0 0 2.104-1.074a7.557 7.557 0 0 0 .65-.472z"
                  clipRule="evenodd"
                />
              </svg>
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 size-4" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path d="M12 4a1 1 0 1 0 2 0a1 1 0 1 0-2 0M7 21l3-4m6 4l-2-4l-3-3l1-6" />
                  <path d="m6 12l2-3l4-1l3 3l3 1" />
                </g>
              </svg>
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default DropdownSidebar;
