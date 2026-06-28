type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`
        w-full
        max-w-[1440px]
        mx-auto
        px-6
        md:px-10
        xl:px-14
        ${className}
      `}
    >
      {children}
    </div>
  );
}