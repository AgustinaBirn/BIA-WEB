import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

type PageIntroProps = {
    eyebrow: string;
    title: string;
    description: string;
};

export default function PageIntro({
    eyebrow,
    title,
    description,
}: PageIntroProps) {
    return (
        <Section
            spacing="none"
            className="min-h-screen flex items-center justify-center overflow-hidden"
        >
            <Container>
                <div className="mx-auto max-w-[980px] text-center">
                    <Reveal>
                        <span className="font-ui text-[0.72rem] uppercase tracking-[0.28em] text-white/42">
                            {eyebrow}
                        </span>
                    </Reveal>

                    <Reveal delay={0.08}>
                        <h1 className="mt-7 font-display text-[clamp(3.4rem,10vw,8rem)] font-black leading-[0.88] tracking-[-0.06em]">
                            {title}
                        </h1>
                    </Reveal>

                    <Reveal delay={0.16}>
                        <p className="mx-auto mt-9 max-w-[720px] text-base md:text-[1.1rem]">
                            {description}
                        </p>
                    </Reveal>
                </div>
            </Container>
        </Section>
    );
}