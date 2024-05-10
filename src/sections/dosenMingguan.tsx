/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { Card, Text, Button, Group, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { DosenController } from "@src/controllers/DosenController";
import { NewDosenType } from "@src/types/dosen";

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
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
            <div className="lg:ml-10 ml:-0">
              <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
                Dosen Mingguan Dari <span className="text-blue-600">CariDosen</span>!
              </h1>
              <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">Dosen Pilihan Kami Untuk Minggu Ini</p>
            </div>

            <div className="relative lg:ms-5 ms-0">
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
                  <Carousel slideSize="70%" height={450} align="start" slideGap="xs" loop dragFree withControls={false} withIndicators>
                    {dosen?.map((dosen) => (
                      <Carousel.Slide>
                        <Card shadow="sm" padding="xl" radius="md" withBorder style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                          <Card.Section>
                            <div className="flex justify-center items-center">
                              <Image src={dosen.urlFoto} alt={dosen.nama} radius="md" h={200} w="auto" fit="contain" />
                            </div>
                          </Card.Section>

                          <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>{dosen.nama}</Text>
                          </Group>

                          <Text size="sm" c="dimmed">
                            {dosen.email}
                          </Text>

                          <Group mt="md" justify="space-between">
                            <Button color="blue" radius="md" onClick={() => navigate(`/rating/${dosen.id}`)}>
                              View Details
                            </Button>
                          </Group>
                        </Card>
                      </Carousel.Slide>
                    ))}
                  </Carousel>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DosenMingguan;
