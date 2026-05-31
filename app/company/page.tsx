import type { Metadata } from "next";
import Link from "next/link";
import { TalkWithUs } from "@/components/dialogs/TalkWithUs";

export const metadata: Metadata = {
  title: "Company · Humanos",
  description:
    "Humanos is building the authorization layer for autonomous systems — a shared, portable, machine-verifiable primitive of the internet.",
};

export default function CompanyPage() {
  return (
    <div className="company-page">
      {/* 01 · INTRO */}
      <section className="intro" data-screen-label="01 Company">
        <div className="intro__grid-bg" aria-hidden="true" />
        <div className="intro__glow" aria-hidden="true" />
        <div className="wrap">
          <div className="intro__inner">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true" />
              Company
            </span>
            <h1 className="h-lead">
              Building the authorization layer for autonomous systems.
            </h1>
            <div className="vision__ledger intro__ledger">
              <div className="vision__row">
                <div className="vision__co">Stripe</div>
                <div className="vision__did">standardized payments.</div>
              </div>
              <div className="vision__row">
                <div className="vision__co">Auth0</div>
                <div className="vision__did">standardized identity.</div>
              </div>
              <div className="vision__row vision__row--now">
                <div className="vision__co">Humanos</div>
                <div className="vision__did">is standardizing authorization.</div>
              </div>
            </div>

            <div className="intro__body">
              <p className="body-lg">
                As software becomes increasingly autonomous, every action must
                be <span className="hl">verifiable, authorized, and accountable.</span>
              </p>
              <p className="body-lg">
                Humanos is building the infrastructure that allows AI systems,
                applications, and organizations to verify whether an action is
                allowed before execution, recover missing authorization when
                required, and generate independently verifiable proof
                afterwards.
              </p>
              <p className="body-lg">
                We believe authorization should become a{" "}
                <span className="hl">
                  shared, portable, and machine-verifiable layer of the internet.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 · TEAM PHOTO */}
      <section className="team" data-screen-label="02 Team">
        <div className="wrap">
          <div className="team__photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/founders.jpg" alt="The Humanos founding team" />
          </div>
          <div className="team__caption">
            <span className="mark" aria-hidden="true" />
            The Humanos founding team is spread across the US and Europe.
          </div>
        </div>
      </section>

      {/* 03 · WHY WE EXIST */}
      <section className="why" data-screen-label="03 Why we exist">
        <div className="why__glow" aria-hidden="true" />
        <div className="wrap">
          <div className="why__inner">
            <span className="eyebrow eyebrow--dark">
              <span className="dot" aria-hidden="true" />
              Why we exist
            </span>
            <h2>
              AI can act. <span className="q">But who decided it was allowed to?</span>
            </h2>
            <div className="why__body">
              <p>
                Today&rsquo;s systems are built around{" "}
                <span className="hl">identity and access</span>. Autonomous
                systems require <span className="hl">authorization</span>.
              </p>
              <p>
                As AI agents begin executing payments, modifying records,
                accessing data, signing agreements, interacting with external
                services, and operating across organizations, the ability to
                verify whether an action was authorized becomes critical.
              </p>
              <p>
                We started Humanos to build the infrastructure that makes
                autonomous execution trustworthy.
              </p>
            </div>
            <div className="why__split">
              <div className="why__split-item">
                <span className="from">identity</span>
                <span className="arr">→</span>
                <span className="to">who you are</span>
              </div>
              <div className="why__split-item">
                <span className="from">access</span>
                <span className="arr">→</span>
                <span className="to">what you can reach</span>
              </div>
              <div className="why__split-item">
                <span className="from">authorization</span>
                <span className="arr">→</span>
                <span className="to">whether this action is allowed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 · FOUNDING TEAM */}
      <section className="founders" data-screen-label="04 Founding team">
        <div className="wrap">
          <div className="founders__head">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true" />
              Founding team
            </span>
            <h2 className="h-section">
              The Humanos team has spent a decade building and automating
              complex systems.
            </h2>
          </div>

          <div className="metrics">
            <div className="metric">
              <div className="metric__num">7</div>
              <div className="metric__label">
                Team members
                <span className="metric__note">all repeat founders</span>
              </div>
            </div>
            <div className="metric">
              <div className="metric__num">19</div>
              <div className="metric__label">Startups built</div>
            </div>
            <div className="metric">
              <div className="metric__num">5</div>
              <div className="metric__label">Exits</div>
            </div>
          </div>

          <div className="founders__tags">
            {["Payments", "Cybersecurity", "Blockchain", "AI", "Infrastructure"].map(
              (t) => (
                <span className="company__tag" key={t}>
                  <span className="pip" />
                  {t}
                </span>
              ),
            )}
          </div>

          <p className="founders__support">
            The Humanos founding team has spent the last decade building
            companies across{" "}
            <span className="hl">
              payments, cybersecurity, infrastructure, AI, and identity systems.
            </span>
          </p>
        </div>
      </section>

      {/* 05 · VISION */}
      <section className="vision" data-screen-label="05 Vision">
        <div className="wrap">
          <div className="vision__inner">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true" />
              Our vision
            </span>
            <h2 className="h-section">
              Authorization should become internet infrastructure.
            </h2>

            <div className="vision__body">
              <p className="body-lg">
                We are building the infrastructure that allows any system to{" "}
                <span className="hl">issue, verify, recover, and prove</span>{" "}
                authorization before execution.
              </p>
              <p className="body-lg">
                Today, approvals, signatures, consents, policies, permissions,
                and delegated authority are fragmented across applications,
                organizations, and communication channels. We believe
                authorization should become a shared, machine-verifiable
                primitive that any system can trust.
              </p>
              <p className="body-lg">
                As AI systems become increasingly autonomous, authorization
                becomes as fundamental as{" "}
                <span className="hl">payments and identity.</span> Our goal is to
                make it a shared, portable, and machine-verifiable layer of the
                internet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="closing" data-screen-label="06 Closing">
        <div className="wrap wrap--narrow">
          <span className="eyebrow">
            <span className="dot" aria-hidden="true" />
            Humanos
          </span>
          <h2 className="closing__line">
            A shared layer of authorization for the{" "}
            <span className="accent">autonomous internet.</span>
          </h2>
          <div className="closing__ctas">
            <Link className="btn btn--primary" href="/platform">
              See how it works <span className="arrow">→</span>
            </Link>
            <TalkWithUs>
              <button className="btn btn--secondary" type="button">
                Talk with us <span className="arrow">→</span>
              </button>
            </TalkWithUs>
          </div>
        </div>
      </section>
    </div>
  );
}
