/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { useNavigate } from "react-router-dom";
import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { DosenController } from "@src/controllers/DosenController";
import { NewDosenType } from "@src/types/dosen";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";

function DosenMingguan() {
  const [dosen, setDosen] = useState<NewDosenType[]>([]);
  const navigate = useNavigate();

  useEffect(
    () =>
      onSnapshot(DosenController, (snapshot: QuerySnapshot<DocumentData>) => {
        setDosen(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              nama: doc.data().nama,
              nip: doc.data().nip,
              email: doc.data().email,
              urlFoto: doc.data().urlFoto,
              createdBy: doc.data().createdBy,
            };
          })
        );
      }),
    []
  );

  return (
    <>
      <section className="my-14" id="dosenmingguan">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto my-10 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:mt-0 mt-10 lg:col-span-7 order-2 lg:order-1">
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
              Dosen Mingguan Dari <span className="text-blue-600">CariDosen</span>!
            </h1>
            <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">Dosen Pilihan Kami Untuk Minggu Ini</p>
          </div>
          <div className="flex justify-center lg:mt-0 lg:col-span-5 lg:flex order-1 lg:order-2">
            {dosen && dosen.length === 0 ? (
              <div className="min-h-60 w-full flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-900 dark:shadow-neutral-700/70">
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
                    className="icon icon-tabler icons-tabler-outline icon-tabler-database-off size-10 text-gray-500 dark:text-neutral-500">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12.983 8.978c3.955 -.182 7.017 -1.446 7.017 -2.978c0 -1.657 -3.582 -3 -8 -3c-1.661 0 -3.204 .19 -4.483 .515m-2.783 1.228c-.471 .382 -.734 .808 -.734 1.257c0 1.22 1.944 2.271 4.734 2.74" />
                    <path d="M4 6v6c0 1.657 3.582 3 8 3c.986 0 1.93 -.067 2.802 -.19m3.187 -.82c1.251 -.53 2.011 -1.228 2.011 -1.99v-6" />
                    <path d="M4 12v6c0 1.657 3.582 3 8 3c3.217 0 5.991 -.712 7.261 -1.74m.739 -3.26v-4" />
                    <path d="M3 3l18 18" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-800 dark:text-neutral-300">Oops! Belum Ada Dosen Minggu Ini</p>
                </div>
              </div>
            ) : (
              <>
                <Carousel slideSize="70%" style={{ height: "100%" }} align="start" slideGap="xs" controlsOffset="xl" controlSize={14} loop dragFree withIndicators>
                  {dosen.map((item) => (
                    <Card key={item.id} className="w-full h-auto">
                      <CardHeader>
                        <img src={item.urlFoto} alt={item.nama} className="object-cover w-full h-40 rounded-t-lg" fetchPriority="low" />
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="text-xs">{item.nama}</CardTitle>
                        <CardDescription>{item.nip}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <button onClick={() => navigate(`/rating/${item.id}`)} className="w-full px-4 py-2 mt-2 text-sm font-semibold text-white bg-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                          Beri Rating
                        </button>
                      </CardFooter>
                    </Card>
                  ))}
                </Carousel>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default DosenMingguan;
