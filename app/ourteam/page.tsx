import React from "react";
import Main from "./main";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

export const metadata = {
  title: "WillPower Team | CariDosen",
};

function WillPowerTeam() {
  return (
    <>
      <Navbar />
      <Main />
      <Footer />
    </>
  );
}

export default WillPowerTeam;
