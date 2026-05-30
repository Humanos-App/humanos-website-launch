import { TalkWithUs } from "@/components/dialogs/TalkWithUs";
import { ROUTES } from "@/lib/routes";
import { HeroDiagram } from "./HeroDiagram";

export function Hero() {
  return (
    <section className="uc-hero">
      <div className="uc-hero__grid" aria-hidden="true" />
      <div className="wrap">
        <div className="uc-hero__inner">
          <div className="uc-hero__eyebrow">
            <span className="dot" />
            <span>Authorization infrastructure for the AI era</span>
          </div>

          <h1>
            What can you build when authorization becomes{" "}
            <span className="underline">machine-verifiable</span>?
          </h1>

          <p className="uc-hero__sub">
            Turn human approvals into authorization that systems, agents,
            partners and auditors can verify before execution.
          </p>

          <div className="uc-hero__ctas">
            <TalkWithUs>
              <button type="button" className="btn btn--primary">
                Talk with us <span className="arrow">→</span>
              </button>
            </TalkWithUs>
            <a className="btn btn--secondary" href={ROUTES.customers}>
              See customer stories <span className="arrow">→</span>
            </a>
          </div>
        </div>

        <HeroDiagram />
      </div>
    </section>
  );
}
