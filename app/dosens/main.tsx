/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, Suspense } from "react";
import { db } from "@config/FirebaseConfig";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { useSearchParams, useRouter } from "next/navigation";
import { Alert, Card, Text, Badge, Group } from "@mantine/core";
import { IconStarFilled, IconInfoCircleFilled } from "@tabler/icons-react";
import Link from "next/link";

function Dosens() {
  const [Data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/dosens?search=" + search);
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
      <div className="flex flex-col justify-center items-center min-h-screen mt-20 mb-20">
        <form onSubmit={handleSearch} className="mb-5">
          <div className="flex">
            <input type="text" required value={search} onChange={(e: any) => setSearch(e.target.value)} placeholder="Cari Dosen Kalian" className="border-[#003566] border-2 rounded-[8px] w-72 bg-[#DFF6FF] placeholder:text-[#003566]" />
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
              <Link href={`/rating/${data.id}`} key={data.id}>
                <Card shadow="xs" className="m-4 w-80">
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
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default function WrappedDosens() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dosens />
    </Suspense>
  );
}
