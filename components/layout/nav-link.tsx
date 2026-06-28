"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { scrollToPageTop } from "@/lib/scroll";

type Props = {
  label: string;
  href: string;
};

const MotionLink = motion.create(Link);

export default function NavLink({
  label,
  href,
}: Props) {
  const pathname = usePathname();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === href) {
      event.preventDefault();
      scrollToPageTop(480);
      return;
    }

    document.documentElement.setAttribute("data-route-changing", "true");
  };

  return (

    <MotionLink

      href={href}
      scroll={false}
      onClick={handleClick}

      whileHover={{
        y: -1,
      }}

      transition={{
        duration: .35,
        ease: [0.22, 1, 0.36, 1],
      }}

      className="
  group
  relative

  font-ui
  font-medium

  text-sm
  text-white

  opacity-65

  transition-opacity
  duration-[340ms]

  hover:opacity-90
  focus-visible:opacity-90

  outline-none
"

    >

      {label}

      <span
        className="

          absolute
          left-1/2
          -bottom-[8px]

          w-[42%]
          h-[2.5px]

          -translate-x-1/2

          rounded-full

          opacity-0
          scale-x-0

          origin-center

          transition-[opacity,transform]
          duration-[520ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]

          group-hover:opacity-100
          group-hover:scale-x-175

          group-focus-visible:opacity-100
          group-focus-visible:scale-x-175

        "
      >

        <span
          className="

            absolute
            inset-0

            rounded-full

            bg-gradient-to-r
            from-transparent
            via-fuchsia-400/60
            to-violet-400/35

            blur-[0.8px]

          "
        />

      </span>

    </MotionLink>

  );
}