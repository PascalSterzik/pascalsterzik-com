import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/site-config";

const description =
  "If you'd rather just talk, book a call. You'll be talking to me, not a sales rep and not a chatbot. Sterzik Solutions, based in Zeltingen-Rachtig, Germany.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Pascal Sterzik", description, url: "/contact" },
  twitter: { title: "Contact Pascal Sterzik", description },
};

export default function ContactPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="page-top">
        <div className="container">
          <span className="eyebrow reveal">Contact</span>
          <h1 className="display-xl reveal">Let&apos;s talk about your brand.</h1>
          <p className="lead reveal">
            If you&apos;d rather just talk, book a call. You&apos;ll be talking to me, not a sales rep
            and not a chatbot. Bring your situation and we&apos;ll get into where your growth is
            actually stuck.
          </p>
        </div>
      </section>

      {/* ============ PATHS ============ */}
      <section className="section section--tint">
        <div className="container">
          <div className="contact-block reveal">
            <div className="cta-row">
              {/* Cal.com (or Calendly) booking — PLACEHOLDER. Pascal: set
                  bookingUrl in lib/site-config.ts to the real link. */}
              <a
                href={siteConfig.bookingUrl}
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
                <ArrowIcon />
              </a>
              <Link href="/audit" className="link-secondary">
                Want the teardown first? Apply for your free audit.
              </Link>
            </div>
            <p className="micro" style={{ marginTop: "var(--s4)" }}>
              A straight conversation about your brand. No pitch deck.
            </p>
          </div>

          <div className="contact-rows">
            <div className="row reveal">
              <h3>Prefer email?</h3>
              <p>
                Reach me at{" "}
                <a className="inline-link" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
                . I read every message myself and usually reply within a day.
              </p>
            </div>
          </div>

          <p className="contact-trust reveal">
            Sterzik Solutions. Based in Zeltingen-Rachtig, Germany. I work with DTC and ecommerce
            brands wherever they are.
          </p>
        </div>
      </section>

      {/* ============ FOOTER (ink close) ============ */}
      <section className="section section--ink">
        <div className="container">
          <SiteFooter bare />
        </div>
      </section>
    </>
  );
}
