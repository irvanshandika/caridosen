import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@components/ui/button";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 Not Found | CariDosen</title>
        <meta name="description" content="404 Not Found" />
        <meta name="keywords" content="404, not found, caridosen" />
      </Helmet>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">404 Not Found</h1>
        <div className="mt-3">
          <Link to="/">
            <Button variant="outline">Kembali Ke Halaman Utama</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;
