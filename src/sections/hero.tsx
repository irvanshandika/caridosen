function Hero() {
  return (
    <>
      <div className="flex justify-center items-center lg:h-[90vh] lg:my-14 my-32">
        <div className="lg:w-[1170px] lg:h-[547px] w-full h-96 flex flex-col bg-[#DFF6FF] shadow-sm rounded-[40px] dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
            <h1 className="lg:text-5xl text-xl text-center font-bold text-[#003566] lg:px-28 px-0">Temukan Dosen Terbaik Menuju Kesuksesan Akademis</h1>
            <h2 className="mt-10 text-xl text-center font-medium text-[#003566] lg:px-40">
              Kami percaya bahwa di balik setiap pencapaian gemilang seorang mahasiswa, terdapat kehadiran dosen-dosen yang memotivasi, mendorong, dan menginspirasi.
            </h2>
            <div className="flex mt-10">
              <form action="">
                <div className="flex">
                  <input type="text" placeholder="Cari Dosen Kalian" className="border-[#003566] border-2 rounded-[8px] w-72 bg-[#DFF6FF] placeholder:text-[#003566]" />
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
