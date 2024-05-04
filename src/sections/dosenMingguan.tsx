/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Card, Text, Badge, Button, Group } from "@mantine/core";
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
              nidn: doc.data().nidn,
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
        <div className="container mx-auto px-5 py-5">
          <div className="py-1 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="flex flex-col justify-center order-2 lg:order-1 lg:mt-0 -mt-56">
              <h1 className="mb-2 font-normal tracking-tight leading-none text-gray-900 dark:text-white md:text-5xl text-3xl lg:text-6xl lg:text-left">Dosen Minggu Ini !</h1>
              <p className="lg:text-xl text-base">Dosen Terpopuler Setiap Minggunya</p>
            </div>
            <div className="flex justify-center order-1 lg:order-2">
              {dosen && dosen.length === 0 ? (
                <div className="min-h-60 w-full flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                  <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                    <svg
                      className="size-10 text-gray-500 dark:text-neutral-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <line x1="22" x2="2" y1="12" y2="12"></line>
                      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                      <line x1="6" x2="6.01" y1="16" y2="16"></line>
                      <line x1="10" x2="10.01" y1="16" y2="16"></line>
                    </svg>
                    <p className="mt-2 text-sm text-gray-800 dark:text-neutral-300">Belum Dosen Minggu Ini</p>
                  </div>
                </div>
              ) : (
                <>
                  <Carousel height={500} slideGap="lg" controlsOffset="xs" controlSize={24} loop dragFree withIndicators>
                    {dosen?.map((dosen) => (
                      <>
                        <Carousel.Slide>
                          <Card shadow="sm" padding="xs" radius="md">
                            <Card.Section>
                              <div className="flex justify-center items-center my-10">
                                <img src={dosen.urlFoto} className="lg:w-[200px] lg:h-auto w-[100px] h-[100px] rounded-full" alt="Norway" />
                              </div>
                            </Card.Section>

                            <Group justify="space-between" mt="md" mb="xs">
                              <Text fw={500}>{dosen.nama}</Text>
                              <Badge color="pink">#1</Badge>
                            </Group>

                            <Text size="sm" c="dimmed">
                              {dosen.nidn}
                            </Text>

                            <Button color="blue" mt="md" radius="md" onClick={() => navigate(`/rating/${dosen.id}`)}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 size-4 mr-2" width="32" height="32" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  d="M11 12q-1.65 0-2.825-1.175T7 8t1.175-2.825T11 4t2.825 1.175T15 8t-1.175 2.825T11 12m10.4 10.8l-2.5-2.5q-.525.3-1.125.5T16.5 21q-1.875 0-3.187-1.312T12 16.5t1.313-3.187T16.5 12t3.188 1.313T21 16.5q0 .675-.2 1.275t-.5 1.125l2.5 2.5q.275.275.275.7t-.275.7t-.7.275t-.7-.275M16.5 19q1.05 0 1.775-.725T19 16.5t-.725-1.775T16.5 14t-1.775.725T14 16.5t.725 1.775T16.5 19M5 20q-.825 0-1.412-.587T3 18v-.775q0-.85.425-1.575t1.175-1.1q1.125-.575 2.488-.987t2.987-.538q.3-.025.45.25t.025.575q-.275.625-.413 1.288T10 16.475q0 .65.113 1.313t.387 1.262q.15.35-.025.65t-.525.3z"
                                />
                              </svg>
                              Lihat Detail
                            </Button>
                          </Card>
                        </Carousel.Slide>
                      </>
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
