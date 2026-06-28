import Reveal from "@/components/ui/reveal";

type ProjectNoteProps = {
    label?: string;
    children: React.ReactNode;
    className?: string;
};

export default function ProjectNote({
    label = "Nota",
    children,
    className = "",
}: ProjectNoteProps) {
    return (
        <Reveal delay={0.1}>
            <p
                className={`
                    mx-auto
                    mt-12
                    max-w-[760px]

                    text-center
                    text-sm
                    leading-7
                    text-white/[0.52]

                    ${className}
                `}
            >
                <span className="font-ui font-medium uppercase tracking-[0.16em] text-white/[0.42]">
                    {label}:
                </span>{" "}
                {children}
            </p>
        </Reveal>
    );
}