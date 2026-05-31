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
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Customer stories",
        item: absoluteUrl("/case-studies"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: absoluteUrl(`/case-studies/${slug}`),
      },
    ],
  };
  return <JsonLd data={data} />;
}
