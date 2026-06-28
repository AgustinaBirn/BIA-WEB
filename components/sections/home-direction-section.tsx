import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import SplitSectionIntro from "@/components/sections/split-section-intro";
import { homePageContent } from "@/lib/home-page-content";

export default function HomeDirectionSection() {
    return (
        <Section spacing="compact">
            <Container>
                <SplitSectionIntro
                    eyebrow={homePageContent.direction.eyebrow}
                    title={homePageContent.direction.title}
                    description={homePageContent.direction.description}
                    titleClassName="text-[clamp(2.5rem,6vw,5.8rem)]"
                    descriptionClassName="lg:ml-auto"
                />
            </Container>
        </Section>
    );
}