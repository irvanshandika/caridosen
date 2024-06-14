import React from "react";
import Main from "./main";
import Sidebar from "@components/Sidebar";

export const metadata = {
  title: "Kalender",
};

function Kalender() {
  return (
    <>
      <Sidebar>
        <Main />
      </Sidebar>
    </>
  );
}

export default Kalender;
