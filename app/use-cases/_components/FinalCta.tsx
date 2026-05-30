import { TalkWithUs } from "@/components/dialogs/TalkWithUs";
import { ROUTES } from "@/lib/routes";

export function FinalCta() {
  return (
    <section className="uc-sec uc-final">
      <div className="uc-final__grid" aria-hidden="true" />
      <div className="wrap">
        <div className="uc-final__inner">
          <h2 className="uc-final__title">
            AI can act. Humanos makes sure it was{" "}
            <span className="accent">allowed to</span>.
          </h2>
          <p className="uc-final__sub">
            Turn human approval into authorization any system can verify before
            execution.
          </p>
          <div className="uc-final__ctas">
            <TalkWithUs>
              <button type="button" className="btn btn--primary">
                Talk with us <span className="arrow">→</span>
              </button>
            </TalkWithUs>
            <a className="btn btn--secondary" href={ROUTES.customers}>
              Explore customer stories <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
