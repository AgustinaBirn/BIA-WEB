export const siteConfig = {
  name: "BIA | Desarrollo Web & Branding",
  shortName: "BIA",
  slogan:
    "Experiencias web premium que transforman la percepción digital de las marcas.",
  description:
    "Diseño y desarrollo web premium, branding visual y experiencias digitales orientadas a percepción, claridad, conversión y dirección estratégica.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  contact: {
    email: "agustinabirn.dw@gmail.com",
    whatsapp: "+5493512510631",
    whatsappNumber: "5493512510631",
    instagram: "https://www.instagram.com/agusbirn/",
  },

  creator: "Agustina Birn",

  keywords: [
    "diseño web premium",
    "desarrollo web",
    "branding visual",
    "landing page",
    "sitio web corporativo",
    "portfolio web",
    "rediseño web",
    "presencia digital",
    "diseño UX UI",
    "web profesional",
    "diseño web Argentina",
    "branding Argentina",
  ],
} as const;
