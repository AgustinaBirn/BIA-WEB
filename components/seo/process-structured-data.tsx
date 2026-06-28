import { processPageContent } from "@/lib/process-page-content";
import { siteConfig } from "@/lib/site-config";

export default function ProcessStructuredData() {
    const processSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Proceso de trabajo de BIA",
        description:
            "Método de trabajo para ordenar ideas, definir dirección visual, desarrollar una experiencia web estratégica y entregar una presencia digital sólida.",
        totalTime: "P15D",
        supply: [
            {
                "@type": "HowToSupply",
                name: "Información del proyecto",
            },
            {
                "@type": "HowToSupply",
                name: "Contenido, referencias visuales y objetivos comerciales",
            },
        ],
        tool: [
            {
                "@type": "HowToTool",
                name: "Diseño UX/UI",
            },
            {
                "@type": "HowToTool",
                name: "Desarrollo web",
            },
            {
                "@type": "HowToTool",
                name: "Branding visual",
            },
        ],
        step: processPageContent.steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.title,
            text: step.description,
            itemListElement: step.includes.map((item, itemIndex) => ({
                "@type": "HowToDirection",
                position: itemIndex + 1,
                text: item,
            })),
        })),
        publisher: {
            "@type": "ProfessionalService",
            name: siteConfig.name,
            url: siteConfig.url,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(processSchema),
            }}
        />
    );
}