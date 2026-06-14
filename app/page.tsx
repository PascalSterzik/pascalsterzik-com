import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { Headshot } from "@/components/headshot";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { personSchema, professionalServiceSchema, homeFaqSchema } from "@/lib/structured-data";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[personSchema, professionalServiceSchema, homeFaqSchema]} />

      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="eyebrow reveal">
              For DTC and ecommerce brands that have stopped growing the way they used to.
            </span>
            <h1 className="display-xl reveal">
              The reason you stopped growing usually isn&apos;t the reason you{" "}
              <span className="mark">think.</span>
            </h1>
            <p className="lead reveal">
              One thing is capping your growth right now. One. And it&apos;s rarely what you assume,
              or what the last specialist told you. It could be your offer, your creative, your
              traffic, your funnel, your email, or your retention. I find which one is actually
              holding you back, fix that, and tell you what to leave alone.
            </p>
            <div className="cta-row reveal">
              <Link href="/audit" className="btn">
                Get my free growth audit
                <ArrowIcon />
              </Link>
              <Link href="/contact" className="link-secondary">
                Or book a call
              </Link>
            </div>
            <p className="micro reveal">
              A real teardown of what&apos;s actually capping your growth, built for your brand and
              yours to keep. You apply through a short survey. It&apos;s not for everyone.
            </p>
          </div>
          <div className="hero-media reveal">
            <Headshot />
          </div>
        </div>
      </section>

      {/* ============ VILLAIN ============ */}
      <section className="section section--tint villain">
        <div className="container">
          <span className="eyebrow reveal">The trap</span>
          <h2 className="display-l reveal">
            Ask five specialists what&apos;s wrong. You&apos;ll get five answers, and each one sells
            their own thing.
          </h2>
          <ul className="spec-list reveal">
            <li>The ads agency says you need more ads.</li>
            <li>The web designer says you need a new site.</li>
            <li>The email guy says you need more flows.</li>
            <li>The CRO guy says you need to test your buttons.</li>
          </ul>
          <div className="villain__body stack reveal">
            <p className="body--muted">
              Here&apos;s the uncomfortable part. They might each be a little right. There&apos;s
              probably something worth fixing in all of it.
            </p>
            <p className="body--muted">
              But you don&apos;t have unlimited time or budget. You have one runway, and only one of
              those problems is actually capping your growth right now. Point your money at the wrong
              one and you&apos;ll spend six months and a big chunk of budget fixing something that
              was never the problem, while the real bottleneck goes untouched.
            </p>
            <p className="body--muted">
              The specialist can&apos;t tell you which is which. Not because they&apos;re dishonest,
              but because they only sell one thing. So to them, the answer is always their thing.
            </p>
          </div>
        </div>
      </section>

      {/* ============ DIAGNOSIS ============ */}
      <section className="section diagnosis">
        <div className="container">
          <span className="eyebrow reveal">The candidates</span>
          <h2 className="display-l reveal">Here&apos;s where growth actually gets stuck</h2>
          <p className="lead diag-intro reveal measure">
            When a brand stops growing, the constraint is usually one specific thing. The hard part
            is that it&apos;s rarely the thing you&apos;re staring at. Here are the places it tends
            to hide. Any one of them can be the bottleneck, and they are not ranked. Until someone
            actually looks, you&apos;re guessing which.
          </p>
          <div className="diag-grid">
            <div className="candidate reveal">
              <span className="candidate__num">01</span>
              <h3>Your offer.</h3>
              <p>
                The product is good, but the deal around it isn&apos;t compelling enough to sell at
                full price, so you lean on discounts and your margin quietly disappears.
              </p>
            </div>
            <div className="candidate reveal">
              <span className="candidate__num">02</span>
              <h3>Your creative and ads.</h3>
              <p>
                The ads have stopped earning attention. Same hooks, same angles, fatigued audiences.
                Sometimes the single highest-leverage fix in the whole business really is better
                creative.
              </p>
            </div>
            <div className="candidate reveal">
              <span className="candidate__num">03</span>
              <h3>Your traffic and acquisition.</h3>
              <p>
                You&apos;ve squeezed what you can out of where you already are, and the next leg of
                growth needs a new channel or more volume from the ones that work. Sometimes you
                genuinely do need more, or better, traffic.
              </p>
            </div>
            <div className="candidate reveal">
              <span className="candidate__num">04</span>
              <h3>Your funnel and conversion.</h3>
              <p>
                Visitors land, look, and leave. Somewhere between the click and the checkout
                there&apos;s a step quietly losing buyers, and it&apos;s almost never where you think
                it is.
              </p>
            </div>
            <div className="candidate reveal">
              <span className="candidate__num">05</span>
              <h3>Your email.</h3>
              <p>
                You win a customer once and never speak to them again. The flows that should run on
                autopilot (welcome, abandoned cart, post-purchase, winback) are missing, half-built,
                or switched off.
              </p>
            </div>
            <div className="candidate reveal">
              <span className="candidate__num">06</span>
              <h3>Your retention.</h3>
              <p>
                You pay full price to re-acquire customers you already bought once. The first order
                breaks even and there&apos;s no second.
              </p>
            </div>
          </div>
          <p className="diag-close reveal">
            So which one is actually capping your growth? Maybe it&apos;s the creative. Maybe
            it&apos;s the funnel. Maybe you really do need more traffic. You won&apos;t know until
            someone looks at the whole picture instead of selling you their corner of it. That&apos;s
            what the{" "}
            <Link href="/audit" className="inline-link">
              free audit
            </Link>{" "}
            does, for your brand specifically.
          </p>
        </div>
      </section>

      {/* ============ HOW I WORK ============ */}
      <section className="section section--tint how">
        <div className="container">
          <span className="eyebrow reveal">The method</span>
          <h2 className="display-l reveal">How I work</h2>
          <p className="lead how-intro reveal">
            I&apos;m not the ads guy or the email guy. I work across the whole money path: your
            offer, your funnel, your email, your retention, your ads, your conversion. It&apos;s the
            only way to see what&apos;s actually holding you back.
          </p>
          <div className="beats">
            <div className="beat reveal">
              <span className="beat__num">01</span>
              <h3>Find the real bottleneck.</h3>
              <p>
                Before I touch anything, I work out what is actually capping your growth. Not the
                loudest problem. The one that, once fixed, moves the number the most.
              </p>
            </div>
            <div className="beat reveal">
              <span className="beat__num">02</span>
              <h3>Fix what moves the needle.</h3>
              <p>
                Then we fix it. I do the work, or I make sure it gets done right. You&apos;re not
                buying a strategy deck you have to go implement on your own.
              </p>
            </div>
            <div className="beat reveal">
              <span className="beat__num">03</span>
              <h3>Say what to leave alone.</h3>
              <p>
                Just as important, I tell you what to ignore. Most of what you could fix isn&apos;t
                worth your time or money right now. Knowing what to leave alone is how your budget
                ends up on the one thing that actually matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MID CTA ============ */}
      <section className="section">
        <div className="container">
          <div className="cta-panel reveal">
            <h2 className="display-l">Want to know what&apos;s actually capping your growth?</h2>
            <p className="body body--muted">
              I&apos;ll build you a free growth audit: a researched teardown of what&apos;s actually
              capping your growth and what to do about it, specific to your brand. You keep it
              whether or not we ever work together.
            </p>
            <div className="cta-row">
              <Link href="/audit" className="btn">
                Get my free growth audit
                <ArrowIcon />
              </Link>
              <Link href="/contact" className="link-secondary">
                Ready to talk now? Book a call.
              </Link>
            </div>
            <p className="micro">
              You apply through a short survey. I only build these for brands I can genuinely help,
              so it&apos;s not for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section section--tint">
        <div className="container faq">
          <span className="eyebrow reveal">Straight answers</span>
          <h2 className="display-l reveal">Before you ask</h2>
          <div className="faq-list">
            <div className="faq-item reveal">
              <h3>How is this different from hiring an agency?</h3>
              <p>
                An agency sells you its service, so the diagnosis always seems to point at the
                service it sells. I diagnose first and tell you what you actually need, even when the
                honest answer isn&apos;t the thing I&apos;d get paid the most to do. I&apos;m the
                person you talk to before you put anyone on a retainer.
              </p>
            </div>
            <div className="faq-item reveal">
              <h3>What if you can&apos;t help me?</h3>
              <p>
                Then I tell you, and you keep the audit anyway. If your real bottleneck is something
                I don&apos;t work on, like your brand, your product itself, or your logistics,
                I&apos;ll say so plainly and point you toward the right kind of help. I&apos;d rather
                lose the work than aim you at the wrong fix.
              </p>
            </div>
            <div className="faq-item reveal">
              <h3>Do you only do one thing?</h3>
              <p>
                No, and that&apos;s the whole point. The one-trick specialists are exactly who
                I&apos;m the alternative to. I work across your offer, funnel, email, retention, ads,
                and conversion, because you can&apos;t find the real bottleneck if you&apos;re only
                allowed to look at one channel. The one thing I don&apos;t do is pretend the answer
                is whatever I happen to sell.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA + FOOTER (ink close) ============ */}
      <section className="section section--ink final">
        <div className="container">
          <span className="eyebrow reveal" style={{ color: "var(--accent-lift)" }}>
            Last thing
          </span>
          <h2 className="display-l reveal">Stop guessing where the money goes.</h2>
          <p className="body reveal">
            You can keep pouring budget into the loudest problem and hope it was the right one. Or
            you can find out what&apos;s actually capping your growth, and fix that first.
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
