import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/preline/preline.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        "sora": ["Sora", "sans-serif"],
        "roboto": ["Roboto", "sans-serif"],
        "qualcomm": ["Qualcomm Next", "sans-serif"],
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
};
export default config;
