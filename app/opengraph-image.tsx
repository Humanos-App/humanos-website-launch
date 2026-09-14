import { ImageResponse } from "next/og";
import { BRAND, DEFAULT_TITLE, SITE_URL } from "@/lib/seo";
import { BrandMark } from "@/components/seo/brand-mark";

export const alt = DEFAULT_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: BRAND.authority,
          color: BRAND.chalk,
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <BrandMark size={84} color={BRAND.chalk} />
        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 980,
          }}
        >
          Authorization infrastructure for the agentic economy
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#CFCDC6",
          }}
        >
          <span>Portable Authorization &amp; Runtime Verification for AI</span>
          <span style={{ color: BRAND.verification }}>
            {SITE_URL.replace("https://", "")}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
