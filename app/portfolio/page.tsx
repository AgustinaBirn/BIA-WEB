import type { Metadata } from "next";

import PortfolioPage from "@/components/sections/portfolio-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
    title: "Portfolio — Proyectos Web y Branding | BIA",
    description:
        "Portfolio de proyectos web, branding visual y experiencias digitales desarrolladas con dirección estratégica, estética premium y enfoque en percepción digital.",
    path: "/portfolio",
    ogImage: "/og/portfolio.jpg",
    keywords: [
        "portfolio diseño web",
        "proyectos web",
        "portfolio branding",
        "casos de diseño web",
        "experiencias digitales premium",
    ],
});

export default function PortfolioPageRoute() {
    return <PortfolioPage />;
}