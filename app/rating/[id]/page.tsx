// app/rating/[id]/page.tsx
import React from "react";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Main from "./main";
import { generateStaticParams as importedGenerateStaticParams } from "../generateStaticParams";

export const metadata = {
  title: "Rating Dosen",
};

export async function generateStaticParams() {
  const params = await importedGenerateStaticParams();
  return params;
}

const RatingDosen = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Navbar />
      <Main id={params.id} />
      <Footer />
    </>
  );
};

export default RatingDosen;
