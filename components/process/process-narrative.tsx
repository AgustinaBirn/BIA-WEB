"use client";

import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
} from "react";
import { motion } from "framer-motion";

import PremiumCard from "@/components/ui/premium-card";
import { processPageContent } from "@/lib/process-page-content";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/src/motion/useReducedMotion";

type ProcessStep = (typeof processPageContent.steps)[number];

type ProcessNarrativeProps = {
    steps: readonly ProcessStep[];
};

type DesktopSceneMode = "before" | "active" | "after";

type DesktopSceneState = {
    mode: DesktopSceneMode;
    left: number;
    width: number;
    fixedTop: number;
};

export default function ProcessNarrative({ steps }: ProcessNarrativeProps) {
    const reducedMotion = useReducedMotion();

    const [activeStep, setActiveStep] = useState(steps[0]?.number ?? "01");
    const [desktopTranslateY, setDesktopTranslateY] = useState(0);
    const [sequenceOffsetY, setSequenceOffsetY] = useState(0);
    const [desktopSceneState, setDesktopSceneState] =
        useState<DesktopSceneState>({
            mode: "before",
            left: 0,
            width: 0,
            fixedTop: 0,
        });

    const sceneRef = useRef<HTMLDivElement | null>(null);
    const desktopStageRef = useRef<HTMLDivElement | null>(null);
    const desktopViewportRef = useRef<HTMLDivElement | null>(null);
    const desktopCardRefs = useRef<Array<HTMLElement | null>>([]);
    const mobileCardRefs = useRef<Array<HTMLElement | null>>([]);
    const frameRef = useRef<number | null>(null);

    const sceneStyle = {
        "--process-scene-height": `${100 + Math.max(steps.length - 1, 0) * 88}vh`,
    } as CSSProperties;

    useEffect(() => {
        const updateScene = () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }

            frameRef.current = requestAnimationFrame(() => {
                const isDesktop = window.innerWidth >= 1024;

                if (!isDesktop) {
                    const viewportCenter = window.innerHeight / 2;
                    let closestStep = steps[0]?.number ?? "01";
                    let closestDistance = Number.POSITIVE_INFINITY;

                    mobileCardRefs.current.forEach((node, index) => {
                        if (!node) return;

                        const rect = node.getBoundingClientRect();
                        const nodeCenter = rect.top + rect.height / 2;
                        const distance = Math.abs(nodeCenter - viewportCenter);

                        if (distance < closestDistance) {
                            closestDistance = distance;
                            closestStep = steps[index]?.number ?? closestStep;
                        }
                    });

                    setActiveStep((current) =>
                        current === closestStep ? current : closestStep
                    );

                    return;
                }

                const scene = sceneRef.current;
                const stage = desktopStageRef.current;
                const viewport = desktopViewportRef.current;

                if (
                    !scene ||
                    !stage ||
                    !viewport ||
                    desktopCardRefs.current.length === 0
                ) {
                    return;
                }

                const sceneRect = scene.getBoundingClientRect();
                const sceneTop = window.scrollY + sceneRect.top;
                const stageHeight = stage.offsetHeight;
                const fixedTop = Math.max(
                    0,
                    Math.round((window.innerHeight - stageHeight) / 2)
                );

                const start = sceneTop - fixedTop;
                const end =
                    sceneTop + scene.offsetHeight - fixedTop - stageHeight;

                const currentScroll = window.scrollY;
                const rawProgress = (currentScroll - start) / (end - start);
                const progress = Math.min(1, Math.max(0, rawProgress));

                const nextMode: DesktopSceneMode =
                    currentScroll < start
                        ? "before"
                        : currentScroll > end
                            ? "after"
                            : "active";

                setDesktopSceneState((current) => {
                    const next = {
                        mode: nextMode,
                        left: Math.round(sceneRect.left),
                        width: Math.round(sceneRect.width),
                        fixedTop,
                    };

                    if (
                        current.mode === next.mode &&
                        current.left === next.left &&
                        current.width === next.width &&
                        current.fixedTop === next.fixedTop
                    ) {
                        return current;
                    }

                    return next;
                });

                const firstCard = desktopCardRefs.current[0];
                const lastCard =
                    desktopCardRefs.current[
                    desktopCardRefs.current.length - 1
                    ];

                if (!firstCard || !lastCard) return;

                const viewportCenter = viewport.clientHeight / 2;

                const firstCenter =
                    firstCard.offsetTop + firstCard.offsetHeight / 2;

                const lastCenter =
                    lastCard.offsetTop + lastCard.offsetHeight / 2;

                const startTranslate = viewportCenter - firstCenter;
                const endTranslate = viewportCenter - lastCenter;

                const nextTranslate =
                    startTranslate + (endTranslate - startTranslate) * progress;

                setDesktopTranslateY(nextTranslate);
                setSequenceOffsetY(Math.max(0, startTranslate));

                let closestStep = steps[0]?.number ?? "01";
                let closestDistance = Number.POSITIVE_INFINITY;

                desktopCardRefs.current.forEach((node, index) => {
                    if (!node) return;

                    const nodeCenter =
                        node.offsetTop + node.offsetHeight / 2 + nextTranslate;

                    const distance = Math.abs(nodeCenter - viewportCenter);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestStep = steps[index]?.number ?? closestStep;
                    }
                });

                setActiveStep((current) =>
                    current === closestStep ? current : closestStep
                );
            });
        };

        updateScene();

        window.addEventListener("scroll", updateScene, { passive: true });
        window.addEventListener("resize", updateScene);

        return () => {
            window.removeEventListener("scroll", updateScene);
            window.removeEventListener("resize", updateScene);

            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [steps]);

    const handleSequenceClick = (index: number) => {
        const scene = sceneRef.current;
        const stage = desktopStageRef.current;

        if (!scene || !stage || window.innerWidth < 1024) return;

        const sceneTop = window.scrollY + scene.getBoundingClientRect().top;
        const fixedTop = Math.max(
            0,
            Math.round((window.innerHeight - stage.offsetHeight) / 2)
        );

        const start = sceneTop - fixedTop;
        const end = sceneTop + scene.offsetHeight - fixedTop - stage.offsetHeight;

        const progress =
            steps.length <= 1 ? 0 : index / Math.max(steps.length - 1, 1);

        window.scrollTo({
            top: start + (end - start) * progress,
            behavior: "smooth",
        });
    };

    const desktopStageStyle: CSSProperties =
        desktopSceneState.mode === "active"
            ? {
                position: "fixed",
                top: desktopSceneState.fixedTop,
                left: desktopSceneState.left,
                width: desktopSceneState.width,
                zIndex: 20,
            }
            : desktopSceneState.mode === "after"
                ? {
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                }
                : {
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                };

    const renderMarker = (isActive: boolean) => (
        <div className="absolute left-0 top-8 flex h-9 w-9 items-center justify-center">
            <span
                className={cn(
                    "pointer-events-none absolute rounded-full bg-[radial-gradient(circle,rgba(244,114,182,.36)_0%,rgba(217,70,239,.18)_34%,rgba(139,92,246,.07)_58%,transparent_78%)] blur-[3px] transition-[width,height,opacity,transform] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive
                        ? "h-7 w-7 scale-100 opacity-90"
                        : "h-4 w-4 scale-95 opacity-34"
                )}
            />
        </div>
    );

    const renderStepCard = (step: ProcessStep, isActive: boolean) => (
        <PremiumCard
            className={cn(
                "rounded-[34px] p-7 transition-[border-color,box-shadow,background-color] duration-[420ms] md:p-8 lg:p-9",
                isActive &&
                "border-fuchsia-300/14 shadow-[0_24px_82px_rgba(0,0,0,.24),0_0_44px_rgba(217,70,239,.045)]"
            )}
        >
            <div className="flex flex-col gap-7 md:flex-row md:items-start md:justify-between">
                <div className="max-w-[680px]">
                    <span className="font-ui text-[0.68rem] uppercase tracking-[0.24em] text-white/[0.34]">
                        Paso {step.number}
                    </span>

                    <h3 className="mt-4 font-display text-[clamp(2rem,4vw,3.9rem)] font-black leading-[0.9] tracking-[-0.055em] text-white">
                        {step.title}
                    </h3>

                    <p className="mt-6 max-w-[640px] text-sm leading-7 text-white/[0.62] md:text-base md:leading-8">
                        {step.description}
                    </p>
                </div>

                <div className="shrink-0 md:pt-2">
                    <span className="font-display text-[3.5rem] font-black leading-none tracking-[-0.08em] text-white/[0.045] md:text-[4.8rem]">
                        {step.number}
                    </span>
                </div>
            </div>

            <div className="mt-8 grid gap-3 border-t border-white/[0.06] pt-6 sm:grid-cols-2">
                {step.includes.map((item) => (
                    <div
                        key={item}
                        className="flex gap-3 text-sm leading-6 text-white/[0.68]"
                    >
                        <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-fuchsia-400/60" />
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </PremiumCard>
    );

    return (
        <div
            ref={sceneRef}
            style={sceneStyle}
            className="relative mt-16 lg:mt-20 lg:h-[var(--process-scene-height)]"
        >
            {/* DESKTOP — FIXED / ABSOLUTE SCROLL-TELLING SCENE */}
            <div
                ref={desktopStageRef}
                style={desktopStageStyle}
                className="hidden lg:grid lg:h-[min(720px,calc(100vh-10rem))] lg:grid-cols-[0.34fr_0.66fr] lg:gap-10"
            >
                <aside
                    className="self-start"
                    style={{
                        paddingTop: sequenceOffsetY,
                    }}
                >
                    <div className="relative overflow-hidden rounded-[30px] border border-white/[0.07] bg-white/[0.022] p-6 backdrop-blur-sm">
                        <div className="pointer-events-none absolute right-[-38%] top-[-42%] h-[260px] w-[260px] rounded-full bg-fuchsia-500/[0.08] blur-[86px]" />

                        <div className="relative z-10">
                            <p className="font-ui text-[0.68rem] uppercase tracking-[0.24em] text-white/[0.36]">
                                Secuencia
                            </p>

                            <h3 className="mt-4 font-display text-[2.15rem] font-black leading-[0.88] tracking-[-0.055em] text-white">
                                Proceso guiado.
                            </h3>

                            <p className="mt-5 text-sm leading-7 text-white/[0.56]">
                                Cada etapa ordena una decisión clave para que el
                                proyecto avance con dirección, claridad y
                                consistencia visual.
                            </p>

                            <div className="mt-8 space-y-3">
                                {steps.map((step, index) => {
                                    const isActive =
                                        activeStep === step.number;

                                    return (
                                        <button
                                            key={step.number}
                                            type="button"
                                            onClick={() =>
                                                handleSequenceClick(index)
                                            }
                                            className={cn(
                                                "group flex w-full items-center gap-3 text-left text-sm transition-colors duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                                                isActive
                                                    ? "text-white/86"
                                                    : "text-white/[0.42] hover:text-white/68"
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "h-px bg-gradient-to-r transition-all duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                                                    isActive
                                                        ? "w-12 from-fuchsia-300/80 via-violet-300/50 to-transparent"
                                                        : "w-7 from-fuchsia-400/45 via-violet-400/25 to-transparent group-hover:w-9"
                                                )}
                                            />

                                            <span
                                                className={cn(
                                                    "font-ui text-[0.68rem] uppercase tracking-[0.18em] transition-colors duration-[420ms]",
                                                    isActive &&
                                                    "text-fuchsia-100/82"
                                                )}
                                            >
                                                {step.number}
                                            </span>

                                            <span className="line-clamp-1 text-xs leading-5 text-white/[0.42]">
                                                {step.title}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </aside>

                <div
                    ref={desktopViewportRef}
                    className="relative h-full overflow-hidden"
                >
                    <div className="pointer-events-none absolute left-[1.05rem] top-4 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-transparent via-fuchsia-300/[0.13] to-transparent" />

                    <motion.div
                        className="space-y-8"
                        style={{
                            y: desktopTranslateY,
                        }}
                    >
                        {steps.map((step, index) => {
                            const isActive = activeStep === step.number;

                            return (
                                <motion.article
                                    key={step.number}
                                    ref={(node) => {
                                        desktopCardRefs.current[index] = node;
                                    }}
                                    initial={
                                        reducedMotion
                                            ? false
                                            : {
                                                opacity: 0,
                                                y: 34,
                                                filter: "blur(10px)",
                                            }
                                    }
                                    whileInView={
                                        reducedMotion
                                            ? undefined
                                            : {
                                                opacity: 1,
                                                y: 0,
                                                filter: "blur(0px)",
                                            }
                                    }
                                    viewport={{
                                        once: true,
                                        amount: 0.28,
                                    }}
                                    transition={{
                                        duration: 0.9,
                                        delay: index * 0.08,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="relative pl-12"
                                >
                                    {renderMarker(isActive)}
                                    {renderStepCard(step, isActive)}
                                </motion.article>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            {/* MOBILE / TABLET — NATURAL SCROLL */}
            <div className="relative lg:hidden">
                <div className="pointer-events-none absolute left-[1.05rem] top-4 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-transparent via-fuchsia-300/[0.13] to-transparent" />

                <div className="space-y-6">
                    {steps.map((step, index) => {
                        const isActive = activeStep === step.number;

                        return (
                            <motion.article
                                key={step.number}
                                ref={(node) => {
                                    mobileCardRefs.current[index] = node;
                                }}
                                initial={
                                    reducedMotion
                                        ? false
                                        : {
                                            opacity: 0,
                                            y: 34,
                                            filter: "blur(10px)",
                                        }
                                }
                                whileInView={
                                    reducedMotion
                                        ? undefined
                                        : {
                                            opacity: 1,
                                            y: 0,
                                            filter: "blur(0px)",
                                        }
                                }
                                viewport={{
                                    once: true,
                                    amount: 0.28,
                                }}
                                transition={{
                                    duration: 0.9,
                                    delay: index * 0.08,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="relative pl-10"
                            >
                                {renderMarker(isActive)}
                                {renderStepCard(step, isActive)}
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}