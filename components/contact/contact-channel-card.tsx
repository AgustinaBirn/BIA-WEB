import PremiumCard from "@/components/ui/premium-card";
import { cn } from "@/lib/utils";

type ContactChannelCardProps = {
    label: string;
    value: string;
    href: string;
    description: string;
    external?: boolean;
    featured?: boolean;
};

export default function ContactChannelCard({
    label,
    value,
    href,
    description,
    external = false,
    featured = false,
}: ContactChannelCardProps) {
    return (
        <PremiumCard
            className={cn(
                "rounded-[28px] p-6 transition-[border-color,box-shadow,background-color] duration-[380ms]",
                featured &&
                "border-fuchsia-300/16 bg-fuchsia-500/[0.035] shadow-[0_20px_70px_rgba(0,0,0,.24),0_0_44px_rgba(217,70,239,.052)]"
            )}
        >
            <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="group block outline-none"
            >
                <span
                    className={cn(
                        "font-ui text-[0.68rem] uppercase tracking-[0.22em]",
                        featured
                            ? "text-fuchsia-100/64"
                            : "text-white/[0.36]"
                    )}
                >
                    {label}
                </span>

                <h3 className="mt-4 text-[1.45rem] font-medium leading-[0.95] tracking-[-0.04em] text-white transition-colors duration-[320ms] group-hover:text-fuchsia-100/90 group-focus-visible:text-fuchsia-100/90">
                    {value}
                </h3>

                <p className="mt-5 text-sm leading-7 text-white/[0.58]">
                    {description}
                </p>

                <span className="mt-6 inline-flex font-ui text-sm text-fuchsia-100/64 transition-colors duration-[320ms] group-hover:text-white group-focus-visible:text-white">
                    Abrir canal →
                </span>
            </a>
        </PremiumCard>
    );
}