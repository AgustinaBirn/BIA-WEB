import type { Metadata } from "next";

import ServicesPage from "@/components/sections/services-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
    title: "Servicios — Diseño Web, Desarrollo Web y Branding | BIA",
    description:
        "Servicios de diseño web, desarrollo web premium, branding visual, landing pages, sitios corporativos, portfolio web, rediseño web y propuestas personalizadas para marcas y profesionales.",
    path: "/servicios",
    ogImage: "/og/servicios.jpg",
    keywords: [
        "servicios de diseño web",
        "landing page profesional",
        "sitio web corporativo",
        "branding visual",
        "rediseño web",
        "portfolio web",
    ],
});

export default function ServiciosPageRoute() {
    return <ServicesPage />;
}