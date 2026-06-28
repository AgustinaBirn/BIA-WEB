import DiagnosticCtaSection from "@/components/sections/diagnostic-cta-section";
import FinalCta from "@/components/sections/final-cta";
import Hero from "@/components/sections/hero";
import HomeDirectionSection from "@/components/sections/home-direction-section";
import HomeGuideTeaser from "@/components/sections/home-guide-teaser";
import HomeServicesTeaser from "@/components/sections/home-services-teaser";
import HomeStructuredData from "@/components/seo/home-structured-data";
import { homePageContent } from "@/lib/home-page-content";

export default function HomePage() {
    return (
        <main>
            <HomeStructuredData />

            <Hero />

            <HomeDirectionSection />

            <HomeServicesTeaser />

            <HomeGuideTeaser />

            <DiagnosticCtaSection
                eyebrow={homePageContent.diagnostic.eyebrow}
                title={homePageContent.diagnostic.title}
                description={homePageContent.diagnostic.description}
                ctaLabel={homePageContent.diagnostic.ctaLabel}
            />

            <FinalCta
                title={homePageContent.finalCta.title}
                description={homePageContent.finalCta.description}
                ctaLabel={homePageContent.finalCta.ctaLabel}
                ctaMessage={homePageContent.finalCta.ctaMessage}
            />
        </main>
    );
}