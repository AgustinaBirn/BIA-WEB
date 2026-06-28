import ContactChannelCard from "@/components/contact/contact-channel-card";
import ContactDiagnosticForm from "@/components/contact/contact-diagnostic-form";
import Container from "@/components/ui/container";
import FinalCta from "@/components/sections/final-cta";
import InternalHero from "@/components/sections/internal-hero";
import ProjectNote from "@/components/ui/project-note";
import Section from "@/components/ui/section";
import SplitSectionIntro from "@/components/sections/split-section-intro";
import ContactStructuredData from "@/components/seo/contact-structured-data";
import { contactPageContent } from "@/lib/contact-page-content";

export default function ContactPage() {
    return (
        <main>
            <ContactStructuredData />

            <InternalHero
                eyebrow={contactPageContent.hero.eyebrow}
                titleLineOne={contactPageContent.hero.titleLineOne}
                titleLineTwo={contactPageContent.hero.titleLineTwo}
                description={contactPageContent.hero.description}
                ctaLabel={contactPageContent.hero.ctaLabel}
                ctaMessage={contactPageContent.hero.ctaMessage}
                mobileTitleLines={[
                    "Hablemos",
                    "de tu proyecto.",
                    "Construyamos",
                    "dirección.",
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
                        eyebrow={contactPageContent.intro.eyebrow}
                        title={contactPageContent.intro.title}
                        description={contactPageContent.intro.description}
                        titleClassName="text-[clamp(2.5rem,6vw,5.8rem)]"
                        descriptionClassName="lg:ml-auto"
                    />

                    <div className="mt-16 grid gap-5 md:grid-cols-3">
                        {contactPageContent.channels.map((channel, index) => (
                            <ContactChannelCard
                                key={channel.href}
                                label={channel.label}
                                value={channel.value}
                                href={channel.href}
                                description={channel.description}
                                external={channel.external}
                                featured={index === 0}
                            />
                        ))}
                    </div>

                    <div className="mt-16 grid gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
                        <div className="lg:sticky lg:top-32">
                            <div className="relative overflow-hidden rounded-[30px] border border-white/[0.07] bg-white/[0.022] p-6 backdrop-blur-sm">
                                <div className="pointer-events-none absolute right-[-34%] top-[-42%] h-[240px] w-[240px] rounded-full bg-fuchsia-500/[0.075] blur-[82px]" />

                                <div className="relative z-10">
                                    <p className="font-ui text-[0.68rem] uppercase tracking-[0.24em] text-white/[0.36]">
                                        {contactPageContent.form.eyebrow}
                                    </p>

                                    <h2 className="mt-4 font-display text-[clamp(2.15rem,4.5vw,4rem)] font-black leading-[0.9] tracking-[-0.055em] text-white">
                                        {contactPageContent.form.title}
                                    </h2>

                                    <p className="mt-5 text-sm leading-7 text-white/[0.58]">
                                        {contactPageContent.form.description}
                                    </p>

                                    <div className="mt-7 space-y-3 border-t border-white/[0.06] pt-6">
                                        {contactPageContent.form.points.map(
                                            (point) => (
                                                <div
                                                    key={point}
                                                    className="flex gap-3 text-sm leading-6 text-white/[0.62]"
                                                >
                                                    <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-fuchsia-400/58" />
                                                    <span>{point}</span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="diagnostico" className="min-w-0">
                            <ContactDiagnosticForm />
                        </div>
                    </div>

                    <ProjectNote>{contactPageContent.note}</ProjectNote>
                </Container>
            </Section>

            <FinalCta
                title={contactPageContent.finalCta.title}
                description={contactPageContent.finalCta.description}
                ctaLabel={contactPageContent.finalCta.ctaLabel}
                ctaMessage={contactPageContent.finalCta.ctaMessage}
            />
        </main>
    );
}