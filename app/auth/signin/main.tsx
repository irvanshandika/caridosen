/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect } from "react";
import { app, auth } from "@config/FirebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Alert, TextInput, PasswordInput } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import GoogleIcon from "@/src/components/icons/GoogleIcon";

function SignIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertError, setAlertError] = useState(false);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const router = useRouter();

  useEffect(() => {
    const authInstance = getAuth(app);
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        router.push("/"); // Redirect to the dashboard or home page if the user is logged in
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  const signInWithGoogle = async () => {
    setLoading(true);
    const authInstance = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(authInstance, provider);
      const user = result.user;
      // Check if the user is in the Firebase auth table
      if (user) {
        router.push("/");
      } else {
        setAlertError(true);
        authInstance.signOut();
      }
    } catch (error) {
      console.log(error);
      setAlertError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res) {
        sessionStorage.setItem("user", "true");
        setEmail("");
        setPassword("");
        router.push("/");
      } else {
        setAlertError(true);
      }
    } catch (e) {
      console.error(e);
      setAlertError(true);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center font-sora">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img src="https://res.cloudinary.com/dszhlpm81/image/upload/v1711041098/assets/caridosen/logo_nf7fd1.png" className="w-32 mx-auto" fetchPriority="high" />
            </div>
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  <button
                    onClick={signInWithGoogle}
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                      <GoogleIcon />
                    </div>
                    <span className="ml-4">{loading ? "Loading..." : "Sign In with Google"}</span>
                  </button>
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-2/3">Or sign In with e-mail</div>
                </div>

                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleSignIn}>
                    <TextInput id="email" required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4" />
                    <PasswordInput id="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4" />
                    {alertError && (
                      <Alert color="red" className="mt-4" onClose={() => setAlertError(false)}>
                        <div className="flex justify-center items-center">
                          <h1 className="flex text-red-500 font-bold">
                            <span className="mr-1">
                              <IconAlertTriangle className="w-5 h-5" />
                            </span>
                            ERROR
                          </h1>
                        </div>
                        <p className="text-center text-red-400">There was an error with your submission. Please make sure your email and password are correct and try again.</p>
                      </Alert>
                    )}
                    <div className="flex flex-col justify-end items-end my-5">
                      <p>
                        Belum Punya Akun?
                        <a href="/auth/signup" className="ml-1 underline decoration-indigo-400 underline-offset-2">
                          Daftar
                        </a>
                      </p>
                      <p>
                        Lupa Password?
                        <a href="/auth/forgot-password" className="ml-1 underline decoration-indigo-400 underline-offset-2">
                          Lupa Password
                        </a>
                      </p>
                    </div>
                    <button
                      type="submit"
                      disabled={!email || !password}
                      className="tracking-wide font-semibold disabled:cursor-not-allowed bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 -ml-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M9 2h9c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2v-1a1 1 0 0 1 2 0v1h9V4H9v1a1 1 0 1 1-2 0V4c0-1.1.9-2 2-2" />
                        <path fill="currentColor" d="M10.795 16.295c.39.39 1.02.39 1.41 0l3.588-3.588a1 1 0 0 0 0-1.414l-3.588-3.588a.999.999 0 0 0-1.411 1.411L12.67 11H4a1 1 0 0 0 0 2h8.67l-1.876 1.884a.999.999 0 0 0 .001 1.411" />
                      </svg>
                      <span className="ml-3">Sign In</span>
                    </button>
                  </form>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by templatana's
                    <a href="https://policies.google.com/terms?hl=en" className="mx-1 border-b border-gray-500 border-dotted" target="_blank" rel="noreferrer">
                      Terms of Service
                    </a>
                    and its
                    <a href="https://policies.google.com/privacy?hl=en-US" className="mx-1 border-b border-gray-500 border-dotted" target="_blank" rel="noreferrer">
                      Privacy Policy
                    </a>
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
    </>
  );
}

export default SignIn;
