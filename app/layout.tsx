/* eslint-disable @next/next/next-script-for-ga */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { MantineProvider } from "@mantine/core";
import PrelineScript from "@components/PrelineScript";

export const metadata: Metadata = {
  title: "Temukan Dosen Terbaik Menuju Kesuksesan Akademis | CariDosen",
  description: "Temukan Dosen Terbaik Menuju Kesuksesan Akademis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Temukan Dosen Terbaik Menuju Kesuksesan Akademis" />
        <meta property="og:url" content="https://caridosen.my.id" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="CariDosen" />
        <meta property="og:description" content="Temukan Dosen Terbaik Menuju Kesuksesan Akademis" />
        <meta
          property="og:image"
          content="https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v4/caridosen.my.id/CariDosen/https%3A%2F%2Fogcdn.net%2Fe4b8c678-7bd5-445d-ba03-bfaad510c686%2Fv4%2Fdosen.web.app%2FCariDosen%2Fhttps%253A%252F%252Fopengraph.b-cdn.net%252Fproduction%252Fdocuments%252F56188dc2-e3c3-4ce5-a8b1-1323953e37b9.jpg%253Ftoken%253DFORiB3YuXMB9HERtclPAWWBLMSBisufr3mJbjlWtsrQ%2526height%253D800%2526width%253D1200%2526expires%253D33239445186%2Fog.png/og.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="caridosen.my.id" />
        <meta property="twitter:url" content="https://caridosen.my.id" />
        <meta name="twitter:title" content="CariDosen" />
        <meta name="twitter:description" content="Temukan Dosen Terbaik Menuju Kesuksesan Akademis" />
        <meta
          name="twitter:image"
          content="https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v4/caridosen.my.id/CariDosen/https%3A%2F%2Fogcdn.net%2Fe4b8c678-7bd5-445d-ba03-bfaad510c686%2Fv4%2Fdosen.web.app%2FCariDosen%2Fhttps%253A%252F%252Fopengraph.b-cdn.net%252Fproduction%252Fdocuments%252F56188dc2-e3c3-4ce5-a8b1-1323953e37b9.jpg%253Ftoken%253DFORiB3YuXMB9HERtclPAWWBLMSBisufr3mJbjlWtsrQ%2526height%253D800%2526width%253D1200%2526expires%253D33239445186%2Fog.png/og.png"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora&amp;display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&amp;display=swap" />
        <link href="https://db.onlinewebfonts.com/c/359d857da0b957059a42b643ad6e743e?family=Qualcomm+Next" rel="stylesheet" type="text/css" />
      </head>
      <body className="font-sora">
        <MantineProvider>
          {children}
          <PrelineScript />
        </MantineProvider>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MDBFTLF4" height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MDBFTLF4');
            `,
          }}
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4562971560092974" crossOrigin="anonymous"></script>
        <script src="https://kit.fontawesome.com/c7e6574aa8.js" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
