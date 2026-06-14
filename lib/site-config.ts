/**
 * Central site configuration.
 *
 * Conversion integrations are PLACEHOLDERS that Pascal swaps in:
 *  - auditFormUrl   → the Tally form built from the Phase-2 qualifying survey
 *  - auditFormEmbedId → optional Tally embed id to render the form inline on /audit
 *  - bookingUrl     → the Cal.com (or Calendly) "book a call" link
 *
 * Everything else (name, address, email, USt-IdNr) is the real, verified
 * fact from Business/business-info.md + Personal/personal-info.md, with the
 * public contact email set to pascal@pascalsterzik.com per the build brief.
 */
export const siteConfig = {
  name: "Pascal Sterzik",
  legalName: "Sterzik Solutions",
  url: "https://pascalsterzik.com",
  email: "pascal@pascalsterzik.com",
  // Verified legal facts (business-info.md / personal-info.md)
  address: {
    street: "Uferallee 31",
    postalCode: "54492",
    city: "Zeltingen-Rachtig",
    country: "Germany",
    countryCode: "DE",
  },
  ustId: "DE460993592",
  positioning:
    "Independent growth diagnostician for DTC and ecommerce brands.",
  positioningLong:
    "I find the one bottleneck actually capping a DTC or ecommerce brand's growth, fix what moves the money, and say what to leave alone.",

  // ── CONVERSION INTEGRATIONS — PLACEHOLDERS, Pascal to swap ──────────────
  // The free-audit application is a Tally form built from the Phase-2 survey.
  // Replace with the real Tally share URL, e.g. "https://tally.so/r/abc123".
  auditFormUrl: "https://tally.so/r/REPLACE_WITH_TALLY_FORM_ID",
  // If set (e.g. "abc123"), /audit embeds the Tally form inline via this id.
  // Leave empty ("") to show the placeholder panel + a button to auditFormUrl.
  auditFormEmbedId: "",
  // "Book a call" — Cal.com (or Calendly) link. Replace with the real one,
  // e.g. "https://cal.com/pascal-sterzik/intro".
  bookingUrl: "https://cal.com/REPLACE_WITH_CAL_BOOKING_LINK",
} as const;

export type SiteConfig = typeof siteConfig;
