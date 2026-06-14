"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll reveal initializer. Reproduces the approved Phase-3 mock's behaviour:
 * each `.reveal` fades + rises into view once, with a 70ms stagger between
 * siblings. Respects prefers-reduced-motion and degrades cleanly without
 * IntersectionObserver (everything is shown immediately). A <noscript> style in
 * the layout keeps `.reveal` content visible when JS is unavailable.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));

    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const parent = el.parentElement;
          const sibs = parent
            ? Array.prototype.filter.call(parent.children, (c: Element) =>
                c.classList.contains("reveal")
              )
            : [el];
          const idx = sibs.indexOf(el);
          el.style.transitionDelay = `${Math.min(idx, 5) * 70}ms`;
          el.classList.add("in");
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
