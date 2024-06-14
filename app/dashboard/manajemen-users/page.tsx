import React from "react";
import Main from "./main";
import Sidebar from "@components/Sidebar";

export const metadata = {
  title: "Manajemen Users",
};

function ManajemenUsers() {
  return (
    <>
      <Sidebar>
        <Main />
      </Sidebar>
    </>
  );
}

export default ManajemenUsers;
