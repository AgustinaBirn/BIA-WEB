import Link from "next/link";

import Container from "@/components/ui/container";
import PremiumCard from "@/components/ui/premium-card";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

type DiagnosticCtaSectionProps = {
    eyebrow?: string;
    title?: string;
    description?: string;
    ctaLabel?: string;
};

export default function DiagnosticCtaSection({
    eyebrow = "Análisis gratuito",
    title = "¿No sabés qué necesita tu proyecto?",
    description = "Respondé algunas preguntas sobre tu marca, web y objetivos. Al finalizar, vas a recibir una orientación inicial para entender qué servicio, pack o propuesta puede ayudarte mejor.",
    ctaLabel = "Hacer análisis gratuito",
}: DiagnosticCtaSectionProps) {
    return (
        <Section spacing="compact">
            <Container>
                <Reveal>
                    <PremiumCard
                        className="
                            relative
                            rounded-[36px]
                            p-7
                            md:p-10
                            lg:p-12
                        "
                    >
                        <div
                            className="
                                pointer-events-none
                                absolute
                                right-[-18%]
                                top-[-42%]
                                h-[360px]
                                w-[360px]
                                rounded-full
                                bg-fuchsia-500/[0.075]
                                blur-[120px]
                            "
                        />

                        <div
                            className="
                                pointer-events-none
                                absolute
                                bottom-[-46%]
                                left-[-20%]
                                h-[340px]
                                w-[340px]
                                rounded-full
                                bg-violet-500/[0.055]
                                blur-[120px]
                            "
                        />

                        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.62fr_0.38fr] lg:items-end">
                            <div>
                                <p className="font-ui text-[0.7rem] uppercase tracking-[0.22em] text-fuchsia-100/58">
                                    {eyebrow}
                                </p>

                                <h2
                                    className="
                                        mt-5
                                        max-w-[760px]
                                        font-display
                                        text-[clamp(2.4rem,6vw,5.4rem)]
                                        font-black
                                        leading-[0.9]
                                        tracking-[-0.055em]
                                        text-white
                                    "
                                >
                                    {title}
                                </h2>
                            </div>

                            <div className="lg:pb-1">
                                <p className="max-w-[560px] text-sm leading-7 text-white/[0.6] md:text-base md:leading-8">
                                    {description}
                                </p>

                                <Link
                                    href="/contacto#diagnostico"
                                    className="
                                        group
                                        relative
                                        mt-8
                                        inline-flex
                                        w-fit
                                        items-center
                                        justify-center
                                        overflow-hidden
                                        rounded-full
                                        border
                                        border-white/10
                                        bg-white/[0.04]
                                        px-7
                                        py-4
                                        font-ui
                                        text-sm
                                        text-white/82
                                        backdrop-blur-xl

                                        transition-[border-color,box-shadow,transform,color]
                                        duration-[380ms]
                                        ease-[cubic-bezier(0.25,0.1,0.25,1)]

                                        hover:-translate-y-[2px]
                                        hover:border-fuchsia-500/30
                                        hover:text-white
                                        hover:shadow-[0_8px_28px_rgba(217,70,239,0.07)]

                                        active:-translate-y-[1px]
                                        active:border-fuchsia-500/30
                                        active:text-white
                                        active:shadow-[0_8px_28px_rgba(217,70,239,0.07)]
                                    "
                                >
                                    {ctaLabel}
                                </Link>
                            </div>
                        </div>
                    </PremiumCard>
                </Reveal>
            </Container>
        </Section>
    );
}