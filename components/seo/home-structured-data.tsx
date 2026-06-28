import { mainServices } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

export default function ServicesStructuredData() {
    const servicesSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Diseño web, desarrollo web y branding visual",
        provider: {
            "@type": "ProfessionalService",
            name: siteConfig.name,
            url: siteConfig.url,
            email: siteConfig.contact.email,
            telephone: siteConfig.contact.whatsapp,
        },
        areaServed: {
            "@type": "Country",
            name: "Argentina",
        },
        serviceType: [
            "Diseño web",
            "Desarrollo web",
            "Branding visual",
            "Landing pages",
            "Sitios corporativos",
            "Portfolio web",
            "Rediseño web",
        ],
        description:
            "Servicios de diseño web premium, desarrollo web, branding visual y experiencias digitales orientadas a percepción, claridad y conversión.",
        offers: {
            "@type": "OfferCatalog",
            name: "Servicios principales de BIA",
            itemListElement: mainServices.map((service, index) => ({
                "@type": "Offer",
                position: index + 1,
                name: service.name,
                description: service.description,
                priceSpecification: [
                    {
                        "@type": "PriceSpecification",
                        priceCurrency: "ARS",
                        price: service.priceArs,
                    },
                    {
                        "@type": "PriceSpecification",
                        priceCurrency: "USD",
                        price: service.priceUsd,
                    },
                ],
            })),
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(servicesSchema),
            }}
        />
    );
}