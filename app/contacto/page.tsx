import type { Metadata } from "next";

import ContactPage from "@/components/sections/contact-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
    title: "Contacto — Análisis Gratuito y Propuesta Personalizada | BIA",
    description:
        "Contactá a BIA o completá el análisis gratuito para descubrir qué servicio, pack o propuesta personalizada se ajusta mejor a tu marca, web o proyecto digital.",
    path: "/contacto",
    ogImage: "/og/contacto.jpg",
    keywords: [
        "contacto diseño web",
        "análisis gratuito web",
        "diagnóstico digital",
        "propuesta personalizada web",
        "consultoría web y branding",
    ],
});

export default function ContactPageRoute() {
    return <ContactPage />;
}