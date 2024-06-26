"use client";
import { useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@config/FirebaseConfig";
import { Card, Text, Button, Group } from "@mantine/core";
import { IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

type NewDosenType = {
  id: string;
  nama: string;
  nip: string;
  email: string;
  urlFoto: string;
  averageRating: number;
  ratingCount: number;
};

const DosenMingguanComponent = () => {
  const [dosen, setDosen] = useState<NewDosenType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const dosenSnapshot = await getDocs(collection(db, "dosen"));
      const dosens = await Promise.all(
        dosenSnapshot.docs.map(async (doc) => {
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
            averageRating,
            ratingCount: ratings.length,
          };
        })
      );
      // Filter dosens with average rating >= 4 and sort by average rating in descending order
      const filteredDosens = dosens.filter((dosen) => dosen.averageRating >= 4).sort((a, b) => b.averageRating - a.averageRating);
      setDosen(filteredDosens);
    };

    getData();
  }, []);
  return (
    <>
      {dosen && dosen.length === 0 ? (
        <div className="min-h-60 w-full flex flex-col bg-white border shadow-sm rounded-xl">
          <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-database-off size-10 text-gray-500">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12.983 8.978c3.955 -.182 7.017 -1.446 7.017 -2.978c0 -1.657 -3.582 -3 -8 -3c-1.661 0 -3.204 .19 -4.483 .515m-2.783 1.228c-.471 .382 -.734 .808 -.734 1.257c0 1.22 1.944 2.271 4.734 2.74" />
              <path d="M4 6v6c0 1.657 3.582 3 8 3c.986 0 1.93 -.067 2.802 -.19m3.187 -.82c1.251 -.53 2.011 -1.228 2.011 -1.99v-6" />
              <path d="M4 12v6c0 1.657 3.582 3 8 3c3.217 0 5.991 -.712 7.261 -1.74m.739 -3.26v-4" />
              <path d="M3 3l18 18" />
            </svg>
            <p className="mt-2 text-sm text-gray-800">Oops! Belum Ada Dosen Minggu Ini</p>
          </div>
        </div>
      ) : (
        <Carousel slideSize="70%" style={{ height: "100%" }} slideGap="xs" controlsOffset="xl" withControls={false} controlSize={14} loop dragFree withIndicators>
          {dosen.map((item) => (
            <Carousel.Slide key={item.id}>
              <Card shadow="sm" p="lg" radius="md" withBorder style={{ height: "100%" }}>
                <Card.Section>
                  <Image src={item.urlFoto} alt={item.nama} className="object-cover w-full h-52 rounded-t-lg" width={100} height={208} />
                </Card.Section>

                <Group mt="md" mb="xs">
                  <Text style={{ minHeight: "1.5em" }}>{item.nama}</Text>
                </Group>

                <Text size="sm" color="dimmed">
                  {item.nip}
                </Text>

                <Group className="mt-2">
                  <div className="flex items-center">
                    <Text className="mr-1">{item.averageRating.toFixed(1)}/5</Text>
                    <IconStarFilled className="text-yellow-300" size={16} />
                    <Text className="ml-1">({item.ratingCount})</Text>
                  </div>
                </Group>
                <Link href={`/rating/${item.id}`}>
                  <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                    Beri Rating
                  </Button>
                </Link>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default DosenMingguanComponent;
