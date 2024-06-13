import Link from "next/link";
import { Button } from "@mantine/core";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

export const metadata = {
  title: "404 Not Found | CariDosen",
};

function NotFound() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">404 Not Found</h1>
        <div className="mt-3">
          <Link href="/">
            <Button variant="outline">Kembali Ke Halaman Utama</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
