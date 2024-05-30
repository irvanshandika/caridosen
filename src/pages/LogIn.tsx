import { useState } from "react";
import { app, auth } from "@config/FirebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Input } from "@components/ui/input";
import { Helmet } from "react-helmet";

function SignIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertError, setAlertError] = useState(false);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    setLoading(true);
    const authInstance = getAuth(app); // Menggunakan nama variabel yang berbeda untuk menghindari konflik
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(authInstance, provider); // Menggunakan authInstance
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Mencegah tindakan default pada form submit
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem("user", "true"); // Mengubah nilai menjadi string
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (e) {
      console.error(e);
      setAlertError(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In | Caridosen</title>
        <meta name="description" content="Sign In to Caridosen" />
        <meta name="keywords" content="sign in, caridosen, login" />
      </Helmet>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center font-sora">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img src="https://res.cloudinary.com/dszhlpm81/image/upload/v1711041098/assets/caridosen/logo_nf7fd1.png" className="w-32 mx-auto" fetchPriority="low" />
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

                  <button
                    disabled
                    className="w-full max-w-xs disabled:cursor-not-allowed font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                    <div className="bg-white p-1 rounded-full">
                      <svg className="w-6" viewBox="0 0 32 32">
                        <path
                          fillRule="evenodd"
                          d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Sign In with GitHub</span>
                  </button>
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-2/3">Or sign In with e-mail</div>
                </div>

                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleSignIn}>
                    <Input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {alertError && (
                      <div className="my-4">
                        <span className="text-red-600 text-center font-semibold">Wrong Email or Password!</span>
                      </div>
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
