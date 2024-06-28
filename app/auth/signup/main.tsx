/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { useCreateUserWithEmailAndPassword, useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@config/FirebaseConfig";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
import { Modal, TextInput, PasswordInput } from "@mantine/core";
import useSignInWithGoogle from "@hooks/GoogleSignIn";
import Image from "next/image";
import Link from "next/link";

const SignUp: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle();
  const [modalOpened, setModalOpened] = useState(false);
  const [userLoggedIn] = useAuthState(auth);

  useEffect(() => {
    if (userLoggedIn) {
      router.push("/");
    }
  }, [userLoggedIn, router]);

  const checkEmailExists = async (email: string) => {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length > 0;
  };

  const handleSignUpWithGoogle = async () => {
    try {
      await signInWithGoogle();

      if (user) {
        const { user: userInfo } = user;
        const emailExists = await checkEmailExists(userInfo.email!);
        if (!emailExists) {
          await addDoc(collection(db, "users"), {
            uid: userInfo.uid,
            displayName: userInfo.displayName,
            email: userInfo.email,
            roles: "user",
          });
        }
        sessionStorage.setItem("user", "true");
        router.push("/auth/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      if (res) {
        await addDoc(collection(db, "users"), {
          uid: res.user.uid,
          displayName: res.user.displayName,
          email: res.user.email,
          roles: "user",
        });
        sessionStorage.setItem("user", "true");
        setEmail("");
        setPassword("");
        router.push("/auth/signin");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <Image src="https://res.cloudinary.com/dszhlpm81/image/upload/v1711041098/assets/caridosen/logo_nf7fd1.png" className="w-32 mx-auto" alt="Dekorasi" width={128} height={0} />
            </div>
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleSignUpWithGoogle}
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
                        <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
                        <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                        <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
                      </svg>
                    </div>
                    <span className="ml-4">Sign Up with Google</span>
                  </button>
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-2/3">Or sign up with e-mail</div>
                </div>

                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleSignUp}>
                    <TextInput id="email" required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4" />
                    <PasswordInput id="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4" />
                    <div className="flex justify-end my-5">
                      <p>
                        Sudah Punya Akun?
                        <Link href="/auth/signin" className="ml-1 underline decoration-indigo-400 underline-offset-2">
                          Masuk
                        </Link>
                      </p>
                    </div>
                    <button
                      type="submit"
                      onClick={handleSignUp}
                      disabled={!email || !password}
                      className="tracking-wide disabled:cursor-not-allowed font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">Sign Up</span>
                    </button>
                  </form>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by templatana's
                    <Link href="https://policies.google.com/terms?hl=en" className="mx-1 border-b border-gray-500 border-dotted" target="_blank" rel="noreferrer">
                      Terms of Service
                    </Link>
                    and its
                    <Link href="https://policies.google.com/privacy?hl=en-US" className="mx-1 border-b border-gray-500 border-dotted" target="_blank" rel="noreferrer">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')" }}></div>
          </div>
        </div>
      </div>
      <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Error">
        <div>The email address is not registered.</div>
      </Modal>
    </>
  );
};

export default SignUp;
