import { ImageResponse } from "next/og";

export const alt = "Pascal Sterzik, growth diagnostician for DTC and ecommerce brands";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand-true OG card: warm paper, ink type, one ochre accent. No fabricated
// proof or imagery. The real headshot is intentionally not used here.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAFAF9",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            color: "#92580A",
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            fontSize: "24px",
            fontWeight: 600,
          }}
        >
          <div style={{ width: "48px", height: "3px", background: "#CA8A04", display: "flex" }} />
          For DTC and ecommerce brands
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: "1000px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 600,
              color: "#1C1917",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
            }}
          >
            The reason you stopped growing usually isn&apos;t the reason you think.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ fontSize: "34px", fontWeight: 700, color: "#1C1917" }}>Pascal Sterzik</div>
          <div style={{ fontSize: "26px", color: "#57534E" }}>Growth diagnostician</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
