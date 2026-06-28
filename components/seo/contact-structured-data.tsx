import { siteConfig } from "@/lib/site-config";

export default function ContactStructuredData() {
    const contactSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contacto — BIA",
        url: `${siteConfig.url}/contacto`,
        description:
            "Página de contacto de BIA para solicitar orientación inicial, análisis gratuito, diseño web, branding, rediseño o propuesta personalizada.",
        isPartOf: {
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
        },
        mainEntity: {
            "@type": "ProfessionalService",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
            email: siteConfig.contact.email,
            telephone: siteConfig.contact.whatsapp,
            sameAs: [siteConfig.contact.instagram],
            contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                email: siteConfig.contact.email,
                telephone: siteConfig.contact.whatsapp,
                availableLanguage: ["Spanish"],
                areaServed: ["AR", "Latam"],
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(contactSchema),
            }}
        />
    );
}