import type { Metadata } from "next";

import HomePage from "@/components/sections/home-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    absolute: "BIA — Desarrollo Web & Branding Premium",
  },

  description:
    "Diseño y desarrollo web premium, branding visual y experiencias digitales para marcas, proyectos y profesionales que buscan elevar su percepción digital.",

  keywords: [...siteConfig.keywords],

  authors: [
    {
      name: siteConfig.creator,
    },
  ],

  creator: siteConfig.creator,
  publisher: siteConfig.name,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: siteConfig.name,
    title: "BIA — Desarrollo Web & Branding Premium",
    description:
      "Experiencias web premium, branding visual y dirección digital para construir una presencia más clara, sólida y profesional.",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "BIA — Desarrollo Web & Branding Premium",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "BIA — Desarrollo Web & Branding Premium",
    description:
      "Diseño web premium, branding visual y experiencias digitales orientadas a percepción, claridad y conversión.",
    images: ["/og/home.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return <HomePage />;
}