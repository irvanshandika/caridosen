import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "preline/dist/preline";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import 'swiper/css';
import "@mantine/carousel/styles.css";
import LogRocket from "logrocket";
LogRocket.init("tdj5oo/caridosen");
LogRocket.identify("318675", {
  name: "Muhammad Irvan Shandika",
  email: "shandikamuhammadirvan@students.amikom.ac.id",

  // Add your own custom user variables here, ie:
  subscriptionType: "pro",
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
