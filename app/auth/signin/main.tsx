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
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
                        <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
                        <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                        <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
                      </svg>
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