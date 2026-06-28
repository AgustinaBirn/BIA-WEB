import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RouteScrollReset from "@/components/layout/route-scroll-reset";
import Navbar from "@/components/layout/navbar";
import GlobalCursorAura from "@/components/layout/global-cursor-aura";
import Footer from "@/components/layout/footer";

const satoshi = localFont({
  variable: "--font-satoshi",
  display: "swap",
  src: [
    {
      path: "./fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

const generalSans = localFont({
  variable: "--font-general-sans",
  display: "swap",
  src: [
    {
      path: "./fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/GeneralSans-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
  ],
});

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    {
      path: "./fonts/Inter-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Inter-Medium.woff",
      weight: "500",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "BIA — Desarrollo Web & Branding",
  description:
    "Diseño y desarrollo web premium, branding visual, UX/UI y experiencias digitales para marcas y proyectos que buscan diferenciarse con presencia y dirección.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${satoshi.variable} ${generalSans.variable} ${inter.variable}`}
    >
      <body className="bg-background text-foreground antialiased overflow-x-hidden">
        <RouteScrollReset />
        <Navbar />

        <div className="bia-route-content">
          {children}
          <Footer />
        </div>

        <GlobalCursorAura />
      </body>
    </html>
  );
}