import Container from "@/components/ui/container";
import PremiumCard from "@/components/ui/premium-card";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import SplitSectionIntro from "@/components/sections/split-section-intro";
import { homePageContent } from "@/lib/home-page-content";

export default function HomeClaritySection() {
    return (
        <Section spacing="compact">
            <Container>
                <SplitSectionIntro
                    eyebrow={homePageContent.clarity.eyebrow}
                    title={
                        <>
                            {/* Mobile: 2 líneas */}
                            <span className="block md:hidden">Entendé qué estás</span>
                            <span className="block md:hidden">construyendo.</span>

                            {/* Tablet/Desktop: 3 líneas */}
                            <span className="hidden md:block">Entendé</span>
                            <span className="hidden md:block">qué estás</span>
                            <span className="hidden md:block">construyendo.</span>
                        </>
                    }
                    description={homePageContent.clarity.description}
                    inverted
                    titleAlign="right"
                    titleClassName="text-[clamp(2.5rem,6vw,5.8rem)]"
                />

                <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {homePageContent.clarity.items.map((item, index) => (
                        <Reveal
                            key={item.title}
                            delay={index * 0.04}
                        >
                            <PremiumCard className="rounded-[28px] p-6">
                                <span className="font-ui text-[0.68rem] uppercase tracking-[0.22em] text-white/[0.34]">
                                    0{index + 1}
                                </span>

                                <h3 className="mt-5 text-[1.35rem] font-medium leading-[0.95] tracking-[-0.04em] text-white">
                                    {item.title}
                                </h3>

                                <p className="mt-5 text-sm leading-7 text-white/[0.6]">
                                    {item.description}
                                </p>
                            </PremiumCard>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </Section>
    );
}