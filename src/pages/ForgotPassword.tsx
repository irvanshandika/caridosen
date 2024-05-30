/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { auth } from "@config/FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
// import { RocketIcon } from "@radix-ui/react-icons";
import { Alert } from "@mantine/core";
import { IconRocket } from "@tabler/icons-react";
import { Helmet } from "react-helmet";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const resetEmail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
          navigate("/auth/signin");
        }, 4000);
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);
      });
  };

  return (
    <>
      <Helmet>
        <title>Reset Password | CariDosen</title>
      </Helmet>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-28 w-auto" src="https://res.cloudinary.com/dszhlpm81/image/upload/v1711041098/assets/caridosen/logo_nf7fd1.png" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white">Lupa Password</h2>
        </div>

        {showAlert && (
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <Alert title="Email Reset Password Terkirim" color="blue" icon={<IconRocket size={18} />} className="dark:bg-gray-800">
              <p className="text-sm dark:text-white">Silahkan cek email anda untuk mereset password.</p>
            </Alert>
          </div>
        )}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 dark:text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 dark:text-white shadow-sm ring-1 ring-inset dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => resetEmail()}
                disabled={!email}
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Send Forgot Password Email
              </button>
            </div>
            <div>
              <p className="text-center">
                Belum Punya Akun ?
                <button onClick={() => navigate("/auth/signup")} className="cursor-pointer ml-2 text-indigo-500">
                  <div className="font-medium inline-flex space-x-1 items-center">
                    <span>Daftar Sekarang</span>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                  </div>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
