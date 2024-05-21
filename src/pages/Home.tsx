import { Helmet } from "react-helmet";
import Hero from "@src/sections/hero";
import DosenMingguan from "@src/sections/dosenMingguan";
import Contact from "@src/sections/Contact";
import Fitur from "@src/sections/Fitur";

function Home() {
  return (
    <>
      <Helmet>
        <title>Home | CariDosen</title>
      </Helmet>
      <Hero />
      <DosenMingguan />
      <Fitur />
      <Contact />
    </>
  );
}

export default Home;
