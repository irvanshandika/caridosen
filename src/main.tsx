/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./router.tsx";
// import "preline/dist/preline";
import { RouterProvider, BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "swiper/css";
import "@mantine/carousel/styles.css";
import LogRocket from "logrocket";
LogRocket.init("tdj5oo/caridosen");
LogRocket.identify("318675", {
  name: "Muhammad Irvan Shandika",
  email: "shandikamuhammadirvan@students.amikom.ac.id",
  subscriptionType: "pro",
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider>
        {/* <RouterProvider router={router} /> */}
        <Router />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
