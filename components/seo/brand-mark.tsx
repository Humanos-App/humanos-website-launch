/**
 * The Humanos logo mark reproduced as positioned <div>s (3 bars + 3 dots
 * on a 300x300 grid, mirroring public/assets/logo-mark-*.svg). Built with
 * divs rather than inline SVG so it renders reliably inside next/og's
 * ImageResponse (Satori). Used by the generated icon / apple-icon / OG image.
 */
type Shape = { x: number; y: number; w: number; h: number; round?: boolean };

const SHAPES: Shape[] = [
  { x: 0, y: 35, w: 70, h: 230 }, // left bar
  { x: 230, y: 0, w: 70, h: 300 }, // right bar
  { x: 115, y: 35, w: 70, h: 265 }, // middle bar
  { x: 0, y: 0, w: 70, h: 70, round: true }, // top-left dot
  { x: 115, y: 0, w: 70, h: 70, round: true }, // top-middle dot
  { x: 0, y: 230, w: 70, h: 70, round: true }, // bottom-left dot
];

const pct = (n: number) => `${(n / 300) * 100}%`;

/** Returns the mark as a square element of the given pixel size. */
export function BrandMark({ size, color }: { size: number; color: string }) {
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex" }}>
      {SHAPES.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: pct(s.x),
            top: pct(s.y),
            width: pct(s.w),
            height: pct(s.h),
            background: color,
            borderRadius: s.round ? "50%" : 0,
          }}
        />
      ))}
    </div>
  );
}
