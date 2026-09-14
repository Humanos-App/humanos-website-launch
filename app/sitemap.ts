import type { MetadataRoute } from "next";
import { absoluteUrl, ROUTES } from "@/lib/seo";

const HIGH_PRIORITY: Set<string> = new Set([
  "/",
  "/monitor",
  "/control",
  "/intelligence",
  "/prove",
  "/pricing",
]);

const MID_PRIORITY: Set<string> = new Set([
  "/case-studies",
  "/company",
]);

function priority(path: string): number {
  if (path === "/") return 1;
  if (HIGH_PRIORITY.has(path)) return 0.9;
  if (MID_PRIORITY.has(path) || path.startsWith("/case-studies/")) return 0.7;
  return 0.4;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority: priority(path),
  }));
}
