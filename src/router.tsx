import { Routes, Route, Outlet } from "react-router-dom";
import Home from "@pages/Home";
import OurTeam from "@pages/OurTeam";
import NotFound from "@pages/NotFound";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import Dosens from "@pages/Dosens";
import RatingDosen from "@pages/RatingDosen";
import Forbidden from "@pages/Forbidden";
import Dashboard from "@pages/dashboard/Dashboard";
import Account from "@pages/dashboard/Account";
import Calendar from "@pages/dashboard/Calendar";
import Dosen from "@pages/dashboard/Dosen";
import DetailDosen from "@pages/dashboard/DetailDosen";
import UpdateDosen from "@pages/dashboard/EditDosen";
import TambahDosen from "@pages/dashboard/TambahDosen";
import ForgotPassword from "@pages/ForgotPassword";
import ManajemenUsers from "@pages/dashboard/Users";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

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
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/ourteam" element={<OurTeam />} />
          <Route path="/rating/:id" element={<RatingDosen />} />
          <Route path="/dosens" element={<Dosens />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/akun-saya/:id" element={<Account />} />
        <Route path="/dashboard/kalender" element={<Calendar />} />
        <Route path="/dashboard/dosen/lihat-dosen" element={<Dosen />} />
        <Route path="/dashboard/dosen/tambah-dosen" element={<TambahDosen />} />
        <Route path="/dashboard/dosen/detail-dosen/:id" element={<DetailDosen />} />
        <Route path="/dashboard/dosen/edit-dosen/:id" element={<UpdateDosen />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard/manajemen-users" element={<ManajemenUsers />} />
      </Routes>
    </>
  );
}

export default App;
