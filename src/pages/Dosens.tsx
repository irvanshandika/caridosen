/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { db } from "@config/FirebaseConfig";
import { collection, getDocs } from "@firebase/firestore";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Dosens() {
  const [Data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  // const [notFoundMessage, setNotFoundMessage] = useState("");

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("/dosens?search=" + search);
  };

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "dosen"));
      const dosens = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        nama: doc.data().nama,
        nip: doc.data().nip,
        email: doc.data().email,
        urlFoto: doc.data().urlFoto,
      }));
      setData(dosens);
    };
    getData();
  }, []);

  useEffect(() => {
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";
    setSearch(searchQuery);
    const filtered = Data.filter((dosen) => dosen.nama.toLowerCase().includes(searchQuery));
    setFilteredData(filtered);

    if (filtered.length === 0 && searchQuery) {
      Swal.fire({
        title: "Tidak Ditemukan",
        text: `Nama Dosen "${searchParams.get("search")}" Tidak Ditemukan`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }, [searchParams, Data]);

  return (
    <>
      <Helmet>
        <title>Search Dosen | CariDosen</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center h-screen">
        <form onSubmit={handleSearch}>
          <div className="flex">
            <input type="text" value={search} onChange={(e: any) => setSearch(e.target.value)} placeholder="Cari Dosen Kalian" className="border-[#003566] border-2 rounded-[8px] w-72 bg-[#DFF6FF] placeholder:text-[#003566]" />
            <button type="submit" className="bg-[#003566] text-white px-5 py-2 rounded-lg ml-2">
              Cari
            </button>
          </div>
        </form>
        <div className="flex flex-wrap justify-center">
          {/* {notFoundMessage && <div className="text-center text-red-500 mt-4">{notFoundMessage}</div>} */}
          {filteredData.map((data: any) => (
            <div key={data.id} className="m-4">
              <div className="flex flex-col items-center">
                <img src={data.urlFoto} alt={data.nama} className="w-40 h-40 rounded-full" />
                <h1 className="text-center">{data.nama}</h1>
                <h2 className="text-center">{data.nip}</h2>
                <h3 className="text-center">{data.email}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dosens;
