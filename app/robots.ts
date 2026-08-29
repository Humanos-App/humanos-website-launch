import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    // /v2/* holds in-progress rebrand previews — kept out of search until the
    // rebrand actually ships. The pages themselves also carry a noindex meta.
    rules: { userAgent: "*", allow: "/", disallow: "/v2/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
