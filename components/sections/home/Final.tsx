import { TalkWithUs } from "@/components/dialogs/TalkWithUs";

export function Final() {
  return (
    <section className="final">
      <div className="final__grid-bg" aria-hidden="true" />
      <div className="wrap">
        <div className="final__eyebrow">Verify before execution</div>
        <h2 className="final__title">
          Before systems act, make sure they&apos;re{" "}
          <span className="accent">allowed to</span>.
        </h2>
        <p className="final__sub">
          Authorization collected once. Verified before execution. Proven on
          demand.
        </p>
        <div className="final__ctas">
          <a className="btn btn--primary" href="#">
            Get API key <span className="arrow">→</span>
          </a>
          <TalkWithUs>
            <button type="button" className="btn btn--secondary">
              Talk to us <span className="arrow">→</span>
            </button>
          </TalkWithUs>
        </div>
        <p className="final__fineprint">
          Built for agents, payments, ERP, workflows, and any system executing
          real actions.
        </p>
      </div>
    </section>
  );
}
