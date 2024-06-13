import React from "react";
import Main from "./main";
import Sidebar from "@components/Sidebar";

export const metadata = {
  title: "Dashboard | CariDosen",
};

function Dashboard() {
  return (
    <>
      <Sidebar>
        <Main />
      </Sidebar>
    </>
  );
}

export default Dashboard;
