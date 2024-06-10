/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./router.tsx";
// import "preline/dist/preline";
import { RouterProvider, BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dropzone/styles.css";

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
