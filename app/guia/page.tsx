import type { Metadata } from "next";

import GuidePage from "@/components/sections/guide-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
    title: "Guía para Contratar una Web, Dominio, Hosting y Branding | BIA",
    description:
        "Guía clara para entender qué es una sección web, tipos de sitios web, dominio, hosting, branding visual y conceptos clave antes de contratar una web profesional.",
    path: "/guia",
    ogImage: "/og/guia.jpg",
    keywords: [
        "qué es una sección web",
        "tipos de páginas web",
        "qué es dominio",
        "qué es hosting",
        "qué es branding visual",
        "cómo contratar una web",
        "guía para contratar sitio web",
    ],
});

export default function GuiaPageRoute() {
    return <GuidePage />;
}