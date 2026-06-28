import type { Metadata } from "next";

import ProcessPage from "@/components/sections/process-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
    title: "Proceso — Método de Trabajo Web y Branding | BIA",
    description:
        "Conocé el proceso de trabajo de BIA para ordenar ideas, definir prioridades, diseñar dirección visual y desarrollar experiencias web estratégicas con claridad.",
    path: "/proceso",
    ogImage: "/og/proceso.jpg",
    keywords: [
        "proceso de diseño web",
        "metodología de desarrollo web",
        "proceso de branding",
        "dirección visual",
        "desarrollo web estratégico",
    ],
});

export default function ProcesoPageRoute() {
    return <ProcessPage />;
}