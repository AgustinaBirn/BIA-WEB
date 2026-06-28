export const BIA_WHATSAPP_NUMBER = "5493512510631";

export const DEFAULT_BIA_WHATSAPP_MESSAGE =
  "Hola, quiero hablar sobre mi proyecto y recibir una propuesta personalizada con BIA.";

export function buildWhatsAppHref(message = DEFAULT_BIA_WHATSAPP_MESSAGE) {
  return `https://wa.me/${BIA_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message,
  )}`;
}

export function buildServiceWhatsAppMessage(serviceName: string) {
  return `Hola, quiero consultar por el servicio "${serviceName}" de BIA y recibir más información para mi proyecto.`;
}

export function buildPackWhatsAppMessage(packName: string) {
  return `Hola, quiero consultar por el pack "${packName}" de BIA y recibir más información para mi proyecto.`;
}
