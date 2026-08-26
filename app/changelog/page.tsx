import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Public release notes for the Humanos platform: what changed in each dated API version, newest first.",
  alternates: { canonical: "/changelog" },
};

type Entry = {
  version: string;
  title: string;
  latest?: boolean;
  changes: string[];
};

/* Mirrors docs.humanos.tech/essentials/changelog — the API is versioned by
   date, integrations pin a version with the API-Version header and upgrade
   on their own schedule. Update both places when a new version ships. */
const ENTRIES: Entry[] = [
  {
    version: "2026-07-06",
    title: "Richer catalog and audit surfaces; leaner verification shapes",
    latest: true,
    changes: [
      "Actions: GET /actions and GET /actions/version/{id} now return the full catalog shape — action name and description, version list, per-version content, published flag and a digestSRI integrity hash, with standard pagination.",
      "Credentials: the credential entity gains name, description, tags and decisions.",
      "Verifiable presentations (breaking): issue/verify shapes simplified — the presentation response no longer nests presentationEncoded/receipt, and verification takes the presentation in its new form.",
      "Requests (breaking): the iframe object was removed from POST /request — iframe embedding is configured through the iframe integration guide instead.",
      "Subjects: extraContacts and identity handling refined on POST /user.",
    ],
  },
  {
    version: "2026-06-18",
    title: "Multi-user requests and a structured identity webhook",
    changes: [
      "Multi-user requests (breaking): POST /request now takes a users[] array — each entry with its own contact, secondary contact, document id, language and signer quality.",
      "Embedding (breaking): iframe configuration moved into the request body; the top-level pubKey and redirectUrl fields were removed.",
      "Identity webhook (breaking): the flat identity payload became a structured document — addresses, birth, nationality, document type, issue date, expiry and more as first-class fields. Pin your webhook version before upgrading.",
      "Filtering: dateFrom/dateTo range filters normalised on GET /request and GET /activity.",
    ],
  },
  {
    version: "2026-05-17",
    title:
      "The platform surface: credentials, actions, DIDs, approvals, activity, webhooks",
    changes: [
      "New endpoint groups: Credentials (evidence, issue VP, verify, revoke), Actions, DID resolution, Approvals (replacing Resources), Activity, and documented webhook event schemas.",
      "Idempotency: Idempotency-Key header support on POST /request, POST /user and PATCH /request/resend/{requestId} — safe retries without duplicate side effects.",
      "Lookups (breaking): users are addressed by id (previously did); request listing filters by subject.",
    ],
  },
  {
    version: "2026-03-20",
    title: "Initial public version",
    changes: [
      "Requests: create, list, fetch, delete, and OTP resend.",
      "Users: create and look up.",
      "Credentials: fetch by id.",
      "Resources: list resources and resource groups (renamed to Approvals in 2026-05-17).",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="legal">
      <div className="wrap">
        <div className="legal__inner">
          <p className="legal__eyebrow">Product updates</p>
          <h1 className="legal__title">Changelog</h1>

          <p className="legal__lede">
            What changed in each dated version of the Humanos platform, newest
            first. The API is versioned by date — integrations pin a version
            with the <code>API-Version</code> header and upgrade on their own
            schedule, so a new version never changes behaviour you depend on
            until you opt in. Full technical detail lives in the{" "}
            <a
              href="https://docs.humanos.tech/essentials/versioning"
              target="_blank"
              rel="noopener noreferrer"
            >
              API documentation
            </a>
            .
          </p>

          {ENTRIES.map((e) => (
            <section key={e.version}>
              <h2 className="legal__h2">
                {e.version}
                {e.latest ? " — Latest" : ""}
              </h2>
              <p>
                <strong>{e.title}.</strong>
              </p>
              <ul>
                {e.changes.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          ))}

          <h2 className="legal__h2">Staying informed</h2>
          <p>
            Breaking changes are only ever introduced behind a new dated
            version. Questions about an upgrade, or something behaving
            differently than these notes describe? Email{" "}
            <a href="mailto:support@humanos.tech">support@humanos.tech</a> and
            we will help you move across.
          </p>
        </div>
      </div>
    </main>
  );
}
