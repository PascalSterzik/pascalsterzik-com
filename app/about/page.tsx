import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, CheckIcon, CrossIcon } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";

const description =
  "I find the one bottleneck actually capping a DTC or ecommerce brand's growth, fix what moves the money, and tell you what to leave alone. You work directly with me, no account managers, no pod.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: "About Pascal Sterzik", description, url: "/about" },
  twitter: { title: "About Pascal Sterzik", description },
};

export default function AboutPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="page-top">
        <div className="container">
          <span className="eyebrow reveal">About</span>
          <h1 className="display-xl reveal">
            I find the thing that&apos;s actually capping your growth. Then I tell you the truth
            about it.
          </h1>
        </div>
      </section>

      {/* ============ THE CONVICTION ============ */}
      <section className="section section--tint prose">
        <div className="container">
          <span className="eyebrow reveal">The conviction</span>
          <div className="body-block reveal">
            <p className="lead-line">I kept seeing the same story.</p>
            <p>
              A brand with a genuinely good product gets to real revenue, then hits a wall. Growth
              slows, costs climb. So the founder reaches for the fix that&apos;s loudest in their
              head, a new website, another agency, a bigger ad budget, and waits for the wall to
              move.
            </p>
            <p>
              Usually it doesn&apos;t. Not because that fix was worthless, but because it wasn&apos;t
              the thing actually holding the brand back. The real constraint was somewhere else:
              maybe the offer, maybe the creative, maybe the way traffic was being bought, maybe one
              broken step in the funnel, maybe the customers who bought once and never heard from the
              brand again.
            </p>
            <p>
              Nobody in the chain had any reason to stop and find out which one it really was. The
              ads people sold ads. The email people sold email. Everyone was a little right, and
              nobody was actually responsible for the number.
            </p>
          </div>
        </div>
      </section>

      {/* ============ WHAT I DO ============ */}
      <section className="section prose">
        <div className="container">
          <span className="eyebrow reveal">What I do</span>
          <div className="body-block reveal">
            <p>
              So that&apos;s what I do. I look at the whole money path, offer, funnel, email,
              retention, ads, conversion, and I find the one bottleneck that&apos;s actually capping
              growth. Then I fix it, or make sure it gets fixed, and I tell you what to leave alone.
            </p>
            <p>
              That last part matters more than it sounds. Most of what you could fix isn&apos;t worth
              fixing right now. Telling you what to ignore is how I keep your time and money pointed
              at the one change that moves the number.
            </p>
          </div>
        </div>
      </section>

      {/* ============ THE HONESTY ============ */}
      <section className="section section--tint prose">
        <div className="container">
          <span className="eyebrow reveal">The honesty</span>
          <div className="body-block reveal">
            <p>
              I won&apos;t tell you what you want to hear. If the audit says your problem is something
              I don&apos;t work on, your brand, your actual product, your supply chain, I&apos;ll say
              so, even though it costs me the work. I&apos;d rather be the person who told you the
              truth than the one who sold you a fix you didn&apos;t need.
            </p>
            <p>
              And you work directly with me. Not an account manager, not a junior, not a pod that
              rotates every quarter. When you hire me, you get me.
            </p>
          </div>
        </div>
      </section>

      {/* ============ WHO I WORK WITH ============ */}
      <section className="section prose">
        <div className="container">
          <span className="eyebrow reveal">Who I work with</span>
          <div className="fit-grid">
            <div className="fit-col reveal">
              <h3>This is for you if</h3>
              <ul className="fit-list">
                <li>
                  <CheckIcon />
                  <span>
                    You run a DTC or ecommerce brand doing real revenue, and growth has stalled or
                    gotten expensive.
                  </span>
                </li>
                <li>
                  <CheckIcon />
                  <span>
                    You&apos;ve already spent money on specialists and you&apos;re not sure any of it
                    moved the number.
                  </span>
                </li>
                <li>
                  <CheckIcon />
                  <span>
                    You want someone to tell you the truth about what&apos;s actually wrong, not sell
                    you their one service.
                  </span>
                </li>
              </ul>
            </div>
            <div className="fit-col reveal">
              <h3>This isn&apos;t for you if</h3>
              <ul className="fit-list">
                <li>
                  <CrossIcon />
                  <span>
                    You&apos;re a coach, course creator, or info-product seller. I work with brands
                    that sell physical products.
                  </span>
                </li>
                <li>
                  <CrossIcon />
                  <span>
                    You&apos;re pre-revenue or just launched. There&apos;s not enough running yet to
                    diagnose.
                  </span>
                </li>
                <li>
                  <CrossIcon />
                  <span>
                    You want someone to agree with the plan you already made. I&apos;m going to push
                    back when the numbers say something else.
                  </span>
                </li>
                <li>
                  <CrossIcon />
                  <span>
                    You need brand strategy, positioning, or a new identity. That&apos;s real work,
                    it&apos;s just not my work. I fix the money mechanics underneath the brand.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA + FOOTER (ink close) ============ */}
      <section className="section section--ink final">
        <div className="container">
          <span className="eyebrow reveal" style={{ color: "var(--accent-lift)" }}>
            Next step
          </span>
          <h2 className="display-l reveal">Want to know what&apos;s actually capping your growth?</h2>
          <p className="body reveal">
            I&apos;ll build you a free growth audit, a researched teardown specific to your brand.
            You keep it whether or not we ever work together.
          </p>
          <div className="cta-row reveal">
            <Link href="/audit" className="btn btn--inverse">
              Get my free growth audit
              <ArrowIcon />
            </Link>
            <Link href="/contact" className="link-secondary">
              Book a call
            </Link>
          </div>
          <SiteFooter />
        </div>
      </section>
    </>
  );
}
