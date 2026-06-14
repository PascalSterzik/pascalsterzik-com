import { siteConfig } from "@/lib/site-config";
import { ArrowIcon } from "./icons";

/**
 * The free-audit application.
 *
 * The qualifying survey (Phase-2 copy) is built by Pascal as a Tally form.
 *  - Set `auditFormEmbedId` in lib/site-config.ts to embed it inline here.
 *  - Otherwise this renders a clearly-marked placeholder with a working
 *    "Apply" button pointing at `auditFormUrl` (also a placeholder until
 *    Pascal provides the real Tally link).
 */
export function AuditApply() {
  const { auditFormEmbedId, auditFormUrl } = siteConfig;

  if (auditFormEmbedId) {
    return (
      <div className="apply-embed">
        <iframe
          src={`https://tally.so/embed/${auditFormEmbedId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
          title="Apply for your free growth audit"
          loading="lazy"
          className="apply-frame"
        />
      </div>
    );
  }

  return (
    // PLACEHOLDER until the Tally form exists. Pascal: build the form from the
    // Phase-2 survey questions, then set auditFormEmbedId (inline embed) or
    // auditFormUrl (link out) in lib/site-config.ts.
    <div className="apply-placeholder">
      <span className="ph-label">Application</span>
      <p>
        The short qualifying survey is being finalised. Use the button to apply for your free growth
        audit. I read every application myself.
      </p>
      <div className="cta-row">
        <a
          href={auditFormUrl}
          className="btn btn--inverse"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apply for your free audit
          <ArrowIcon />
        </a>
      </div>
    </div>
  );
}
