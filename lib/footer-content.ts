export const footerContent = {
  brand: {
    name: "BIA",
    descriptor: "Desarrollo Web & Branding",
    description:
      "Experiencias web premium, branding visual y dirección digital para marcas, proyectos y profesionales que buscan elevar cómo se perciben online.",
  },
  navigation: [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: "Proceso", href: "/proceso" },
    { label: "Contacto", href: "/contacto" },
  ],
  contact: [
    {
      label: "WhatsApp",
      href: "https://wa.me/5493512510631",
      value: "+54 9 351 251 0631",
      external: true,
    },
    {
      label: "Email",
      href: "mailto:agustinabirn.dw@gmail.com",
      value: "agustinabirn.dw@gmail.com",
      external: false,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/agusbirn/",
      value: "@agusbirn",
      external: true,
    },
  ],
  legal: {
    copyright: "© BIA. Todos los derechos reservados.",
    note: "Diseño, desarrollo web y branding visual con dirección estratégica.",
  },
} as const;
