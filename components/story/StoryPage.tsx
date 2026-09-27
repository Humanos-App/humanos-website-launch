import type { ReactNode } from "react";
import { CaseStudyBreadcrumb } from "@/components/seo/JsonLd";
import { StoryHero, type StoryHeroProps } from "./StoryHero";
import { StoryToc, type TocItem } from "./StoryToc";

/**
 * Shared long-form layout for the customer stories and the Solutions pages
 * (app/styles/customer-story.css): hero, a contents rail that tracks the
 * section in view, a summary card (TL;DR / In short), then numbered
 * sections.
 *
 * Pages pass content only. Numbering is derived from the section order,
 * and each eyebrow reads "NN · nav" from the same `nav` label the contents
 * rail shows, so the two can't drift apart.
 */

export type StorySection = {
  /** Anchor id, also the contents-rail target. */
  id: string;
  /** Short label for the contents rail and the section eyebrow. */
  nav: string;
  /** Section heading (h2). */
  title: ReactNode;
  /** Section content, composed from ./blocks. */
  body: ReactNode;
};

export type StoryTldr = {
  /** Card eyebrow and contents-rail label. Defaults to "TL;DR". */
  label?: string;
  title: ReactNode;
  body: ReactNode;
};

const pad = (n: number) => String(n).padStart(2, "0");

export function StoryPage({
  slug,
  name,
  breadcrumb,
  hero,
  tldr,
  sections,
}: {
  /** Case-study slug and breadcrumb name ("Humanos × InsureNow"); together
   *  they emit the Customer stories breadcrumb. */
  slug?: string;
  name?: string;
  /** Any other breadcrumb (e.g. a Solutions page), replacing the above. */
  breadcrumb?: ReactNode;
  hero: StoryHeroProps;
  tldr: StoryTldr;
  sections: StorySection[];
}) {
  const toc: TocItem[] = [
    { id: "tldr", label: tldr.label ?? "TL;DR", n: "—" },
    ...sections.map((s, i) => ({ id: s.id, label: s.nav, n: pad(i + 1) })),
  ];

  return (
    <article className="story">
      {breadcrumb ??
        (slug && name ? <CaseStudyBreadcrumb name={name} slug={slug} /> : null)}
      <StoryHero {...hero} />

      <div className="story__body">
        <StoryToc items={toc} />

        <div className="story__main">
          <section id="tldr" className="story-tldr">
            <p className="story-eyebrow">{tldr.label ?? "TL;DR"}</p>
            <h2 className="story-tldr__title">{tldr.title}</h2>
            {tldr.body}
          </section>

          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="story-section">
              <p className="story-eyebrow">
                {pad(i + 1)} · {s.nav}
              </p>
              <h2 className="story-section__title">{s.title}</h2>
              {s.body}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
