import Container from "@/components/ui/container";
import PremiumTypingTitle from "@/components/ui/premium-typing-title";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

type WhyBiaSectionProps = {
    eyebrow?: string;
    title?: string;
    description?: string;
};

export default function WhyBiaSection({
    eyebrow = "Por qué BIA",
    description = "Ordenar, diferenciar, elevar percepción y construir confianza. BIA no trabaja desde efectos decorativos, sino desde dirección visual adaptada a tu imagen, claridad estratégica y una ejecución digital cuidada y dirigida hacia una meta establecida en conjunto con vos.",
}: WhyBiaSectionProps) {
    return (
        <Section spacing="compact">
            <Container>
                <div className="mx-auto max-w-[980px] text-center">
                    <Reveal>
                        <span className="inline-flex rounded-full border border-fuchsia-500/16 bg-fuchsia-500/[0.055] px-4 py-2 font-ui text-[0.7rem] uppercase tracking-[0.22em] text-fuchsia-100/72">
                            {eyebrow}
                        </span>
                    </Reveal>

                    <Reveal delay={0.08}>
                        <h2 className="mt-7 font-display text-[clamp(2.6rem,7vw,6.4rem)] font-black leading-[0.9] tracking-[-0.055em]">
                            <PremiumTypingTitle
                                segments={[
                                    {
                                        text: "Cada decisión ",
                                    },
                                    {
                                        text: "visual",
                                        accent: true,
                                    },
                                    {
                                        text: " tiene una función.",
                                    },
                                ]}
                            />
                        </h2>
                    </Reveal>

                    <Reveal delay={1.25}>
                        <p className="mx-auto mt-7 max-w-[790px]">
                            {description}
                        </p>
                    </Reveal>
                </div>
            </Container>
        </Section>
    );
}