import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/seo";
import { BrandMark } from "@/components/seo/brand-mark";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
        <BrandMark size={40} color={BRAND.chalk} />
      </div>
    ),
    { ...size },
  );
}
