import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "@/components";

const Degular = localFont({
  src: [
    {
      path: "../public/fonts/Degular/Degular-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Degular/Degular-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/Degular/Degular-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Degular/Degular-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Degular/Degular-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Degular/Degular-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Degular/Degular-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Degular/Degular-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Degular/Degular-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Degular/Degular-SemiboldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/Degular/Degular-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Degular/Degular-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Degular/Degular-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/Degular/Degular-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-degular",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mainstack",
  description: "Built by Howard Otuya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${Degular.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
