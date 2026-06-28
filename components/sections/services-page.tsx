import Container from "@/components/ui/container";
import ProjectNote from "@/components/ui/project-note";
import FinalCta from "@/components/sections/final-cta";
import InternalHero from "@/components/sections/internal-hero";
import SplitSectionIntro from "@/components/sections/split-section-intro";
import WhyBiaSection from "@/components/sections/why-bia-section";
import MainServicesCarousel from "@/components/services/main-services-carousel";
import PackCard from "@/components/services/pack-card";
import AddOnCard from "@/components/services/add-on-card";
import AddOnsMobileCarousel from "@/components/services/add-ons-mobile-carousel";
import DiagnosticCtaSection from "@/components/sections/diagnostic-cta-section";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import ServicesStructuredData from "@/components/seo/services-structured-data";
import { addOns, mainServices, packs, servicesNotes } from "@/lib/services";
import { servicesPageContent } from "@/lib/services-page-content";

export default function ServicesPage() {

    return (
        <main>
            <ServicesStructuredData />

            {/* HERO INTERNO */}
            <InternalHero
                eyebrow={servicesPageContent.hero.eyebrow}
                titleLineOne={servicesPageContent.hero.titleLineOne}
                titleLineTwo={servicesPageContent.hero.titleLineTwo}
                description={servicesPageContent.hero.description}
                ctaLabel={servicesPageContent.hero.ctaLabel}
                ctaMessage={servicesPageContent.hero.ctaMessage}
                mobileTitleLines={[
                    "Diseño web",
                    "con intención.",
                    "Branding",
                    "con dirección.",
                ]}
                mobileTitleClassName="
    text-[clamp(3rem,11.4vw,3.75rem)]
    tracking-[-0.065em]
  "
                mobileTitleGapBeforeIndex={2}
            />

            {/* STATEMENT */}
            <Section spacing="compact">
                <Container>
                    <SplitSectionIntro
                        eyebrow={servicesPageContent.statement.eyebrow}
                        title={servicesPageContent.statement.title}
                        description={servicesPageContent.statement.description}
                        titleClassName="text-[clamp(2.4rem,6vw,5.6rem)]"
                        descriptionClassName="lg:ml-auto"
                    />
                </Container>
            </Section>

            {/* SERVICIOS PRINCIPALES */}
            <Section spacing="compact">
                <Container>
                    <div className="mb-14">
                        <SplitSectionIntro
                            eyebrow={servicesPageContent.mainServicesIntro.eyebrow}
                            title={servicesPageContent.mainServicesIntro.title}
                            description={
                                <>
                                    <span className="md:hidden">
                                        {servicesPageContent.mainServicesIntro.description}
                                    </span>

                                    <span className="hidden md:inline">
                                        Sitios web diseñados para elevar cómo se percibe online una marca, proyecto
                                        <br />
                                        o perfil profesional.
                                    </span>
                                </>
                            }
                            inverted
                            titleAlign="right"
                            titleClassName="text-[clamp(2.5rem,6vw,5.8rem)]"
                        />
                    </div>

                    <MainServicesCarousel services={mainServices} />
                    <DiagnosticCtaSection
                        eyebrow="Orientación inicial"
                        title="¿No sabés qué servicio elegir?"
                        description="Si todavía no tenés claro si necesitás una landing, un sitio corporativo, branding, un pack o una propuesta personalizada, el análisis gratuito te ayuda a ordenar tu necesidad antes de avanzar."
                        ctaLabel="Descubrir servicio ideal"
                    />
                </Container>
            </Section>

            {/* PACKS */}
            <Section spacing="compact">
                <Container>
                    <div className="mb-14">
                        <SplitSectionIntro
                            eyebrow={servicesPageContent.packsIntro.eyebrow}
                            title={servicesPageContent.packsIntro.title}
                            description={servicesPageContent.packsIntro.description}
                            gridClassName="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
                            titleClassName="text-[clamp(2.5rem,6vw,5.8rem)]"
                            descriptionClassName="lg:ml-auto"
                        />
                    </div>

                    <div className="grid gap-5 lg:grid-cols-3">
                        {packs.map((pack, index) => (
                            <PackCard
                                key={pack.name}
                                pack={pack}
                                index={index}
                            />
                        ))}
                    </div>
                </Container>
            </Section>

            {/* ADD ONS */}
            <Section spacing="compact">
                <Container>
                    <SplitSectionIntro
                        eyebrow={servicesPageContent.addOnsIntro.eyebrow}
                        title={servicesPageContent.addOnsIntro.title}
                        description={servicesPageContent.addOnsIntro.description}
                        inverted
                        titleAlign="right"
                        titleClassName="text-[clamp(2.5rem,6vw,5.4rem)]"
                    />

                    <AddOnsMobileCarousel items={addOns} />

                    <div className="mt-16 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                        {addOns.map((addOn, index) => (
                            <Reveal key={addOn.name} delay={index * 0.02}>
                                <AddOnCard addOn={addOn} />
                            </Reveal>
                        ))}
                    </div>

                    <ProjectNote>
                        {servicesNotes.delivery} {servicesNotes.customProposal}
                    </ProjectNote>
                </Container>
            </Section>

            {/* POR QUÉ BIA */}
            <WhyBiaSection />

            {/* CTA FINAL */}
            <FinalCta
                title={servicesPageContent.finalCta.title}
                description={servicesPageContent.finalCta.description}
                ctaLabel={servicesPageContent.finalCta.ctaLabel}
                ctaMessage={servicesPageContent.finalCta.ctaMessage}
                revealDelay={1.2}
            />
        </main>
    );
}