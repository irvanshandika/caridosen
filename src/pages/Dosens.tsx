/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { db } from "@config/FirebaseConfig";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Alert, Card, Text, Badge, Group } from "@mantine/core";
import { IconStarFilled, IconInfoCircleFilled } from "@tabler/icons-react";

function Dosens() {
  const [Data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("/dosens?search=" + search);
  };

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "dosen"));
      const dosens = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const dosenData = doc.data();
          const ratingsQuery = query(collection(db, "rating"), where("dosenId", "==", doc.id));
          const ratingsSnapshot = await getDocs(ratingsQuery);
          const ratings = ratingsSnapshot.docs.map((ratingDoc) => ratingDoc.data().rating);
          const averageRating = ratings.length > 0 ? ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length : 0;

          return {
            id: doc.id,
            nama: dosenData.nama,
            nip: dosenData.nip,
            email: dosenData.email,
            urlFoto: dosenData.urlFoto,
            averageRating: averageRating.toFixed(1), // Fixed to one decimal place
          };
        })
      );
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
        <meta name="description" content="Search Dosen" />
        <meta name="keywords" content="search, dosen, caridosen" />
      </Helmet>
      <div className="flex flex-col justify-center items-center min-h-screen mt-20 mb-20">
        <form onSubmit={handleSearch} className="mb-5">
          <div className="flex">
            <input type="text" value={search} onChange={(e: any) => setSearch(e.target.value)} placeholder="Cari Dosen Kalian" className="border-[#003566] border-2 rounded-[8px] w-72 bg-[#DFF6FF] placeholder:text-[#003566]" />
            <button type="submit" className="bg-[#003566] text-white px-5 py-2 rounded-lg ml-2">
              Cari
            </button>
          </div>
        </form>
        <div className="flex flex-wrap justify-center w-full px-4">
          {errorMessage ? (
            <div className="mt-10">
              <Alert variant="filled" color="red" withCloseButton title="Dosen Not Found" icon={icon}>
                {errorMessage}
              </Alert>
            </div>
          ) : (
            filteredData.map((data: any) => (
              <button onClick={() => navigate(`/rating/${data.id}`)}>
                <Card shadow="xs" className="m-4 w-80" key={data.id}>
                  <Card.Section>
                    <img src={data.urlFoto} alt={data.nama} className="w-full h-48 object-cover" />
                  </Card.Section>
                  <div className="p-3">
                    <Text className="text-lg font-semibold">{data.nama}</Text>
                    <Text size="sm" color="dimmed">
                      {data.nip}
                    </Text>
                    <Text size="sm" color="dimmed">
                      {data.email}
                    </Text>
                    <Group className="mt-2">
                      <Badge color="blue">Dosen</Badge>
                      <div className="flex items-center">
                        <Text className="mr-1">{data.averageRating}/5</Text>
                        <span className="ml-2">
                          <IconStarFilled className="text-yellow-300" size={16} />
                        </span>
                      </div>
                    </Group>
                  </div>
                </Card>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Dosens;
