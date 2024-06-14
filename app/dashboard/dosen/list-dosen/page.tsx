import React from "react";
import Main from "./main";
import Sidebar from "@components/Sidebar";

export const metadata = {
  title: "List Dosen",
};

function ListDosen() {
  return (
    <>
      <Sidebar>
        <Main />
      </Sidebar>
    </>
  );
}

export default ListDosen;
