import { ROUTES } from "@/lib/routes";

type Card = {
  tag: string;
  name: string;
  outcome: string;
  href: string;
};

const CARDS: Card[] = [
  {
    tag: "Healthcare",
    name: "Bloodflow",
    outcome:
      "Agents verified patient consent before accessing healthcare data.",
    href: ROUTES.customers,
  },
  {
    tag: "ERP Automation",
    name: "Al Kharafi Group",
    outcome:
      "ERP agents executed operations across six enterprise systems with verified authorization.",
    href: ROUTES.customers,
  },
  {
    tag: "Treasury",
    name: "Numo",
    outcome: "Treasury agents allocated capital within predefined mandates.",
    href: ROUTES.caseStudies.numo,
  },
  {
    tag: "Insurance",
    name: "Fidelidade",
    outcome:
      "Customer approvals became reusable authorization across workflows.",
    href: ROUTES.customers,
  },
  {
    tag: "Commerce",
    name: "SIBS",
    outcome: "Agentic commerce powered by verifiable authorization.",
    href: ROUTES.customers,
  },
  {
    tag: "Payments",
    name: "Mastercard",
    outcome: "Verifiable Intent meets verifiable authorization.",
    href: ROUTES.customers,
  },
];

export function CaseStudies() {
  return (
    <section className="uc-sec uc-cs">
      <div className="uc-cs__grid-bg" aria-hidden="true" />
      <div className="wrap">
        <div className="uc-sec__head">
          <div className="uc-eyebrow">
            <span className="uc-eyebrow__dot" />
            See it in production
          </div>
          <h2 className="uc-sec__title">
            Real systems already verifying before they act.
          </h2>
          <p className="uc-sec__sub uc-sec__sub--center">
            See how enterprises use Humanos to authorize actions before
            execution and generate proof afterwards.
          </p>
        </div>

        <div className="uc-cs__grid">
          {CARDS.map((c) => (
            <a key={c.name} className="uc-cs__card" href={c.href}>
              <div className="uc-cs__tag">{c.tag}</div>
              <div className="uc-cs__name">{c.name}</div>
              <p className="uc-cs__outcome">{c.outcome}</p>
              <span className="uc-cs__cta">
                Read case study <span className="arr">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
