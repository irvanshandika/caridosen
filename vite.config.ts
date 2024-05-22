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
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
});
