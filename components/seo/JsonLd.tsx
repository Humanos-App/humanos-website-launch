import { absoluteUrl } from "@/lib/seo";

/**
 * Renders a JSON-LD structured-data block. Server component — emits a
 * <script type="application/ld+json"> with no client-side JavaScript.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, build-time content — not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** BreadcrumbList JSON-LD: Home → …items, each a {name, path} pair. */
export function Breadcrumb({
  items,
}: {
  items: Array<{ name: string; path: string }>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
  return <JsonLd data={data} />;
}

/**
 * BreadcrumbList JSON-LD for a case-study page:
 * Home → Customer stories → {name}.
 */
export function CaseStudyBreadcrumb({
  name,
  slug,
}: {
  name: string;
  slug: string;
}) {
  return (
    <Breadcrumb
      items={[
        { name: "Customer stories", path: "/case-studies" },
        { name, path: `/case-studies/${slug}` },
      ]}
    />
  );
}
