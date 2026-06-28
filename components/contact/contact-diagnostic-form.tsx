"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useMemo, useState } from "react";

import PremiumCard from "@/components/ui/premium-card";
import {
    buildDiagnosticResult,
    buildWhatsAppMessage,
    type DiagnosticAnswers,
    type DiagnosticResult,
} from "@/lib/diagnostic-evaluator";
import DiagnosticOptionSelect from "@/components/contact/diagnostic-option-select";

const WHATSAPP_NUMBER = "5493512510631";

const initialAnswers: DiagnosticAnswers = {
    name: "",
    email: "",
    whatsapp: "",
    brandName: "",
    projectStage: "",
    hasBranding: "",
    hasWebsite: "",
    websiteStatus: "",
    mainGoal: "",
    serviceInterest: "",
    contentReady: "",
    visualAssets: "",
    urgency: "",
    budget: "",
    notes: "",
};

const inputClassName =
    "w-full rounded-[16px] border border-white/[0.075] bg-white/[0.035] px-4 py-3 text-sm text-white caret-fuchsia-100/80 outline-none [color-scheme:dark] transition-[border-color,background-color,box-shadow] duration-[320ms] placeholder:text-white/[0.28] focus:border-fuchsia-400/28 focus:bg-white/[0.05] focus:shadow-[0_0_28px_rgba(217,70,239,.055)]";

const labelClassName =
    "font-ui text-[0.68rem] uppercase tracking-[0.18em] text-white/[0.38]";

const panelEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stepPanelVariants: Variants = {
    enter: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? 28 : -28,
        scale: 0.985,
        filter: "blur(8px)",
    }),

    center: {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "none",
        transition: {
            duration: 0.46,
            ease: panelEase,
        },
    },

    exit: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? -22 : 22,
        scale: 0.99,
        filter: "blur(6px)",
        transition: {
            duration: 0.34,
            ease: panelEase,
        },
    }),
};

function isRealisticName(value: string) {
    const normalizedValue = value.trim().replace(/\s+/g, " ");
    const nameParts = normalizedValue.split(" ");

    if (nameParts.length < 2) return false;

    return nameParts.every((part) => {
        return (
            part.length >= 3 &&
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ'-]+$/.test(part)
        );
    });
}

function isRealisticEmail(value: string) {
    const trimmedValue = value.trim();

    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedValue);
}

function isRealisticPhone(value: string) {
    const digits = value.replace(/\D/g, "");

    if (digits.length < 8 || digits.length > 15) return false;

    const allDigitsAreEqual = /^(\d)\1+$/.test(digits);

    if (allDigitsAreEqual) return false;

    return /^[+]?[\d\s().-]+$/.test(value.trim());
}

const steps = [
    "Datos",
    "Estado actual",
    "Objetivo",
    "Contenido",
    "Resultado",
] as const;

const requiredFieldsByStep: Record<number, (keyof DiagnosticAnswers)[]> = {
    0: ["name", "email", "whatsapp", "brandName"],
    1: ["projectStage", "hasBranding", "hasWebsite", "websiteStatus"],
    2: ["mainGoal", "serviceInterest", "urgency", "budget"],
    3: ["contentReady", "visualAssets"],
};

export default function ContactDiagnosticForm() {
    const [answers, setAnswers] = useState<DiagnosticAnswers>(initialAnswers);
    const [stepDirection, setStepDirection] = useState(1);
    const [step, setStep] = useState(0);
    const [result, setResult] = useState<DiagnosticResult | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [openSelectId, setOpenSelectId] =
        useState<keyof DiagnosticAnswers | null>(null);

    const [honeypot, setHoneypot] = useState("");
    const [startedAt] = useState(() => Date.now());

    const progress = useMemo(() => {
        return ((step + 1) / steps.length) * 100;
    }, [step]);

    const updateAnswer = (key: keyof DiagnosticAnswers, value: string) => {
        setAnswers((current) => ({
            ...current,
            [key]: value,
        }));
    };

    const renderOptionSelect = ({
        id,
        label,
        options,
    }: {
        id: keyof DiagnosticAnswers;
        label: string;
        options: string[];
    }) => {
        return (
            <DiagnosticOptionSelect
                id={id}
                label={label}
                value={answers[id]}
                options={options}
                isOpen={openSelectId === id}
                onOpenChange={(open) => {
                    setOpenSelectId(open ? id : null);
                }}
                onChange={(value) => {
                    updateAnswer(id, value);
                    setOpenSelectId(null);
                }}
            />
        );
    };

    const validateStep = (stepIndex: number) => {
        const requiredFields = requiredFieldsByStep[stepIndex] ?? [];

        const missingField = requiredFields.find((field) => {
            return !answers[field]?.trim();
        });

        if (missingField) {
            setError("Completá todas las preguntas obligatorias para continuar.");
            return false;
        }

        if (stepIndex === 0) {
            if (!isRealisticName(answers.name)) {
                setError(
                    "Ingresá nombre y apellido válidos. Cada uno debe tener al menos 3 caracteres."
                );
                return false;
            }

            if (!isRealisticEmail(answers.email)) {
                setError("Ingresá un email válido.");
                return false;
            }

            if (!isRealisticPhone(answers.whatsapp)) {
                setError(
                    "Ingresá un número de WhatsApp válido, con código de área si corresponde."
                );
                return false;
            }
        }

        return true;
    };

    const goNext = () => {
        setError("");

        if (!validateStep(step)) {
            return;
        }

        setOpenSelectId(null);
        setStepDirection(1);
        setStep((current) => Math.min(current + 1, steps.length - 1));
    };

    const goPrevious = () => {
        setError("");
        setOpenSelectId(null);
        setStepDirection(-1);
        setStep((current) => Math.max(current - 1, 0));
    };

    const handleAnalysis = async () => {
        setError("");
        setOpenSelectId(null);

        if (!validateStep(0)) {
            setStep(0);
            return;
        }

        if (!validateStep(1)) {
            setStep(1);
            return;
        }

        if (!validateStep(2)) {
            setStep(2);
            return;
        }

        if (!validateStep(3)) {
            setStep(3);
            return;
        }

        const localResult = buildDiagnosticResult(answers);

        try {
            setIsSubmitting(true);

            const response = await fetch("/api/contact-diagnostic", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...answers,
                    honeypot,
                    startedAt,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "No se pudo enviar el diagnóstico."
                );
            }

            setResult(data.result ?? localResult);
            setStepDirection(1);
            setStep(4);
        } catch (requestError) {
            console.error(requestError);
            setError(
                "No se pudo enviar el análisis por email. Revisá la configuración o intentá nuevamente."
            );
            setResult(localResult);
            setStepDirection(1);
            setStep(4);
        } finally {
            setIsSubmitting(false);
        }
    };

    const whatsappHref = result
        ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            buildWhatsAppMessage(answers, result)
        )}`
        : "#";

    return (
        <PremiumCard
            overflow="visible"
            liftOnHover={false}
            glowOnHover={false}
            className="rounded-[34px] p-5 md:p-6 lg:p-7"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
            >
                <label htmlFor="company-website">Sitio web</label>

                <input
                    id="company-website"
                    name="companyWebsite"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                />
            </div>

            <div className="mb-6">
                <div className="flex items-center justify-between gap-4">
                    <p className="font-ui text-[0.68rem] uppercase tracking-[0.18em] text-white/[0.36]">
                        Paso {step + 1} de {steps.length}
                    </p>

                    <p className="font-ui text-[0.68rem] uppercase tracking-[0.18em] text-white/[0.36]">
                        {steps[step]}
                    </p>
                </div>

                <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-white/[0.08]">
                    <motion.div
                        animate={{
                            width: `${progress}%`,
                        }}
                        transition={{
                            duration: 0.42,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-fuchsia-300/70 via-violet-300/45 to-transparent"
                    />
                </div>
            </div>

            <div className="relative min-h-[unset] overflow-visible md:min-h-[300px] lg:min-h-[286px]">
                <AnimatePresence mode="wait" custom={stepDirection}>
                    {step === 0 && (
                        <motion.div
                            key="step-0"
                            custom={stepDirection}
                            variants={stepPanelVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="grid gap-5"
                        >
                            <div className="grid gap-5 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <label
                                        htmlFor="name"
                                        className={labelClassName}
                                    >
                                        Nombre y apellido
                                    </label>

                                    <input
                                        id="name"
                                        value={answers.name}
                                        onChange={(event) =>
                                            updateAnswer(
                                                "name",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Tu nombre y apellido"
                                        className={inputClassName}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <label
                                        htmlFor="email"
                                        className={labelClassName}
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        value={answers.email}
                                        onChange={(event) =>
                                            updateAnswer(
                                                "email",
                                                event.target.value
                                            )
                                        }
                                        placeholder="tu@email.com"
                                        className={inputClassName}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <label
                                        htmlFor="whatsapp"
                                        className={labelClassName}
                                    >
                                        WhatsApp
                                    </label>

                                    <input
                                        id="whatsapp"
                                        value={answers.whatsapp}
                                        onChange={(event) =>
                                            updateAnswer(
                                                "whatsapp",
                                                event.target.value
                                            )
                                        }
                                        placeholder="+54 9..."
                                        className={inputClassName}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <label
                                        htmlFor="brandName"
                                        className={labelClassName}
                                    >
                                        Marca / proyecto
                                    </label>

                                    <input
                                        id="brandName"
                                        value={answers.brandName}
                                        onChange={(event) =>
                                            updateAnswer(
                                                "brandName",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Nombre de tu marca o proyecto"
                                        className={inputClassName}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 1 && (
                        <motion.div
                            key="step-1"
                            custom={stepDirection}
                            variants={stepPanelVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="grid gap-5 md:grid-cols-2"
                        >
                            {renderOptionSelect({
                                id: "projectStage",
                                label: "Estado del proyecto",
                                options: [
                                    "Marca nueva",
                                    "Proyecto en funcionamiento",
                                    "Negocio consolidado",
                                    "Profesional independiente",
                                    "Estoy redefiniendo mi marca",
                                ],
                            })}

                            {renderOptionSelect({
                                id: "hasBranding",
                                label: "Branding",
                                options: [
                                    "No tengo branding",
                                    "Tengo algo básico, pero necesita mejorar",
                                    "Tengo logo y paleta definidos",
                                    "Tengo identidad visual completa",
                                ],
                            })}

                            {renderOptionSelect({
                                id: "hasWebsite",
                                label: "Web actual",
                                options: [
                                    "No tengo web",
                                    "Tengo una web activa",
                                    "Tengo redes, pero no web",
                                    "Tengo una web vieja o desactualizada",
                                ],
                            })}

                            {renderOptionSelect({
                                id: "websiteStatus",
                                label: "Estado de la web",
                                options: [
                                    "No aplica",
                                    "Funciona bien",
                                    "Necesita rediseño",
                                    "No convierte consultas",
                                    "No representa el valor de mi marca",
                                ],
                            })}
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step-2"
                            custom={stepDirection}
                            variants={stepPanelVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="grid gap-5 md:grid-cols-2"
                        >
                            {renderOptionSelect({
                                id: "mainGoal",
                                label: "Objetivo principal",
                                options: [
                                    "Captar clientes",
                                    "Vender más",
                                    "Verme más profesional",
                                    "Construir confianza",
                                    "Lanzar mi marca",
                                    "Mostrar productos o servicios",
                                    "Ordenar mi presencia digital",
                                ],
                            })}

                            {renderOptionSelect({
                                id: "serviceInterest",
                                label: "Servicio que creés necesitar",
                                options: [
                                    "No estoy segura/o",
                                    "Landing Page",
                                    "Sitio Corporativo",
                                    "Catálogo / sitio híbrido",
                                    "Portfolio web",
                                    "Branding",
                                    "Pack completo",
                                    "Propuesta personalizada",
                                ],
                            })}

                            {renderOptionSelect({
                                id: "urgency",
                                label: "Urgencia",
                                options: [
                                    "Lo antes posible",
                                    "Este mes",
                                    "En 1 a 2 meses",
                                    "Estoy explorando opciones",
                                ],
                            })}

                            {renderOptionSelect({
                                id: "budget",
                                label: "Presupuesto estimado",
                                options: [
                                    "Hasta ARS 250.000",
                                    "ARS 250.000 - 500.000",
                                    "ARS 500.000 - 800.000",
                                    "Más de ARS 800.000",
                                    "Quiero orientación",
                                ],
                            })}
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step-3"
                            custom={stepDirection}
                            variants={stepPanelVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="grid gap-5"
                        >
                            <div className="grid gap-5 md:grid-cols-2">
                                {renderOptionSelect({
                                    id: "contentReady",
                                    label: "Contenido",
                                    options: [
                                        "Tengo textos preparados",
                                        "Tengo ideas, pero necesito ordenarlas",
                                        "No tengo textos preparados",
                                        "Necesito copywriting completo",
                                    ],
                                })}

                                {renderOptionSelect({
                                    id: "visualAssets",
                                    label: "Imágenes / recursos",
                                    options: [
                                        "Tengo imágenes propias",
                                        "Tengo algunas imágenes",
                                        "No tengo imágenes",
                                        "Necesito banco de imágenes",
                                    ],
                                })}
                            </div>

                            <div className="grid gap-2">
                                <label
                                    htmlFor="notes"
                                    className={labelClassName}
                                >
                                    Información adicional
                                </label>

                                <textarea
                                    id="notes"
                                    value={answers.notes}
                                    onChange={(event) =>
                                        updateAnswer(
                                            "notes",
                                            event.target.value
                                        )
                                    }
                                    placeholder="Contame qué necesitás construir, mejorar o comunicar."
                                    className={`${inputClassName} min-h-[112px] resize-none md:min-h-[118px]`}
                                />
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && result && (
                        <motion.div
                            key="step-4"
                            custom={stepDirection}
                            variants={stepPanelVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="rounded-[28px] border border-fuchsia-300/12 bg-fuchsia-500/[0.045] p-6"
                        >
                            <p className="font-ui text-[0.68rem] uppercase tracking-[0.2em] text-fuchsia-100/64">
                                Resultado inicial
                            </p>

                            <h3 className="mt-4 text-[2rem] font-medium leading-[0.95] tracking-[-0.045em] text-white">
                                {result.title}
                            </h3>

                            <p className="mt-5 text-sm leading-7 text-white/[0.66]">
                                {result.summary}
                            </p>

                            <div className="mt-7 grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className={labelClassName}>
                                        Servicio recomendado
                                    </p>

                                    <p className="mt-2 text-white/82">
                                        {result.recommendedService}
                                    </p>
                                </div>

                                <div>
                                    <p className={labelClassName}>
                                        Pack sugerido
                                    </p>

                                    <p className="mt-2 text-white/82">
                                        {result.recommendedPack}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-7">
                                <p className={labelClassName}>
                                    Add-ons sugeridos
                                </p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {result.suggestedAddOns.map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-white/[0.66]"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noreferrer"
                                className="
                                    mt-8
                                    inline-flex
                                    rounded-full
                                    border
                                    border-fuchsia-400/24
                                    bg-white/[0.045]
                                    px-7
                                    py-4
                                    font-ui
                                    text-sm
                                    text-white/86
                                    transition-[border-color,background-color,box-shadow,transform]
                                    duration-[360ms]
                                    hover:-translate-y-[2px]
                                    hover:border-fuchsia-300/36
                                    hover:bg-white/[0.065]
                                    hover:shadow-[0_10px_34px_rgba(217,70,239,.08)]
                                    active:-translate-y-[1px]
                                "
                            >
                                Hablar sobre mi análisis por WhatsApp
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {error && (
                <p className="mt-6 text-sm leading-6 text-fuchsia-100/76">
                    {error}
                </p>
            )}

            <div className="mt-6 flex flex-col gap-4 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                    type="button"
                    onClick={goPrevious}
                    disabled={step === 0 || isSubmitting}
                    className="font-ui text-sm text-white/[0.52] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-30 hover:text-white/82"
                >
                    Volver
                </button>

                {step < 3 && (
                    <button
                        type="button"
                        onClick={goNext}
                        className="
                            rounded-full
                            border
                            border-white/10
                            bg-white/[0.04]
                            px-7
                            py-4
                            font-ui
                            text-sm
                            text-white/82
                            transition-[border-color,box-shadow,transform,color]
                            duration-[380ms]
                            hover:-translate-y-[2px]
                            hover:border-fuchsia-500/30
                            hover:text-white
                            hover:shadow-[0_8px_28px_rgba(217,70,239,0.07)]
                        "
                    >
                        Continuar
                    </button>
                )}

                {step === 3 && (
                    <button
                        type="button"
                        onClick={handleAnalysis}
                        disabled={isSubmitting}
                        className="
                            rounded-full
                            border
                            border-fuchsia-400/20
                            bg-white/[0.045]
                            px-7
                            py-4
                            font-ui
                            text-sm
                            text-white/86
                            transition-[border-color,box-shadow,transform,color,opacity]
                            duration-[380ms]
                            disabled:pointer-events-none
                            disabled:opacity-55
                            hover:-translate-y-[2px]
                            hover:border-fuchsia-500/34
                            hover:text-white
                            hover:shadow-[0_8px_28px_rgba(217,70,239,0.09)]
                        "
                    >
                        {isSubmitting
                            ? "Generando análisis..."
                            : "Quiero mi análisis gratuito"}
                    </button>
                )}

                {step === 4 && (
                    <button
                        type="button"
                        onClick={() => {
                            setAnswers(initialAnswers);
                            setResult(null);
                            setStepDirection(-1);
                            setStep(0);
                            setError("");
                            setOpenSelectId(null);
                        }}
                        className="font-ui text-sm text-white/[0.52] transition-colors duration-300 hover:text-white/82"
                    >
                        Hacer otro análisis
                    </button>
                )}
            </div>
        </PremiumCard>
    );
}