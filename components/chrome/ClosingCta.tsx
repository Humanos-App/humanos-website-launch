import { ReadDocsButton, TalkToUsButton } from "@/components/ui/CtaButtons";

/**
 * The site-wide closing CTA, rendered by Footer directly above the footer
 * itself so every page ends the same way. Design cloned from the Customers
 * page's CTA section (centered, indigo glow, eyebrow dot); the buttons mirror
 * the homepage hero pair — Read Docs, and Talk to us opening the dialog.
 *
 * This replaces the per-page closing sections the designs and pages used to
 * carry; none of them should ship their own ending section anymore.
 */
export function ClosingCta() {
  return (
    <section className="closing-cta">
      <div className="closing-cta__wrap">
        <span className="closing-cta__eyebrow">
          <span className="closing-cta__dot" aria-hidden="true" />
          The Risk Network for AI
        </span>
        <h2 className="closing-cta__title">
          AI risk is dynamic.
          <br />
          <span className="accent">Control and understand it.</span>
        </h2>
        <p className="closing-cta__sub">
          AI agents act in real time, so does their risk. Measure it
          continuously, prove it on demand, and unlock credit, insurance and
          other financial products.
        </p>
        <div className="closing-cta__ctas">
          <ReadDocsButton />
          <TalkToUsButton />
        </div>
      </div>
    </section>
  );
}
