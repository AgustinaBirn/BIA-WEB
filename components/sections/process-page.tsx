import Container from "@/components/ui/container";
import FinalCta from "@/components/sections/final-cta";
import InternalHero from "@/components/sections/internal-hero";
import ProjectNote from "@/components/ui/project-note";
import Section from "@/components/ui/section";
import SplitSectionIntro from "@/components/sections/split-section-intro";
import ProcessNarrative from "@/components/process/process-narrative";
import ProcessStructuredData from "@/components/seo/process-structured-data";
import { processPageContent } from "@/lib/process-page-content";

export default function ProcessPage() {
    return (
        <main>
            <ProcessStructuredData />

            <InternalHero
                eyebrow={processPageContent.hero.eyebrow}
                titleLineOne={processPageContent.hero.titleLineOne}
                titleLineTwo={processPageContent.hero.titleLineTwo}
                description={processPageContent.hero.description}
                ctaLabel={processPageContent.hero.ctaLabel}
                ctaMessage={processPageContent.hero.ctaMessage}
                mobileTitleLines={[
                    "Método",
                    "claro.",
                    "Ejecución con",
                    "dirección.",
                ]}
                mobileTitleClassName="
                    text-[clamp(3.05rem,12vw,3.8rem)]
                    tracking-[-0.065em]
                "
                mobileTitleGapBeforeIndex={2}
            />

            <Section spacing="compact">
                <Container>
                    <SplitSectionIntro
                        eyebrow={processPageContent.intro.eyebrow}
                        title={processPageContent.intro.title}
                        description={processPageContent.intro.description}
                        titleClassName="text-[clamp(2.5rem,6vw,5.8rem)]"
                        descriptionClassName="lg:ml-auto"
                    />

                    <ProcessNarrative steps={processPageContent.steps} />

                    <ProjectNote>{processPageContent.note}</ProjectNote>
                </Container>
            </Section>

            <FinalCta
                title={processPageContent.finalCta.title}
                description={processPageContent.finalCta.description}
                ctaLabel={processPageContent.finalCta.ctaLabel}
                ctaMessage={processPageContent.finalCta.ctaMessage}
            />
        </main>
    );
}