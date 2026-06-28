import Link from "next/link";

import GuideStructuredData from "@/components/seo/guide-structured-data";
import GuideFaqSection from "@/components/guide/guide-faq-section";
import GuideLearningShowcase from "@/components/guide/guide-learning-showcase";
import GuideWebsiteTypesSection from "@/components/guide/guide-website-types-section";
import InternalHero from "@/components/sections/internal-hero";
import SplitSectionIntro from "@/components/sections/split-section-intro";
import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { guidePageContent } from "@/lib/guide-page-content";

export default function GuidePage() {
    return (
        <main>
            <GuideStructuredData />
            <InternalHero
                eyebrow={guidePageContent.hero.eyebrow}
                titleLineOne={guidePageContent.hero.titleLineOne}
                titleLineTwo={guidePageContent.hero.titleLineTwo}
                description={guidePageContent.hero.description}
                ctaLabel={guidePageContent.hero.ctaLabel}
                ctaMessage={guidePageContent.hero.ctaMessage}
                mobileTitleLines={["Entendé", "qué vas a", "construir."]}
                mobileTitleClassName="text-[clamp(3.25rem,14vw,4.2rem)] leading-[0.9]"
            />

            <Section spacing="compact">
                <Container>
                    <SplitSectionIntro
                        eyebrow={guidePageContent.intro.eyebrow}
                        title={guidePageContent.intro.title}
                        description={guidePageContent.intro.description}
                        titleClassName="text-[clamp(2.4rem,6vw,5.6rem)]"
                        descriptionClassName="lg:ml-auto lg:text-right"
                    />
                </Container>
            </Section>

            <GuideLearningShowcase />

            <GuideWebsiteTypesSection />

            <GuideFaqSection />

            <Section spacing="compact">
                <Container>
                    <Reveal>
                        <div className="relative overflow-hidden rounded-[38px] border border-white/[0.075] bg-white/[0.026] p-8 text-center shadow-[0_24px_90px_rgba(0,0,0,.22)] md:p-12">
                            <div className="pointer-events-none absolute left-1/2 top-[-55%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-fuchsia-500/[0.085] blur-[130px]" />

                            <div className="relative z-10 mx-auto max-w-[780px]">
                                <h2 className="font-display text-[clamp(2.4rem,6vw,5.2rem)] font-black leading-[0.9] tracking-[-0.055em] text-white">
                                    {guidePageContent.nextStep.title}
                                </h2>

                                <p className="mx-auto mt-6 max-w-[640px] text-sm leading-7 text-white/[0.62] md:text-base md:leading-8">
                                    {guidePageContent.nextStep.description}
                                </p>

                                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                    <Link
                                        href="/contacto#diagnostico"
                                        className="rounded-full border border-fuchsia-300/22 bg-white/[0.045] px-7 py-4 font-ui text-sm text-white/86 transition-[border-color,box-shadow,transform,color] duration-[380ms] hover:-translate-y-[2px] hover:border-fuchsia-500/34 hover:text-white hover:shadow-[0_8px_28px_rgba(217,70,239,0.09)]"
                                    >
                                        {guidePageContent.nextStep.primaryLabel}
                                    </Link>

                                    <Link
                                        href="/servicios"
                                        className="rounded-full border border-white/[0.09] bg-white/[0.025] px-7 py-4 font-ui text-sm text-white/62 transition-[border-color,box-shadow,transform,color] duration-[380ms] hover:-translate-y-[2px] hover:border-white/[0.16] hover:text-white/86"
                                    >
                                        {guidePageContent.nextStep.secondaryLabel}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </Container>
            </Section>
        </main>
    );
}