import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { AuditApply } from "@/components/audit-apply";

const description =
  "A free teardown of what's actually capping your brand's growth. Built for you. Yours to keep. You apply through a short survey.";

export const metadata: Metadata = {
  title: "The free growth audit",
  description,
  alternates: { canonical: "/audit" },
  openGraph: {
    title: "The free growth audit, Pascal Sterzik",
    description,
    url: "/audit",
  },
  twitter: { title: "The free growth audit, Pascal Sterzik", description },
};

export default function AuditPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="audit-hero">
        <div className="container">
          <span className="eyebrow reveal">The free growth audit</span>
          <h1 className="display-xl reveal">
            A free teardown of what&apos;s actually capping your brand&apos;s growth. Built for you.{" "}
            <span className="mark">Yours to keep.</span>
          </h1>
          <p className="lead reveal">
            Not a template. Not a checklist with your logo pasted on top. Not a sales call wearing a
            costume. A real diagnosis of your brand&apos;s money path, researched and written for you
            specifically.
          </p>
          <div className="cta-row reveal">
            <Link href="#apply" className="btn">
              Apply for your free audit
              <ArrowIcon />
            </Link>
            <Link href="/contact" className="link-secondary">
              Have a question first? Book a call.
            </Link>
          </div>
          <p className="micro reveal">About three minutes. Not for everyone.</p>
        </div>
      </section>

      {/* ============ SECTION 1: WHAT IT ACTUALLY IS ============ */}
      <section className="section section--tint prose">
        <div className="container">
          <span className="eyebrow reveal">What it actually is</span>
          <h2 className="display-l reveal">Here&apos;s what you get.</h2>
          <div className="body-block reveal">
            <p>
              I take your brand and I actually look. Your store, your funnel, your offer, the emails
              you send and the ones you should be sending, the way you turn a first order into a
              second. I look at how your category sells and where you&apos;re losing ground to it.
              Then I write up what I find: what&apos;s actually capping your growth, what&apos;s
              costing you the most, and what I&apos;d fix first.
            </p>
            <p>
              It&apos;s built around your brand, not a generic scorecard with a number at the bottom.
              Real work goes into each one, which is exactly why I don&apos;t do them for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2: IT'S FREE, AND IT'S YOURS ============ */}
      <section className="section prose">
        <div className="container">
          <span className="eyebrow reveal">No strings</span>
          <h2 className="display-l reveal">It&apos;s free, and it&apos;s yours.</h2>
          <div className="body-block reveal">
            <p className="lead-line">You keep the audit whether or not you ever hire me.</p>
            <p>
              If you want to take it and fix everything yourself, do it. That&apos;s a completely
              fine outcome. If you want me to fix it, we can talk about that after you&apos;ve seen
              it. The audit comes first, with no strings, because I&apos;d rather show you I can find
              the problem than tell you I can.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SECTION 3: WHY YOU APPLY ============ */}
      <section className="section section--tint prose">
        <div className="container">
          <span className="eyebrow reveal">Why you apply</span>
          <h2 className="display-l reveal">Why there&apos;s a survey, not a buy button.</h2>
          <div className="body-block reveal">
            <p>
              Because each audit is real work, I only build them for brands I can genuinely help. So
              instead of a button that says &quot;buy,&quot; there&apos;s a short survey.
            </p>
            <p>
              It tells me what you sell, where you are, and where you think you&apos;re stuck.
              That&apos;s enough for me to know whether I can actually move your number, and enough
              to start digging if I can. It takes about three minutes, and most of it is taps. If
              you&apos;re a fit, I get to work. If you&apos;re not, I&apos;ll tell you honestly
              instead of wasting your time.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SECTION 4: WHAT HAPPENS AFTER YOU APPLY ============ */}
      <section className="section prose">
        <div className="container">
          <span className="eyebrow reveal">The process</span>
          <h2 className="display-l reveal">What happens after you apply</h2>
          <div className="steps">
            <div className="step reveal">
              <span className="step__num">01</span>
              <div>
                <h3>You fill out the survey.</h3>
                <p>About three minutes, mostly multiple choice.</p>
              </div>
            </div>
            <div className="step reveal">
              <span className="step__num">02</span>
              <div>
                <h3>If you&apos;re a fit, I build your audit.</h3>
                <p>
                  I research your brand and write up what I find: the one bottleneck actually capping
                  your growth, what it&apos;s costing you, and what I&apos;d fix first.
                </p>
              </div>
            </div>
            <div className="step reveal">
              <span className="step__num">03</span>
              <div>
                <h3>You get your audit.</h3>
                <p>
                  The full teardown, written for your brand. Yours to keep, whether or not we ever
                  work together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ APPLY + FOOTER (ink close) ============ */}
      <section className="section section--ink final" id="apply">
        <div className="container">
          <span className="eyebrow reveal" style={{ color: "var(--accent-lift)" }}>
            Apply
          </span>
          <h2 className="display-l reveal">Built for you. Yours to keep.</h2>
          <p className="body reveal">
            A short application, not a checkout. Answer a few honest questions and I&apos;ll know
            quickly whether I can move your number.
          </p>

          <AuditApply />

          <p className="micro reveal" style={{ marginTop: "var(--s6)" }}>
            About three minutes. Not for everyone. Prefer to talk first?{" "}
            <Link href="/contact" className="inline-link">
              Book a call
            </Link>
            .
          </p>

          <SiteFooter />
        </div>
      </section>
    </>
  );
}
