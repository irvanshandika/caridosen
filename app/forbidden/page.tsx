import React from "react";
import Main from "./main";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

export const metadata = {
  title: "Forbidden",
};

function Forbidden() {
  return (
    <>
      <Navbar />
      <Main />
      <Footer />
    </>
  );
}

export default Forbidden;
