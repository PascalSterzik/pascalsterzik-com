import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

/**
 * Ink-section footer. Part of the dark "close" block. Articles is intentionally
 * omitted (the Articles hub is a deferred fast-follow, not in v1).
 *
 * `bare` removes the top margin for pages where the footer is the only content
 * of the ink section (e.g. the legal pages and Contact).
 */
export function SiteFooter({ bare = false }: { bare?: boolean }) {
  return (
    <footer className={`footer${bare ? " footer--bare" : ""}`}>
      <div className="footer-grid">
        <div className="footer__about">
          <div className="footer__brand">Pascal Sterzik</div>
          <p className="footer__tag">
            Sterzik Solutions. Based in Zeltingen-Rachtig, Germany. I work with DTC and ecommerce
            brands wherever they are.
          </p>
        </div>
        <div className="footer__col">
          <h4>Site</h4>
          <Link href="/about">About</Link>
          <Link href="/audit">Audit</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer__col">
          <h4>Get in touch</h4>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <Link href="/audit">Apply for your free audit</Link>
          <Link href="/contact">Book a call</Link>
        </div>
      </div>
      <div className="footer-base">
        <span>© 2026 Pascal Sterzik, Sterzik Solutions.</span>
        <span>
          <Link href="/impressum">Impressum</Link>
          {"  ·  "}
          <Link href="/datenschutz">Datenschutz</Link>
        </span>
      </div>
    </footer>
  );
}
