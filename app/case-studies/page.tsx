import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case studies · Humanos",
  description:
    "Real customers verifying autonomous actions before execution with Humanos.",
};

/**
 * Each case study is a self-contained folder under app/case-studies/<slug>/.
 * Add new ones by:
 *   1. mkdir app/case-studies/<your-slug>/_components
 *   2. create app/case-studies/<your-slug>/page.tsx
 *   3. append an entry to the array below.
 */
const CASE_STUDIES = [
  {
    slug: "numo",
    customer: "Numo",
    tagline:
      "Verifying every agent-driven financial action before execution.",
    industry: "Banking · Capital allocation",
  },
  {
    slug: "ralio",
    customer: "Ralio",
    tagline:
      "Making autonomous agent transactions independently verifiable.",
    industry: "B2B commerce · Autonomous payments",
  },
  {
    slug: "datawhisper",
    customer: "DataWhisper",
    tagline:
      "Verifying every high-risk AI action inside regulated workflows.",
    industry: "Multi-agent AI · Regulated industries",
  },
  {
    slug: "lusiadas",
    customer: "Lusíadas",
    tagline:
      "One approval API across every clinical and admin system in the stack.",
    industry: "Healthcare · National hospital network",
  },
];

export default function CaseStudiesIndexPage() {
  return (
    <>
      <section className="ph">
        <div className="ph__grid-bg" aria-hidden="true" />
        <div className="ph__inner">
          <div className="ph__eyebrow">Case studies</div>
          <h1>
            Real customers verifying
            <br />
            <em>before execution.</em>
          </h1>
          <p className="ph__sub">
            Selected production deployments of Humanos — agent runtimes,
            payment infrastructure, and capital allocation systems where every
            authorized action is independently verifiable.
          </p>
        </div>
      </section>

      <section className="section" id="case-studies-list">
        <div className="wrap">
          <div className="cs-index__grid">
            {CASE_STUDIES.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="cs-index__card"
              >
                <div className="cs-index__card-meta">
                  <span>Case study</span>
                  <span className="cs-index__card-meta-sep">·</span>
                  <span>{cs.industry}</span>
                </div>
                <h2 className="cs-index__card-customer">{cs.customer}</h2>
                <p className="cs-index__card-tagline">{cs.tagline}</p>
                <div className="cs-index__card-cta">
                  Read case study <span className="arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
