import { homePageContent } from "@/lib/home-page-content";
import { siteConfig } from "@/lib/site-config";

export default function GuideStructuredData() {
    const guideSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Guía para contratar una web, branding o desarrollo digital",
        url: `${siteConfig.url}/guia`,
        description:
            "Guía educativa de BIA para entender conceptos básicos antes de contratar una web, branding visual, dominio, hosting, UX/UI o desarrollo digital.",
        isPartOf: {
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
        },
        about: [
            "Diseño web",
            "Desarrollo web",
            "Branding visual",
            "Dominio",
            "Hosting",
            "UX/UI",
            "SEO",
            "Tipos de sitios web",
        ],
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: homePageContent.faq.items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(guideSchema),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
        </>
    );
}