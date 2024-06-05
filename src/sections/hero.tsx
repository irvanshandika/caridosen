/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("/dosens?search=" + search);
  };
  return (
    <>
      <div className="flex justify-center items-center lg:px-0 px-[10px] lg:h-[90vh] lg:my-14 my-32">
        <div className="lg:w-[1170px] lg:h-[547px] w-full h-[547px] flex flex-col bg-[#DFF6FF] shadow-sm lg:rounded-[40px] rounded-[10px] dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5 relative">
            <h1 className="lg:text-5xl text-xl text-center font-bold text-[#003566] lg:px-28 px-5 flex items-center">
              <span className="absolute top-0 right-0 -translate-x-5 translate-y-[9vh] rotate-12 md:block lg:-translate-x-[9vw] lg:translate-y-20">
                <svg className="lg:w-16 w-[40px] h-auto text-orange-500" width="121" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
                  <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
                  <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
                </svg>
              </span>
              Temukan Dosen Terbaik Menuju Kesuksesan Akademis
            </h1>
            <h2 className="mt-10 text-xl text-center font-medium text-[#003566] lg:px-40">
              Kami percaya bahwa di balik setiap pencapaian gemilang seorang mahasiswa, terdapat kehadiran dosen-dosen yang memotivasi, mendorong, dan menginspirasi.
            </h2>
            <div className="flex mt-10">
              <form onSubmit={handleSearch}>
                <div className="flex">
                  <input
                    type="text"
                    required
                    value={search}
                    onChange={(e: any) => setSearch(e.target.value)}
                    placeholder="Cari Dosen Kalian"
                    className="border-[#003566] border-2 rounded-[8px] lg:w-72 w-[200px] bg-[#DFF6FF] placeholder:text-[#003566]"
                  />
                  <button type="submit" className="bg-[#003566] text-white px-5 py-2 rounded-lg ml-2">
                    Cari
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
