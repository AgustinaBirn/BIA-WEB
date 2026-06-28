import Container from "@/components/ui/container";
import CtaLink from "@/components/ui/cta-link";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

type FinalCtaProps = {
    title: string;
    description: string;
    ctaLabel: string;
    ctaMessage: string;
    revealDelay?: number;
};

export default function FinalCta({
    title,
    description,
    ctaLabel,
    ctaMessage,
    revealDelay = 0,
}: FinalCtaProps) {
    return (
        <Section spacing="compact">
            <Container>
                <Reveal delay={revealDelay}>
                    <div className="relative overflow-hidden rounded-[36px] border border-white/[0.075] bg-white/[0.025] p-8 text-center shadow-[0_18px_70px_rgba(0,0,0,.18)] transition-[transform,border-color,background-color,box-shadow] duration-[680ms] ease-[cubic-bezier(0.16,1,0.3,1)] active:-translate-y-[4px] active:border-fuchsia-500/18 active:bg-white/[0.036] active:shadow-[0_24px_84px_rgba(0,0,0,.26),0_0_44px_rgba(217,70,239,.052),0_0_52px_rgba(139,92,246,.038)] md:p-12">
                        <div className="pointer-events-none absolute left-1/2 top-[-40%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[120px]" />

                        <div className="relative z-10 mx-auto max-w-[760px]">
                            <h2 className="font-display text-[clamp(2.4rem,6vw,5.2rem)] font-black leading-[0.9] tracking-[-0.055em]">
                                {title}
                            </h2>

                            <p className="mx-auto mt-6 max-w-[620px]">
                                {description}
                            </p>

                            <div className="mt-10 flex items-center justify-center">
                                <CtaLink message={ctaMessage}>
                                    {ctaLabel}
                                </CtaLink>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </Section>
    );
}