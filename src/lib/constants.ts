export const siteConfig = {
  name: "Meer Alam Builders",
  tagline: "Luxury architecture and construction",
  description: "Meer Alam Builders — bespoke architecture, precision construction, and interior design practice based in Lahore, Pakistan. We deliver luxury residential and commercial spaces from concept to completion.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  navItems: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
  whatsapp: {
    /** Business WhatsApp number — digits only, no '+' prefix */
    number: "923008680599",
    /** Default pre-filled message for general enquiries */
    defaultMessage: "Hello Meer Alam Builders, I would like to discuss a project.",
  },
};

/**
 * Generate a WhatsApp click-to-chat URL.
 * Opens WhatsApp with the business number and an optional pre-filled message
 * that the visitor can edit before sending.
 */
export function getWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(
    message ?? siteConfig.whatsapp.defaultMessage,
  );
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${text}`;
}
