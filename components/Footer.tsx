function Footer() {
  const years = new Date().getFullYear();
  return (
    <>
      <footer className="bg-white py-5 border-t-2 border-[#1E96FC]">
        <div className="container mx-auto px-5">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-base font-semibold">
              <span className="font-roboto">&copy;</span> {years} by WillPower Team
            </h1>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
