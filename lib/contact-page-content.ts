export const contactPageContent = {
  hero: {
    eyebrow: "Contacto BIA",
    titleLineOne: "Hablemos de tu proyecto.",
    titleLineTwo: "Construyamos dirección.",
    description:
      "Contame qué necesitás y te ayudo a definir el servicio, pack o propuesta personalizada más adecuada para tu marca, web o presencia digital.",
    ctaLabel: "Escribir por WhatsApp",
    ctaMessage:
      "Hola, quiero hablar sobre mi proyecto y recibir una propuesta personalizada.",
  },

  intro: {
    eyebrow: "Contacto estratégico",
    title: "El primer paso es ordenar la idea.",
    description:
      "No necesitás llegar con todo definido. A partir de tu objetivo, tipo de proyecto y nivel de profundidad requerido, podemos identificar qué propuesta tiene más sentido para avanzar.",
  },

  channels: [
    {
      label: "Canal principal",
      value: "WhatsApp",
      href: "https://wa.me/5493512510631?text=Hola%2C%20quiero%20hablar%20sobre%20mi%20proyecto%20y%20recibir%20una%20propuesta%20personalizada.",
      description:
        "La vía recomendada para iniciar una consulta, ordenar el alcance y avanzar hacia una propuesta concreta.",
      external: true,
    },
    {
      label: "Email",
      value: "agustinabirn.dw@gmail.com",
      href: "mailto:agustinabirn.dw@gmail.com",
      description:
        "Útil para enviar referencias, documentación, textos, enlaces o información más detallada del proyecto.",
      external: false,
    },
    {
      label: "Instagram",
      value: "@agusbirn",
      href: "https://www.instagram.com/agusbirn/",
      description:
        "Canal social para conocer más sobre la dirección visual, contenidos y próximas novedades de BIA.",
      external: true,
    },
  ],

  form: {
    eyebrow: "Análisis gratuito",
    title: "Descubrí qué necesita tu proyecto.",
    description:
      "Respondé algunas preguntas sobre tu marca, web y objetivos. Al finalizar, vas a recibir una recomendación inicial y un resumen estratégico para avanzar con más claridad.",
    submitLabel: "Quiero mi análisis gratuito",
    points: [
      "Recomendación inicial según tu estado actual.",
      "Servicio o pack sugerido según tu objetivo.",
      "Resumen listo para continuar la conversación por WhatsApp.",
    ],
  },

  note: "Las propuestas se definen según alcance, objetivos, servicios combinados y nivel de personalización requerido.",

  finalCta: {
    title: "Tu proyecto puede empezar con una conversación clara.",
    description:
      "Contame qué estás buscando construir, mejorar o comunicar. Te ayudo a transformar esa necesidad en una propuesta concreta.",
    ctaLabel: "Hablar sobre mi idea",
    ctaMessage:
      "Hola, quiero hablar sobre mi idea y recibir orientación para definir una propuesta.",
  },
} as const;
