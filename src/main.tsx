import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router";
// import "preline/dist/preline";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
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
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
