import { Helmet } from "react-helmet";
import Hero from "@src/sections/hero";
import DosenMingguan from "@src/sections/dosenMingguan";
import Contact from "@src/sections/Contact";
import Fitur from "@src/sections/Fitur";

function Home() {
  return (
    <>
      <Helmet>
        <title>Temukan Dosen Terbaik Menuju Kesuksesan Akademis | CariDosen</title>
        <meta name="description" content="Temukan Dosen Terbaik Menuju Kesuksesan Akademis" />
        <meta name="keywords" content="dosen, terbaik, akademis, caridosen" />
      </Helmet>
      <Hero />
      <DosenMingguan />
      <Fitur />
      <Contact />
    </>
  );
}

export default Home;
