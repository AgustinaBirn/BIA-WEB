import { siteConfig } from "@/lib/site-config";

export default function PortfolioStructuredData() {
    const portfolioSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Portfolio — BIA",
        url: `${siteConfig.url}/portfolio`,
        description:
            "Portfolio de proyectos web, branding visual y experiencias digitales desarrolladas con dirección estratégica por BIA.",
        isPartOf: {
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
        },
        about: [
            "Diseño web",
            "Desarrollo web",
            "Branding visual",
            "Experiencias digitales",
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(portfolioSchema),
            }}
        />
    );
}