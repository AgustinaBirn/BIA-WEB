import Container from "@/components/ui/container";
import FinalCta from "@/components/sections/final-cta";
import InternalHero from "@/components/sections/internal-hero";
import Section from "@/components/ui/section";
import SplitSectionIntro from "@/components/sections/split-section-intro";
import PremiumCard from "@/components/ui/premium-card";
import PortfolioStructuredData from "@/components/seo/portfolio-structured-data";
import { portfolioPageContent } from "@/lib/portfolio-page-content";

export default function PortfolioPage() {
    return (
        <main>
            <PortfolioStructuredData />
            <InternalHero
                eyebrow={portfolioPageContent.hero.eyebrow}
                titleLineOne={portfolioPageContent.hero.titleLineOne}
                titleLineTwo={portfolioPageContent.hero.titleLineTwo}
                description={portfolioPageContent.hero.description}
                ctaLabel={portfolioPageContent.hero.ctaLabel}
                ctaMessage={portfolioPageContent.hero.ctaMessage}
                mobileTitleLines={[
                    "Proyectos",
                    "con criterio.",
                    "Presencia",
                    "con intención.",
                ]}
                mobileTitleClassName="
                    text-[clamp(3rem,11.4vw,3.75rem)]
                    tracking-[-0.065em]
                "
                mobileTitleGapBeforeIndex={2}
            />

            <Section spacing="compact">
                <Container>
                    <SplitSectionIntro
                        eyebrow={portfolioPageContent.intro.eyebrow}
                        title={portfolioPageContent.intro.title}
                        description={portfolioPageContent.intro.description}
                        titleClassName="text-[clamp(2.5rem,6vw,5.8rem)]"
                        descriptionClassName="lg:ml-auto"
                    />

                    <div className="mt-16">
                        <PremiumCard className="rounded-[34px] p-8 text-center md:p-12">
                            <p className="font-ui text-[0.72rem] uppercase tracking-[0.22em] text-white/[0.36]">
                                Próximamente
                            </p>

                            <h2 className="mx-auto mt-5 max-w-[760px] font-display text-[clamp(2.2rem,5vw,4.8rem)] font-black leading-[0.9] tracking-[-0.055em] text-white">
                                {portfolioPageContent.emptyState.title}
                            </h2>

                            <p className="mx-auto mt-6 max-w-[660px] text-white/[0.6]">
                                {portfolioPageContent.emptyState.description}
                            </p>
                        </PremiumCard>
                    </div>
                </Container>
            </Section>

            <FinalCta
                title={portfolioPageContent.finalCta.title}
                description={portfolioPageContent.finalCta.description}
                ctaLabel={portfolioPageContent.finalCta.ctaLabel}
                ctaMessage={portfolioPageContent.finalCta.ctaMessage}
            />
        </main>
    );
}