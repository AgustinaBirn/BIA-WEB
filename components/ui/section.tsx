type SectionSpacing = "none" | "compact" | "default" | "large";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  spacing?: SectionSpacing;
};

const spacingClasses: Record<SectionSpacing, string> = {
  none: "",
  compact: "py-16 md:py-20 lg:py-24",
  default: "py-24 md:py-32 lg:py-40",
  large: "py-32 md:py-40 lg:py-48",
};

export default function Section({
  children,
  className = "",
  spacing = "default",
}: SectionProps) {
  return (
    <section
      className={`
        relative
        ${spacingClasses[spacing]}
        ${className}
      `}
    >
      {children}
    </section>
  );
}