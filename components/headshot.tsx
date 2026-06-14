/**
 * Hero headshot. Currently the labeled placeholder from the approved mock
 * (a Paper-Tint panel + "PS" monogram). This is the ONE outstanding visual
 * asset for the site.
 *
 * ── SWAP POINT ───────────────────────────────────────────────────────────
 * When the real portrait is ready, drop it in /public and replace the inner
 * placeholder with next/image, e.g.:
 *
 *   import Image from "next/image";
 *   <div className="headshot">
 *     <Image
 *       src="/pascal-sterzik.jpg"
 *       alt="Pascal Sterzik"
 *       fill
 *       sizes="(max-width: 900px) 360px, 40vw"
 *       priority
 *       style={{ objectFit: "cover" }}
 *     />
 *   </div>
 *
 * Keep the warm, natural-light, neutral-ground direction from Phase-3-Design.md
 * (Section 6). No stock photography anywhere on the site.
 */
export function Headshot() {
  return (
    <div
      className="headshot"
      role="img"
      aria-label="Placeholder for a professional headshot of Pascal Sterzik. The real warm, natural-light portrait is the one outstanding asset."
    >
      <span className="headshot__mono" aria-hidden="true">
        PS
      </span>
      <span className="headshot__label">Pascal Sterzik</span>
      <span className="headshot__note">
        Headshot placeholder. One real warm, natural-light portrait goes here.
      </span>
    </div>
  );
}
