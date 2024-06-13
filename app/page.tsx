import React from "react";
import Navbar from "@components/Navbar";
import Hero from "@section/Hero";
import DosenMingguan from "@section/DosenMingguan";
import Fitur from "@section/Fitur";
import Contact from "@section/Contact";
import Footer from "@components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <DosenMingguan />
      <Fitur />
      <Contact />
      <Footer />
    </>
  );
}
