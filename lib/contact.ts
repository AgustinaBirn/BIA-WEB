const WHATSAPP_NUMBER = "";

export function getWhatsAppHref(message: string) {
  if (!WHATSAPP_NUMBER) {
    return "/contacto";
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
