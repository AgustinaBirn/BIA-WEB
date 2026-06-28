import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

type SeoPageConfig = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  keywords?: string[];
};

export function buildPageMetadata({
  title,
  description,
  path,
  ogImage = "/og/default.jpg",
  keywords = [],
}: SeoPageConfig): Metadata {
  const pageUrl = `${siteConfig.url}${path}`;

  return {
    metadataBase: new URL(siteConfig.url),

    title: {
      absolute: title,
    },

    description,

    keywords: [...siteConfig.keywords, ...keywords],

    authors: [
      {
        name: siteConfig.creator,
      },
    ],

    creator: siteConfig.creator,
    publisher: siteConfig.name,

    alternates: {
      canonical: path,
    },

    openGraph: {
      type: "website",
      locale: "es_AR",
      url: pageUrl,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
