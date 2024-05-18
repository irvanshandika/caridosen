/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { db } from "@config/FirebaseConfig";
import { collection, getDocs } from "@firebase/firestore";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Alert, Card, Text, Badge } from "@mantine/core";
import { IconInfoCircleFilled } from "@tabler/icons-react";

function Dosens() {
  const [Data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
    setErrorMessage(filtered.length === 0 ? `Nama Dosen "${searchParams.get("search")}" Tidak Ditemukan` : "");
  }, [searchParams, Data]);

  const icon = <IconInfoCircleFilled />;

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
          {errorMessage ? (
            <div className="mt-10">
              <Alert variant="filled" color="red" withCloseButton title="Dosen Not Found" icon={icon}>
                {errorMessage}
              </Alert>
            </div>
          ) : (
            filteredData.map((data: any) => (
              <>
                <Card shadow="xs" className="m-5" style={{ width: 300 }}>
                  <img src={data.urlFoto} alt={data.nama} className="w-full h-48 object-cover" />
                  <div className="p-3">
                    <Text>{data.nama}</Text>
                    <Text size="xs">{data.nip}</Text>
                    <Text size="xs">{data.email}</Text>
                    <Badge color="blue" className="mt-2">
                      Dosen
                    </Badge>
                  </div>
                </Card>
              </>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Dosens;
