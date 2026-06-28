"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/container";

import Link from "next/link";
import NavLink from "./nav-link";
import { NAV_ITEMS } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { scrollToPageTop } from "@/lib/scroll";

const MotionLink = motion(Link);

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 40);

    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  return (

    <motion.header

      initial={{ y: -80, opacity: 0 }}

      animate={{ y: 0, opacity: 1 }}

      transition={{
        duration: .9,
        ease: [0.22, 1, 0.36, 1],
      }}

      className={`

        fixed
        top-0
        left-0
        w-full
        z-50
        transition-all
        duration-500

        ${scrolled
          ? "py-4"
          : "py-7"
        }

      `}
    >

      <Container>

        <motion.nav

          animate={{

            backgroundColor: scrolled
              ? "rgba(5,5,8,.52)"
              : "rgba(12,12,12,0)",

            backdropFilter: scrolled
              ? "blur(12px)"
              : "blur(0px)",

            borderColor: scrolled
              ? "rgba(255,255,255,.045)"
              : "rgba(255,255,255,0)",

            boxShadow: scrolled
              ? "0 10px 42px rgba(0,0,0,.18)"
              : "0 0 0 rgba(0,0,0,0)",

          }}

          transition={{

            duration: .58,

            ease: [0.22, 1, 0.36, 1],

          }}

          className="

            relative
            z-30
            overflow-hidden

            border
            rounded-full

            px-7
            md:px-10

            py-5
          "

        >
          <motion.div

            animate={{
              opacity: scrolled ? 1 : 0,
            }}

            transition={{
              duration: .58,
              ease: [0.22, 1, 0.36, 1],
            }}

            className="
              absolute
              inset-0
              pointer-events-none
              rounded-full
            "

            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,.035) 0%, rgba(255,255,255,0) 34%)",
            }}

          />

          <div className="flex items-center justify-between">

            <MotionLink
              href="/"
              scroll={false}
              aria-label="Ir al inicio"

              onClick={(event) => {
                setMobileOpen(false);

                if (pathname === "/") {
                  event.preventDefault();
                  scrollToPageTop(480);
                  return;
                }

                document.documentElement.setAttribute("data-route-changing", "true");
              }}

              onHoverStart={() => setLogoHovered(true)}
              onHoverEnd={() => setLogoHovered(false)}

              onTapStart={() => setLogoHovered(true)}
              onTap={() => setLogoHovered(false)}
              onTapCancel={() => setLogoHovered(false)}

              onFocus={() => setLogoHovered(true)}
              onBlur={() => setLogoHovered(false)}

              className="
    flex
    items-center
    cursor-pointer
    select-none
    no-underline
  "
            >

              {/* ---------- BIA ONLY ---------- */}

              <motion.div

                initial={false}

                className="
                  relative
                  inline-flex
                  items-center
                  justify-center
                "
              >

                {/* AURA */}

                <motion.div

                  animate={{

                    opacity:
                      logoHovered
                        ? .95
                        : scrolled
                          ? .95
                          : 0,

                    scale:
                      logoHovered
                        ? 1
                        : scrolled
                          ? .82
                          : .55,

                  }}

                  transition={{
                    duration: .42,
                    ease: [0.22, 1, 0.36, 1],
                  }}

                  className="
                    absolute
                    pointer-events-none
                    z-0

                    left-1/2
                    top-1/2

                    -translate-x-1/2
                    -translate-y-1/2

                    rounded-full
                  "

                  style={{

                    width: "72px",
                    height: "34px",

                    filter: "blur(16px)",

                    background:
                      "radial-gradient(circle, rgba(217,70,239,.42) 0%, rgba(139,92,246,.28) 46%, transparent 76%)",

                  }}

                />

                {/* BIA */}

                <motion.span

                  animate={{

                    scale:
                      logoHovered
                        ? 1.035
                        : 1,

                    opacity:
                      scrolled
                        ? .98
                        : .92,

                  }}

                  transition={{
                    duration: .38,
                    ease: [0.22, 1, 0.36, 1],
                  }}

                  className="
                    relative
                    z-10

                    text-[15px]
                    md:text-[16px]

                    font-display  
                    font-black
                    tracking-[0.06em]

                    text-white
                  "
                >

                  BIA

                </motion.span>

              </motion.div>

              {/* ---------- DESCRIPTOR ---------- */}

              <motion.span

                animate={{

                  opacity:
                    scrolled
                      ? 0
                      : logoHovered
                        ? .82
                        : .48,

                  scale:
                    scrolled
                      ? .96
                      : logoHovered
                        ? 1.015
                        : 1,

                  width:
                    scrolled
                      ? 0
                      : "auto",

                }}

                transition={{
                  duration: .42,
                  ease: [0.25, 0.1, 0.25, 1],
                }}

                className="
                  relative
                  z-10
                  ml-3
                  overflow-hidden
                  whitespace-nowrap

                  text-[0.76rem]
                  font-medium

                  tracking-[0.12em]

                  text-zinc-400
                "
              >

                | Desarrollo Web & Branding

              </motion.span>

            </MotionLink>

            <button
              type="button"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="
                relative
                z-20
                flex
                h-8
                w-8
                items-center
                justify-center
                md:hidden
              "
            >
              <span
                className={`
                  absolute
                  h-px
                  w-5
                  rounded-full
                  bg-white/75
                  transition-all
                  duration-[380ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  ${mobileOpen
                    ? "translate-y-0 rotate-45 bg-white"
                    : "-translate-y-[4px]"
                  }
                `}
              />

              <span
                className={`
                  absolute
                  h-px
                  w-5
                  rounded-full
                  bg-white/75
                  transition-all
                  duration-[380ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  ${mobileOpen
                    ? "translate-y-0 -rotate-45 bg-white"
                    : "translate-y-[4px]"
                  }
                `}
              />
            </button>

            <div className="hidden md:flex gap-9">

              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  label={item.label}
                  href={item.href}
                />
              ))}

            </div>
          </div>

        </motion.nav>

        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* OUTSIDE CLICK LAYER */}
              <motion.button
                key="mobile-nav-backdrop"
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  fixed
                  inset-0
                  z-10
                  h-screen
                  w-screen
                  cursor-default
                  bg-transparent
                  md:hidden
                "
              />

              {/* MOBILE MENU PANEL */}
              <motion.div
                key="mobile-nav-panel"
                initial={{
                  opacity: 0,
                  y: -6,
                  scale: 0.985,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -2,
                  scale: 0.998,
                }}

                transition={{
                  duration: 0.46,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  relative
                  z-20
                  mt-3
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-white/[0.055]
                  bg-[rgba(22,16,28,.82)]
                  shadow-[0_16px_42px_rgba(0,0,0,.12)]
                  backdrop-blur-[10px]
                  md:hidden
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-5
                    px-7
                    py-7
                  "
                >
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      scroll={false}
                      onClick={(event) => {
                        setMobileOpen(false);

                        if (pathname === item.href) {
                          event.preventDefault();
                          scrollToPageTop(480);
                          return;
                        }

                        document.documentElement.setAttribute("data-route-changing", "true");
                      }}
                      className="
                        group
                        relative
                        w-fit
                        py-1

                        text-[1.05rem]
                        font-medium
                        font-ui
                        tracking-[-0.01em]
                        text-white

opacity-70

transition-opacity
duration-[340ms]
ease-[cubic-bezier(0.22,1,0.36,1)]

hover:opacity-90
active:opacity-90
focus-visible:opacity-90
                      "
                    >
                      {item.label}

                      <span
                        className="
                          absolute
                          left-1/2
                          -bottom-[3px]

                          h-[2.5px]
                          w-[42%]

                          -translate-x-1/2

                          rounded-full

                          opacity-0
                          scale-x-0

                          origin-center

                          transition-all
                          duration-[520ms]
                          ease-[cubic-bezier(0.22,1,0.36,1)]

                          group-hover:opacity-100
                          group-hover:scale-x-175
                          group-active:opacity-100
                          group-active:scale-x-175
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
                    </Link>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </Container>

    </motion.header>

  );

}