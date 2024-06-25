/* eslint-disable @next/next/no-img-element */
import React from "react";
import DosenMingguanComponent from "@components/DosenMingguanComponent";

function DosenMingguan() {
  return (
    <>
      <section className="my-14 z-0" id="dosenmingguan">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto my-10 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:mt-0 mt-10 lg:col-span-7 order-2 lg:order-1">
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight">
              Dosen Mingguan Dari <span className="text-blue-600">CariDosen</span>!
            </h1>
            <p className="mt-3 text-lg text-gray-800">Dosen Pilihan Kami Untuk Minggu Ini</p>
          </div>
          <div className="flex justify-center lg:mt-0 lg:col-span-5 lg:flex order-1 lg:order-2 overflow-x-hidden">
            <DosenMingguanComponent />
          </div>
        </div>
      </section>
    </>
  );
}

export default DosenMingguan;
