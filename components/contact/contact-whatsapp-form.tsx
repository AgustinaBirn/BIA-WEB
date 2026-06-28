"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import PremiumCard from "@/components/ui/premium-card";
import { contactPageContent } from "@/lib/contact-page-content";

const WHATSAPP_NUMBER = "5493512510631";

const inputClassName =
    "w-full rounded-[18px] border border-white/[0.075] bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition-[border-color,background-color,box-shadow] duration-[320ms] placeholder:text-white/[0.28] focus:border-fuchsia-400/28 focus:bg-white/[0.05] focus:shadow-[0_0_28px_rgba(217,70,239,.055)]";

const labelClassName =
    "font-ui text-[0.68rem] uppercase tracking-[0.18em] text-white/[0.38]";

export default function ContactWhatsAppForm() {
    const [name, setName] = useState("");
    const [projectType, setProjectType] = useState("");
    const [service, setService] = useState("");
    const [budget, setBudget] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const whatsappMessage = [
            "Hola, quiero consultar por un proyecto con BIA.",
            "",
            `Nombre: ${name || "No especificado"}`,
            `Tipo de proyecto: ${projectType || "No especificado"}`,
            `Servicio de interés: ${service || "No especificado"}`,
            `Presupuesto estimado: ${budget || "No especificado"}`,
            "",
            `Mensaje: ${message || "Quiero recibir orientación para definir la propuesta más adecuada."}`,
        ].join("\n");

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            whatsappMessage
        )}`;

        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <PremiumCard className="rounded-[34px] p-6 md:p-8">
            <div className="mb-8">
                <p className="font-ui text-[0.7rem] uppercase tracking-[0.22em] text-white/[0.36]">
                    {contactPageContent.form.eyebrow}
                </p>

                <h2 className="mt-4 font-display text-[clamp(2.1rem,5vw,4.6rem)] font-black leading-[0.9] tracking-[-0.055em] text-white">
                    {contactPageContent.form.title}
                </h2>

                <p className="mt-5 max-w-[620px] text-sm leading-7 text-white/[0.58] md:text-base md:leading-8">
                    {contactPageContent.form.description}
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="grid gap-5"
            >
                <div className="grid gap-2">
                    <label
                        htmlFor="contact-name"
                        className={labelClassName}
                    >
                        Nombre
                    </label>

                    <input
                        id="contact-name"
                        name="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Tu nombre o marca"
                        className={inputClassName}
                        autoComplete="name"
                    />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div className="grid gap-2">
                        <label
                            htmlFor="project-type"
                            className={labelClassName}
                        >
                            Tipo de proyecto
                        </label>

                        <select
                            id="project-type"
                            name="projectType"
                            value={projectType}
                            onChange={(event) => setProjectType(event.target.value)}
                            className={inputClassName}
                        >
                            <option value="">Seleccionar</option>
                            <option value="Marca nueva">Marca nueva</option>
                            <option value="Rediseño / mejora">Rediseño / mejora</option>
                            <option value="Web desde cero">Web desde cero</option>
                            <option value="Branding">Branding</option>
                            <option value="Proyecto personalizado">Proyecto personalizado</option>
                        </select>
                    </div>

                    <div className="grid gap-2">
                        <label
                            htmlFor="service"
                            className={labelClassName}
                        >
                            Servicio de interés
                        </label>

                        <select
                            id="service"
                            name="service"
                            value={service}
                            onChange={(event) => setService(event.target.value)}
                            className={inputClassName}
                        >
                            <option value="">Seleccionar</option>
                            <option value="One Page">One Page</option>
                            <option value="Landing Page">Landing Page</option>
                            <option value="Sitio Corporativo">Sitio Corporativo</option>
                            <option value="Sitio Híbrido">Sitio Híbrido</option>
                            <option value="Portfolio Web">Portfolio Web</option>
                            <option value="Branding">Branding</option>
                            <option value="Pack">Pack</option>
                            <option value="No estoy segura/o">No estoy segura/o</option>
                        </select>
                    </div>
                </div>

                <div className="grid gap-2">
                    <label
                        htmlFor="budget"
                        className={labelClassName}
                    >
                        Presupuesto estimado
                    </label>

                    <select
                        id="budget"
                        name="budget"
                        value={budget}
                        onChange={(event) => setBudget(event.target.value)}
                        className={inputClassName}
                    >
                        <option value="">Seleccionar</option>
                        <option value="Hasta ARS 250.000">Hasta ARS 250.000</option>
                        <option value="ARS 250.000 - 500.000">ARS 250.000 - 500.000</option>
                        <option value="ARS 500.000 - 800.000">ARS 500.000 - 800.000</option>
                        <option value="Más de ARS 800.000">Más de ARS 800.000</option>
                        <option value="Quiero orientación">Quiero orientación</option>
                    </select>
                </div>

                <div className="grid gap-2">
                    <label
                        htmlFor="message"
                        className={labelClassName}
                    >
                        Mensaje
                    </label>

                    <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Contame qué necesitás, qué querés mejorar o qué tipo de presencia querés construir."
                        className={`${inputClassName} min-h-[150px] resize-none`}
                    />
                </div>

                <button
                    type="submit"
                    className="
                        group
                        relative
                        mt-2
                        inline-flex
                        w-fit
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.04]
                        px-7
                        py-4
                        font-ui
                        text-sm
                        text-white/82
                        backdrop-blur-xl

                        transition-[border-color,box-shadow,transform,color]
                        duration-[380ms]
                        ease-[cubic-bezier(0.25,0.1,0.25,1)]

                        hover:-translate-y-[2px]
                        hover:border-fuchsia-500/30
                        hover:text-white
                        hover:shadow-[0_8px_28px_rgba(217,70,239,0.07)]

                        active:-translate-y-[1px]
                        active:border-fuchsia-500/30
                        active:text-white
                        active:shadow-[0_8px_28px_rgba(217,70,239,0.07)]
                    "
                >
                    {contactPageContent.form.submitLabel}
                </button>
            </form>
        </PremiumCard>
    );
}