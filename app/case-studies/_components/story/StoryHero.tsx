import type { ReactNode } from "react";

export type StoryHeroProps = {
  /** Customer name, used in the eyebrow ("Customer story · …"). */
  customer: string;
  title: ReactNode;
  intro: ReactNode;
  /** Client half of the "Humanos × Client" lockup. Wrap the lighter-weight
   *  part in a <span>, e.g. <>Insure<span>Now</span></>. */
  client: ReactNode;
  details: Array<{ label: string; value: ReactNode }>;
  /** Optional customer quote, set beside the details. */
  quote?: { text: ReactNode; name: string; role: string };
  /** "display" sets the oversized 112px headline. */
  size?: "default" | "display";
};

export function StoryHero({
  customer,
  title,
  intro,
  client,
  details,
  quote,
  size = "default",
}: StoryHeroProps) {
  return (
    <header
      className={`story-hero${size === "display" ? " story-hero--display" : ""}`}
    >
      <div className="story-hero__inner">
        <p className="story-hero__eyebrow">Customer story · {customer}</p>
        <h1 className="story-hero__title">{title}</h1>
        <p className="story-hero__intro">{intro}</p>
        <p className="story-hero__lockup" aria-label={`Humanos and ${customer}`}>
          <img src="/assets/logo-wordmark-white.svg" alt="Humanos" />
          <span className="story-hero__x" aria-hidden="true">
            ×
          </span>
          <span className="story-hero__client">{client}</span>
        </p>

        <div
          className={`story-hero__meta${quote ? "" : " story-hero__meta--grid"}`}
        >
          <dl className="story-hero__details">
            {details.map((d) => (
              <div key={d.label} className="story-hero__detail">
                <dt>{d.label}</dt>
                <dd>{d.value}</dd>
              </div>
            ))}
          </dl>
          {quote && (
            <figure className="story-hero__quote">
              <blockquote>
                <p>{quote.text}</p>
              </blockquote>
              <figcaption>
                <span>
                  <cite>{quote.name}</cite>, {quote.role}
                </span>
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </header>
  );
}
