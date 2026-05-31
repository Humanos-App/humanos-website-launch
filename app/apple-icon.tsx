import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/seo";
import { BrandMark } from "@/components/seo/brand-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND.authority,
        }}
      >
        <BrandMark size={110} color={BRAND.chalk} />
      </div>
    ),
    { ...size },
  );
}
