import { siteConfig } from "./site-config";

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: siteConfig.address.street,
  postalCode: siteConfig.address.postalCode,
  addressLocality: siteConfig.address.city,
  addressCountry: siteConfig.address.countryCode,
} as const;

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pascal Sterzik",
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  jobTitle:
    "Growth diagnostician (conversion, direct-response, retention) for DTC and ecommerce brands",
  worksFor: { "@type": "Organization", name: "Sterzik Solutions" },
  address: postalAddress,
  knowsAbout: [
    "Conversion rate optimization",
    "Direct-response marketing",
    "Customer retention",
    "Ecommerce growth",
    "DTC marketing",
    "Email and lifecycle marketing",
    "Paid social creative",
  ],
};

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Sterzik Solutions",
  alternateName: "Pascal Sterzik",
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  description: siteConfig.positioningLong,
  founder: { "@type": "Person", name: "Pascal Sterzik" },
  address: postalAddress,
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Australia" },
  ],
  serviceType: "Ecommerce and DTC growth diagnosis",
};

// FAQ answers are the verbatim Phase-2 copy used on the Home page FAQ section.
export const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is this different from hiring an agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An agency sells you its service, so the diagnosis always seems to point at the service it sells. I diagnose first and tell you what you actually need, even when the honest answer isn't the thing I'd get paid the most to do. I'm the person you talk to before you put anyone on a retainer.",
      },
    },
    {
      "@type": "Question",
      name: "What if you can't help me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Then I tell you, and you keep the audit anyway. If your real bottleneck is something I don't work on, like your brand, your product itself, or your logistics, I'll say so plainly and point you toward the right kind of help. I'd rather lose the work than aim you at the wrong fix.",
      },
    },
    {
      "@type": "Question",
      name: "Do you only do one thing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, and that's the whole point. The one-trick specialists are exactly who I'm the alternative to. I work across your offer, funnel, email, retention, ads, and conversion, because you can't find the real bottleneck if you're only allowed to look at one channel. The one thing I don't do is pretend the answer is whatever I happen to sell.",
      },
    },
  ],
};
