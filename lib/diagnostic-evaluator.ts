export type DiagnosticAnswers = {
  name: string;
  email: string;
  whatsapp: string;
  brandName: string;
  projectStage: string;
  hasBranding: string;
  hasWebsite: string;
  websiteStatus: string;
  mainGoal: string;
  serviceInterest: string;
  contentReady: string;
  visualAssets: string;
  urgency: string;
  budget: string;
  notes: string;
};

export type DiagnosticResult = {
  title: string;
  summary: string;
  recommendedService: string;
  recommendedPack: string;
  suggestedAddOns: string[];
  priority: string;
  whatsappIntro: string;
};

const WHATSAPP_NUMBER = "5493512510631";

function uniqueItems(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function includesBranding(service: string) {
  return service.toLowerCase().includes("branding");
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getProjectFlags(answers: DiagnosticAnswers) {
  const needsBranding =
    answers.hasBranding === "No tengo branding" ||
    answers.hasBranding === "Tengo algo básico, pero necesita mejorar";

  const hasNoWebsite =
    answers.hasWebsite === "No tengo web" ||
    answers.hasWebsite === "Tengo redes, pero no web";

  const hasOutdatedWebsite =
    answers.hasWebsite === "Tengo una web vieja o desactualizada" ||
    answers.websiteStatus === "Necesita rediseño" ||
    answers.websiteStatus === "No representa el valor de mi marca";

  const hasConversionProblem =
    answers.websiteStatus === "No convierte consultas";

  const needsWebsite =
    hasNoWebsite || hasOutdatedWebsite || hasConversionProblem;

  const needsContent =
    answers.contentReady === "No tengo textos preparados" ||
    answers.contentReady === "Tengo ideas, pero necesito ordenarlas" ||
    answers.contentReady === "Necesito copywriting completo";

  const needsAssets =
    answers.visualAssets === "No tengo imágenes" ||
    answers.visualAssets === "Necesito banco de imágenes";

  const hasClientAssets =
    answers.visualAssets === "Tengo imágenes propias" ||
    answers.visualAssets === "Tengo algunas imágenes";

  const wantsCatalog =
    answers.serviceInterest === "Catálogo / sitio híbrido" ||
    answers.mainGoal === "Mostrar productos o servicios";

  const wantsPortfolio = answers.serviceInterest === "Portfolio web";

  const wantsLanding = answers.serviceInterest === "Landing Page";

  const wantsCorporate = answers.serviceInterest === "Sitio Corporativo";

  const wantsBranding = answers.serviceInterest === "Branding";

  const wantsPack = answers.serviceInterest === "Pack completo";

  const wantsCustom = answers.serviceInterest === "Propuesta personalizada";

  const isUnsure = answers.serviceInterest === "No estoy segura/o";

  const wantsAuthority =
    answers.mainGoal === "Verme más profesional" ||
    answers.mainGoal === "Construir confianza" ||
    answers.mainGoal === "Ordenar mi presencia digital";

  const wantsConversion =
    answers.mainGoal === "Captar clientes" || answers.mainGoal === "Vender más";

  const wantsLaunch =
    answers.projectStage === "Marca nueva" ||
    answers.mainGoal === "Lanzar mi marca";

  const isProfessional = answers.projectStage === "Profesional independiente";

  const isConsolidated =
    answers.projectStage === "Negocio consolidado" ||
    answers.projectStage === "Proyecto en funcionamiento";

  const isRedefiningBrand =
    answers.projectStage === "Estoy redefiniendo mi marca";

  const lowBudget = answers.budget === "Hasta ARS 250.000";

  const midBudget =
    answers.budget === "ARS 250.000 - 500.000" ||
    answers.budget === "ARS 500.000 - 800.000";

  const highBudget = answers.budget === "Más de ARS 800.000";

  const needsGuidance = answers.budget === "Quiero orientación";

  const urgent =
    answers.urgency === "Lo antes posible" || answers.urgency === "Este mes";

  return {
    needsBranding,
    hasNoWebsite,
    hasOutdatedWebsite,
    hasConversionProblem,
    needsWebsite,
    needsContent,
    needsAssets,
    hasClientAssets,
    wantsCatalog,
    wantsPortfolio,
    wantsLanding,
    wantsCorporate,
    wantsBranding,
    wantsPack,
    wantsCustom,
    isUnsure,
    wantsAuthority,
    wantsConversion,
    wantsLaunch,
    isProfessional,
    isConsolidated,
    isRedefiningBrand,
    lowBudget,
    midBudget,
    highBudget,
    needsGuidance,
    urgent,
  };
}

function chooseRecommendedService(
  answers: DiagnosticAnswers,
  flags: ReturnType<typeof getProjectFlags>,
) {
  if (flags.wantsCatalog) {
    return flags.needsBranding ? "Sitio Híbrido + Branding" : "Sitio Híbrido";
  }

  if (flags.wantsPortfolio) {
    return flags.needsBranding ? "Portfolio Web + Branding" : "Portfolio Web";
  }

  if (flags.wantsPack) {
    if (flags.wantsCatalog || flags.highBudget)
      return "Sitio Híbrido + Branding";
    if (flags.wantsConversion) return "Landing Page + Branding";
    return "Sitio Corporativo + Branding";
  }

  if (flags.wantsBranding && !flags.needsWebsite) {
    return "Branding visual";
  }

  if (flags.wantsBranding && flags.needsWebsite) {
    return "Branding + Landing Page";
  }

  if (flags.hasOutdatedWebsite && flags.wantsConversion) {
    return answers.serviceInterest === "Landing Page"
      ? "Rediseño de Landing Page"
      : "Rediseño de Web Corporativa";
  }

  if (flags.hasOutdatedWebsite && flags.wantsAuthority) {
    return "Rediseño de Web Corporativa";
  }

  if (flags.hasConversionProblem) {
    return flags.wantsLanding || flags.lowBudget
      ? "Landing Page"
      : "Sitio Corporativo";
  }

  if (flags.wantsLanding || (flags.wantsConversion && flags.lowBudget)) {
    return flags.needsBranding ? "Branding + Landing Page" : "Landing Page";
  }

  if (flags.wantsCorporate || flags.wantsAuthority || flags.isConsolidated) {
    return flags.needsBranding
      ? "Sitio Corporativo + Branding"
      : "Sitio Corporativo";
  }

  if (flags.wantsLaunch) {
    return flags.needsBranding ? "Branding + Landing Page" : "Landing Page";
  }

  if (flags.isProfessional) {
    return flags.wantsConversion ? "Landing Page" : "Portfolio Web";
  }

  if (flags.wantsCustom || flags.isUnsure || flags.needsGuidance) {
    if (flags.needsBranding && flags.needsWebsite) {
      return "Sitio Corporativo + Branding";
    }

    if (flags.needsWebsite) {
      return flags.wantsConversion ? "Landing Page" : "Sitio Corporativo";
    }

    if (flags.needsBranding) {
      return "Branding visual";
    }

    return "Sitio Corporativo";
  }

  return flags.needsBranding
    ? "Sitio Corporativo + Branding"
    : "Sitio Corporativo";
}

function chooseRecommendedPack(
  service: string,
  flags: ReturnType<typeof getProjectFlags>,
) {
  if (
    flags.wantsCatalog ||
    service.includes("Sitio Híbrido") ||
    flags.highBudget ||
    (flags.wantsPack && flags.needsBranding && flags.needsWebsite)
  ) {
    return "Premium Web Experience";
  }

  if (
    service.includes("Sitio Corporativo") ||
    (flags.needsBranding && flags.needsWebsite) ||
    (flags.wantsAuthority && flags.midBudget)
  ) {
    return "Business Essentials";
  }

  if (
    service.includes("Landing") ||
    flags.wantsLaunch ||
    flags.lowBudget ||
    flags.wantsConversion
  ) {
    return "Starter Presence";
  }

  if (service.includes("Portfolio")) {
    return flags.needsBranding
      ? "Business Essentials"
      : "Propuesta individual guiada";
  }

  if (service === "Branding visual") {
    return "Propuesta individual guiada";
  }

  return "Business Essentials";
}

function chooseSuggestedAddOns(
  service: string,
  flags: ReturnType<typeof getProjectFlags>,
) {
  const addOns: string[] = [];

  if (flags.needsContent) {
    addOns.push("Copywriting web");
  }

  if (flags.needsAssets) {
    addOns.push("Banco de imágenes/videos");
  }

  if (flags.hasClientAssets) {
    addOns.push("Integración de imágenes/videos del cliente");
  }

  if (flags.needsBranding && !includesBranding(service)) {
    addOns.push("Branding visual");
  }

  if (
    service.includes("Landing") ||
    service.includes("Sitio Corporativo") ||
    service.includes("Sitio Híbrido") ||
    service.includes("Rediseño")
  ) {
    addOns.push("Optimización SEO base");
  }

  if (flags.wantsConversion || flags.hasConversionProblem) {
    addOns.push("CTA estratégico y recorrido de conversión");
  }

  if (flags.wantsCatalog || service.includes("Sitio Híbrido")) {
    addOns.push("Personalización de catálogo");
  }

  if (service.includes("Portfolio")) {
    addOns.push("Integración de proyectos/casos");
  }

  if (flags.wantsAuthority || service.includes("Sitio Corporativo")) {
    addOns.push("Google Maps si corresponde");
  }

  if (flags.urgent) {
    addOns.push("Priorización de alcance inicial");
  }

  const finalAddOns = uniqueItems(addOns);

  if (finalAddOns.length >= 3) {
    return finalAddOns.slice(0, 5);
  }

  return uniqueItems([
    ...finalAddOns,
    "Revisión estratégica del contenido",
    "Optimización visual base",
  ]).slice(0, 5);
}

function buildPriority(
  service: string,
  flags: ReturnType<typeof getProjectFlags>,
) {
  if (flags.wantsCatalog || service.includes("Sitio Híbrido")) {
    return "Ordenar oferta, categorías, mensaje comercial y recorrido de consulta.";
  }

  if (flags.wantsPortfolio || service.includes("Portfolio")) {
    return "Ordenar experiencia, proyectos, servicios y prueba visual de autoridad.";
  }

  if (flags.wantsConversion || flags.hasConversionProblem) {
    return "Clarificar propuesta, reforzar confianza y guiar al usuario hacia una consulta.";
  }

  if (flags.needsBranding && flags.needsWebsite) {
    return "Construir identidad visual, estructura web y mensaje comercial coherente.";
  }

  if (service.includes("Rediseño")) {
    return "Actualizar percepción, jerarquía visual, navegación y coherencia general.";
  }

  if (service === "Branding visual") {
    return "Definir una identidad visual clara, aplicable y consistente.";
  }

  return "Definir alcance, estructura digital y prioridades para avanzar con dirección.";
}

function buildTitle(
  service: string,
  flags: ReturnType<typeof getProjectFlags>,
) {
  if (flags.wantsCatalog || service.includes("Sitio Híbrido")) {
    return "Tu proyecto necesita una estructura web más completa.";
  }

  if (flags.wantsPortfolio || service.includes("Portfolio")) {
    return "Tu proyecto necesita mostrar criterio, experiencia y autoridad.";
  }

  if (flags.wantsConversion || flags.hasConversionProblem) {
    return "Tu prioridad es convertir mejor desde una presencia digital clara.";
  }

  if (flags.needsBranding && flags.needsWebsite) {
    return "Tu prioridad es construir una base visual y digital sólida.";
  }

  if (service.includes("Rediseño")) {
    return "Tu web necesita actualizar percepción, claridad y conversión.";
  }

  if (service === "Branding visual") {
    return "Tu marca necesita una identidad visual más clara y consistente.";
  }

  return "Tu proyecto necesita una presencia digital ordenada y accionable.";
}

function buildSummary(
  service: string,
  pack: string,
  addOns: string[],
  flags: ReturnType<typeof getProjectFlags>,
) {
  const addOnText = addOns.length
    ? ` Para fortalecer el resultado, conviene acompañarlo con ${addOns
        .slice(0, 3)
        .join(", ")}.`
    : "";

  if (flags.wantsCatalog || service.includes("Sitio Híbrido")) {
    return `Según tus respuestas, necesitás una web capaz de presentar información estratégica y mostrar productos o servicios con más orden. La recomendación inicial es ${service}. ${
      pack !== "Propuesta individual guiada"
        ? `El pack sugerido es ${pack}, porque permite resolver estructura, diseño y desarrollo con mayor profundidad.`
        : "La propuesta debería organizarse como servicio individual guiado para definir alcance real."
    }${addOnText}`;
  }

  if (flags.wantsPortfolio || service.includes("Portfolio")) {
    return `Tus respuestas indican que el foco está en presentar experiencia, trabajos, servicios o perfil profesional con mayor autoridad. La recomendación inicial es ${service}. ${
      pack !== "Propuesta individual guiada"
        ? `Puede encuadrarse dentro de ${pack} si también necesitás reforzar identidad y estructura digital.`
        : "En este caso conviene trabajar una propuesta individual guiada para ordenar contenido, casos y recorrido visual."
    }${addOnText}`;
  }

  if (flags.wantsConversion || flags.hasConversionProblem) {
    return `Tu necesidad principal está vinculada a captar consultas, vender mejor o guiar al usuario hacia una acción concreta. La recomendación inicial es ${service}. El pack sugerido es ${pack}, siempre ajustando el alcance según cantidad de secciones, contenido y velocidad de entrega.${addOnText}`;
  }

  if (flags.needsBranding && flags.needsWebsite) {
    return `Tu proyecto necesita ordenar identidad, mensaje y presencia web al mismo tiempo. La recomendación inicial es ${service}, con ${pack} como punto de partida comercial para resolver percepción, estructura y conversión con coherencia.${addOnText}`;
  }

  if (service.includes("Rediseño")) {
    return `Tu web actual necesita mejorar cómo comunica, cómo se percibe y cómo guía al usuario. La recomendación inicial es ${service}. ${
      pack !== "Propuesta individual guiada"
        ? `Puede trabajarse dentro de ${pack} si además necesitás reforzar contenido, SEO o identidad visual.`
        : "La propuesta debería enfocarse en rediseño estratégico, ajuste de contenido y optimización visual."
    }${addOnText}`;
  }

  if (service === "Branding visual") {
    return `Tus respuestas muestran que antes de escalar la presencia digital conviene ordenar la identidad visual. La recomendación inicial es ${service}, acompañada por recursos que permitan aplicar la marca con coherencia en web, redes y comunicación comercial.${addOnText}`;
  }

  return `Tus respuestas permiten definir un punto de partida concreto: ${service}. ${
    pack !== "Propuesta individual guiada"
      ? `El pack sugerido es ${pack}, porque puede resolver la necesidad principal con una estructura comercial clara.`
      : "La propuesta debería trabajarse como servicio individual guiado, con alcance definido antes de avanzar."
  }${addOnText}`;
}

export function buildDiagnosticResult(
  answers: DiagnosticAnswers,
): DiagnosticResult {
  const flags = getProjectFlags(answers);
  const recommendedService = chooseRecommendedService(answers, flags);
  const recommendedPack = chooseRecommendedPack(recommendedService, flags);
  const suggestedAddOns = chooseSuggestedAddOns(recommendedService, flags);
  const priority = buildPriority(recommendedService, flags);
  const title = buildTitle(recommendedService, flags);
  const summary = buildSummary(
    recommendedService,
    recommendedPack,
    suggestedAddOns,
    flags,
  );

  return {
    title,
    summary,
    recommendedService,
    recommendedPack,
    suggestedAddOns,
    priority,
    whatsappIntro: `Completé el análisis gratuito y el resultado recomienda ${recommendedService}, con ${recommendedPack} como encuadre inicial.`,
  };
}

export function buildWhatsAppMessage(
  answers: DiagnosticAnswers,
  result: DiagnosticResult,
) {
  return [
    "Hola, completé el análisis gratuito de BIA.",
    "",
    result.whatsappIntro,
    "",
    "Datos de contacto:",
    `Nombre: ${answers.name}`,
    `Email: ${answers.email}`,
    `WhatsApp: ${answers.whatsapp}`,
    `Marca / proyecto: ${answers.brandName || "No especificado"}`,
    "",
    "Resultado sugerido por la web:",
    `Servicio recomendado: ${result.recommendedService}`,
    `Pack sugerido: ${result.recommendedPack}`,
    `Prioridad estratégica: ${result.priority}`,
    `Add-ons sugeridos: ${result.suggestedAddOns.join(", ")}`,
    "",
    "Quiero recibir una propuesta personalizada.",
  ].join("\n");
}

export function buildOwnerEmailHtml(
  answers: DiagnosticAnswers,
  result: DiagnosticResult,
) {
  const rows = [
    ["Nombre", answers.name],
    ["Email", answers.email],
    ["WhatsApp", answers.whatsapp],
    ["Marca / proyecto", answers.brandName],
    ["Estado del proyecto", answers.projectStage],
    ["Branding", answers.hasBranding],
    ["Web actual", answers.hasWebsite],
    ["Estado de web", answers.websiteStatus],
    ["Objetivo principal", answers.mainGoal],
    ["Servicio de interés", answers.serviceInterest],
    ["Contenido", answers.contentReady],
    ["Material visual", answers.visualAssets],
    ["Urgencia", answers.urgency],
    ["Presupuesto", answers.budget],
    ["Mensaje adicional", answers.notes],
  ];

  return `
        <div style="font-family: Arial, sans-serif; color: #17181C; line-height: 1.6;">
            <h1>Nuevo análisis gratuito completado</h1>
            <p><strong>Resultado:</strong> ${escapeHtml(result.recommendedService)}</p>
            <p><strong>Pack sugerido:</strong> ${escapeHtml(result.recommendedPack)}</p>
            <p><strong>Prioridad:</strong> ${escapeHtml(result.priority)}</p>

            <h2>Resumen estratégico</h2>
            <p>${escapeHtml(result.summary)}</p>

            <h2>Add-ons sugeridos</h2>
            <ul>
                ${result.suggestedAddOns
                  .map((item) => `<li>${escapeHtml(item)}</li>`)
                  .join("")}
            </ul>

            <h2>Preguntas y respuestas</h2>
            <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; width: 100%;">
                ${rows
                  .map(
                    ([label, value]) => `
                            <tr>
                                <td style="font-weight: bold; width: 220px;">${escapeHtml(label)}</td>
                                <td>${escapeHtml(value || "No especificado")}</td>
                            </tr>
                        `,
                  )
                  .join("")}
            </table>
        </div>
    `;
}

export function buildUserEmailHtml(
  answers: DiagnosticAnswers,
  result: DiagnosticResult,
) {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildWhatsAppMessage(answers, result),
  )}`;

  return `
        <div style="font-family: Arial, sans-serif; color: #17181C; line-height: 1.7; max-width: 680px; margin: 0 auto;">
            <h1 style="font-size: 28px; line-height: 1.05; margin-bottom: 18px;">
                Tu análisis gratuito de BIA
            </h1>

            <p>Hola ${escapeHtml(answers.name)}, gracias por completar el análisis.</p>

            <p>
                Según la información que compartiste, esta es una primera orientación estratégica para tu proyecto.
            </p>

            <h2 style="font-size: 18px; margin-top: 28px;">Datos de contacto</h2>

            <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; width: 100%; border-color: #E5E0EA;">
                <tr>
                    <td style="font-weight: bold; width: 180px;">Nombre</td>
                    <td>${escapeHtml(answers.name)}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Email</td>
                    <td>${escapeHtml(answers.email)}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">WhatsApp</td>
                    <td>${escapeHtml(answers.whatsapp)}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Marca / proyecto</td>
                    <td>${escapeHtml(answers.brandName || "No especificado")}</td>
                </tr>
            </table>

            <h2 style="font-size: 18px; margin-top: 28px;">Resultado sugerido</h2>

            <p><strong>${escapeHtml(result.title)}</strong></p>

            <p>${escapeHtml(result.summary)}</p>

            <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; width: 100%; border-color: #E5E0EA;">
                <tr>
                    <td style="font-weight: bold; width: 180px;">Servicio recomendado</td>
                    <td>${escapeHtml(result.recommendedService)}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Pack sugerido</td>
                    <td>${escapeHtml(result.recommendedPack)}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Prioridad estratégica</td>
                    <td>${escapeHtml(result.priority)}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Add-ons sugeridos</td>
                    <td>${escapeHtml(result.suggestedAddOns.join(", "))}</td>
                </tr>
            </table>

            <div style="margin-top: 32px;">
                <a
                    href="${whatsappHref}"
                    target="_blank"
                    rel="noreferrer"
                    style="
                        display: inline-block;
                        padding: 14px 22px;
                        border-radius: 999px;
                        background: #17181C;
                        color: #F5F3EF;
                        text-decoration: none;
                        font-size: 14px;
                    "
                >
                    Hablar sobre mi análisis por WhatsApp
                </a>
            </div>

            <p style="margin-top: 32px;">
                — BIA | Desarrollo Web & Branding
            </p>
        </div>
    `;
}
