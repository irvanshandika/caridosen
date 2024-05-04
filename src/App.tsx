import { useEffect } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Home from "@src/pages/Home";
import NotFound from "@src/pages/NotFound";
import SignIn from "@src/pages/LogIn";
import SignUp from "@src/pages/SignUp";
import InformationDosen from "@/src/pages/RatingDosen";
import Forbidden from "@src/pages/Forbidden";
import Dashboard from "@src/pages/dashboard/Dashboard";
import Account from "@src/pages/dashboard/Account";
import Calendar from "@src/pages/dashboard/Calendar";
import Dosen from "@src/pages/dashboard/Dosen";
import DetailDosen from "@src/pages/dashboard/DetailDosen";
import UpdateDosen from "@src/pages/dashboard/EditDosen";
import TambahDosen from "@src/pages/dashboard/TambahDosen";
import ForgotPassword from "@src/pages/ForgotPassword";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import "preline/preline";

import { IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/rating/:id" element={<InformationDosen />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/account" element={<Account />} />
        <Route path="/dashboard/calendar" element={<Calendar />} />
        <Route path="/dashboard/dosen/lihat-dosen" element={<Dosen />} />
        <Route path="/dashboard/dosen/tambah-dosen" element={<TambahDosen />} />
        <Route path="/dashboard/dosen/detail-dosen/:id" element={<DetailDosen />} />
        <Route path="/dashboard/dosen/edit-dosen/:id" element={<UpdateDosen />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
