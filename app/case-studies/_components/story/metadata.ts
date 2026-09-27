import type { Metadata } from "next";
import { SITE_NAME, TWITTER_HANDLE } from "@/lib/seo";

/** Metadata for a customer story: absolute title (no site suffix),
 *  canonical URL, and Open Graph / Twitter cards that carry the story's
 *  own title and description. Nested openGraph/twitter objects replace
 *  the root layout's rather than merging — and drop the inherited
 *  app/opengraph-image — so the shared fields and image are repeated. */
const OG_IMAGE = { url: "/opengraph-image.png", width: 1200, height: 630 };

export function storyMetadata({
  slug,
  title,
  description,
}: {
  slug: string;
  title: string;
  description: string;
}): Metadata {
  const url = `/case-studies/${slug}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
