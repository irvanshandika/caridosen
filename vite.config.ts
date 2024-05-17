/* eslint-disable @typescript-eslint/no-unused-vars */
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@components": path.resolve(__dirname, "./components"),
      "@src": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@config": path.resolve(__dirname, "./src/config"),
    },
  },
  define: {
    "process.env.APIKEY": JSON.stringify(process.env.APIKEY),
    "process.env.AUTHDOMAIN": JSON.stringify(process.env.AUTHDOMAIN),
    "process.env.PROJECTID": JSON.stringify(process.env.PROJECTID),
    "process.env.STORAGEBUCKET": JSON.stringify(process.env.STORAGEBUCKET),
    "process.env.MESSAGINGSENDERID": JSON.stringify(process.env.MESSAGINGSENDERID),
    "process.env.APPID": JSON.stringify(process.env.APPID),
    "process.env.MEASUREMENTID": JSON.stringify(process.env.MEASUREMENTID),
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
});
