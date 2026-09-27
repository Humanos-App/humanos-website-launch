import { StoryPage } from "../_components/story/StoryPage";
import { storyMetadata } from "../_components/story/metadata";
import {
  Accent,
  CardGrid,
  CompareTable,
  FactGrid,
  FromTo,
  KeyValueList,
  Prose,
  PullStatement,
  Statement,
  StepsCard,
  SummaryBox,
} from "../_components/story/blocks";

export const metadata = storyMetadata({
  slug: "lusiadas",
  title:
    "Continuous AI risk management across a clinical ecosystem · Humanos × Lusíadas",
  description:
    "Lusíadas uses Humanos to measure and prove AI risk across Medify, Glintt, NewSoft, Pipedrive, internal systems and the patient mobile app — continuous Risk Intelligence for a multi-vendor healthcare ecosystem.",
});

const siteLink = (
  <a href="https://www.lusiadas.pt/en" target="_blank" rel="noopener noreferrer">
    lusiadas.pt&nbsp;↗
  </a>
);

export default function LusiadasCaseStudyPage() {
  return (
    <StoryPage
      slug="lusiadas"
      name="Humanos × Lusíadas"
      hero={{
        customer: "Lusíadas",
        title: "Lusíadas runs human approvals through Humanos.",
        intro:
          "Lusíadas is a national private hospital network with a multi-vendor stack — Medify, Glintt, NewSoft, Pipedrive, internal systems and the patient mobile app. Humanos sits across all of it as a global, independent approval OS. One API any system can call when a human needs to consent, sign, prove identity, or authorize an action — collected once, verifiable everywhere.",
        client: "Lusíadas",
        details: [
          { label: "Domain", value: "National private hospital network" },
          {
            label: "Surface area",
            value: "Consents · KYCs · Signatures · Prescriptions",
          },
          {
            label: "Integration",
            value: <span className="story-mono">humanos.requestApproval()</span>,
          },
          { label: "Site", value: siteLink },
        ],
      }}
      tldr={{
        title:
          "One API for every consent, KYC, signature and prescription — across every system.",
        body: (
          <Prose>
            <p>
              Lusíadas is a national private hospital network with a
              multi-vendor stack — Medify, Glintt, NewSoft, Pipedrive, internal
              systems and the patient mobile app. Every one of those surfaces
              eventually needs the same thing: a signed, verifiable human
              approval — a consent, a KYC, a signature, a prescription.
            </p>
            <p>
              Humanos sits across the ecosystem as a global, independent
              approval OS. One API any system can call. Approvals are collected
              once, anchored as portable proofs, and verifiable from any other
              system that needs them.
            </p>
            <p>
              Every approval emits a cryptographic receipt with signer, scope,
              timestamp, and validity. When AI agents start acting inside
              Lusíadas systems, they inherit the same approval infrastructure
              that humans use today.
            </p>
          </Prose>
        ),
      }}
      sections={[
        {
          id: "customer",
          nav: "The Customer",
          title:
            "Lusíadas is a national private hospital network running on a multi-vendor clinical stack.",
          body: (
            <>
              <Prose>
                <p>
                  Their ecosystem spans third-party clinical and back-office
                  software — <strong>Medify</strong>, <strong>Glintt</strong>,{" "}
                  <strong>NewSoft</strong>, <strong>Pipedrive</strong> — and
                  their own internal systems and patient mobile app. Every one
                  of those surfaces eventually needs the same thing: a signed,
                  verifiable human approval — a consent, a KYC, a signature, a
                  prescription.
                </p>
                <p>
                  Humanos sits across the ecosystem as a global, independent{" "}
                  <strong>approval OS</strong>. One API any system can call.
                  Approvals are collected once, anchored as portable proofs, and
                  verifiable from any other system that needs them — making
                  every clinical and administrative process faster, safer, and
                  audit-ready by default.
                </p>
              </Prose>
              <KeyValueList
                items={[
                  { label: "Customer", value: "Lusíadas" },
                  { label: "Status", value: "Integrated" },
                  { label: "Domain", value: "National private hospital network" },
                  {
                    label: "Surface area",
                    value: "Consents · KYCs · Signatures · Prescriptions",
                  },
                  {
                    label: "Stack",
                    value: "Medify · Glintt · NewSoft · Pipedrive · mobile",
                  },
                  {
                    label: "Integration",
                    value: (
                      <>
                        <span className="story-mono">humanos.requestApproval()</span>{" "}
                        · global approval OS
                      </>
                    ),
                  },
                  { label: "Site", value: siteLink },
                  { label: "Anchored", value: "2026-05-29 · v1" },
                ]}
              />
            </>
          ),
        },
        {
          id: "problem",
          nav: "The Problem",
          title:
            "Every system needed its own approval flow. Patients re-signed the same consent on three apps.",
          body: (
            <>
              <Prose>
                <p>
                  A modern hospital network runs on a multi-vendor stack. Each
                  vendor — clinical software, back-office, CRM, mobile — shipped
                  its own way to collect a signature, a consent, a KYC. None of
                  them spoke to the others.
                </p>
                <p>
                  An approval signed in Medify couldn&apos;t be reused in Glintt.
                  A KYC done in the mobile app didn&apos;t carry over to NewSoft.
                  GDPR compliance had to be re-proven per integration.
                </p>
              </Prose>
              <CardGrid
                min={280}
                items={[
                  {
                    label: "What’s happening",
                    title: "Each vendor reimplements signatures, KYCs, consents.",
                    text: "Every clinical or admin system needs human approvals — but every one of them builds it differently. Same patient, different flows, different storage, different proof formats. Approvals end up trapped inside whichever app collected them.",
                  },
                  {
                    label: "What it costs",
                    title: "Approvals can’t travel between systems.",
                    text: "An informed consent signed at admission doesn’t reach the OR system. A GDPR consent given in the mobile app doesn’t propagate to the back-office. Patients sign the same thing two or three times. Audit becomes a reconstruction exercise across disconnected vendors.",
                  },
                ]}
              />
              <PullStatement>
                One patient, one approval, three apps re-asking for it.{" "}
                <Accent>Not anymore.</Accent>
              </PullStatement>
            </>
          ),
        },
        {
          id: "solution",
          nav: "The Solution",
          title: "One approval API, shared by every system in the stack.",
          body: (
            <>
              <Prose>
                <p>
                  Any clinical or admin system in the Lusíadas ecosystem —
                  Medify, Glintt, NewSoft, Pipedrive, internal apps, the patient
                  mobile app — can request and verify a human approval through a
                  single call to Humanos.
                </p>
                <p>
                  Approvals are collected once, signed by the right human(s),
                  anchored as portable proofs, and consultable from any other
                  system that needs them.
                </p>
              </Prose>
              <CardGrid
                min={280}
                items={[
                  {
                    label: "✓ Approved",
                    title: "Procedure can proceed.",
                    text: "Both signers verified, scope correct, receipt anchored. The proof is attached to the patient’s clinical record and becomes visible to NewSoft, Glintt, the OR system, and the patient mobile app — without anyone re-collecting it.",
                  },
                  {
                    label: "✕ Missing approval",
                    title: "Collect inline — then continue.",
                    text: "Missing a signature, an expired KYC, an outdated GDPR consent. Humanos requests the missing approval in real time through whichever surface the human is on (mobile, web, in-clinic), and the original flow resumes once the receipt is valid.",
                  },
                ]}
              />
              <PullStatement>
                Lusíadas approves once — and the rest of the ecosystem just
                verifies.
              </PullStatement>
            </>
          ),
        },
        {
          id: "implementation",
          nav: "Implementation",
          title: "How Lusíadas implemented it.",
          body: (
            <>
              <Prose>
                <p>
                  Five stages in chronological order, walking through one
                  informed-consent flow end-to-end — collected in Medify,
                  verified by Humanos, surfaced across NewSoft, Glintt, and the
                  patient mobile app without anyone re-asking.
                </p>
              </Prose>
              <StepsCard
                caption="Example · Informed consent · Cardiac catheterization"
                steps={[
                  {
                    title: "Issue · Define approval template",
                    text: "Lusíadas Compliance authorizes the approval template — consent type, required signers, scope, validity. Humanos issues a machine-verifiable schema — one template, reusable across every system that needs that approval.",
                  },
                  {
                    title: "Prepare · Medify renders the consent",
                    text: (
                      <>
                        The clinical software (Medify) renders the
                        informed-consent document for the patient and the
                        signing physician. It attaches the approval template to
                        its outbound request as{" "}
                        <span className="story-mono">x-humanos-approval</span>.
                      </>
                    ),
                  },
                  {
                    title: "Verify · Humanos verifies signers",
                    text: "Both signers (patient + physician) sign through Humanos. Identity, scope, registered counterparty, signatures, and anchor are checked in 188 ms — deterministic, single API across every system in the stack.",
                  },
                  {
                    title: "Execute · Commit to clinical record",
                    text: "Approved → the consent is written to the patient’s clinical record and becomes consultable by NewSoft, Glintt, the OR system, and the patient mobile app — no re-collection. Missing → step-up is requested inline (mobile, SMS, in-clinic) and the original flow resumes.",
                  },
                  {
                    title: "Prove · Portable receipt",
                    text: "Every approval emits a cryptographic receipt — anchored to the Lusíadas approval ledger, attached to the clinical record, portable forever. Auditors, regulators, and insurance partners verify the receipt directly against Humanos; nothing reconstructs trails from scattered vendor logs.",
                  },
                ]}
              />
              <FactGrid
                items={[
                  { label: "Issuer", value: "Compliance · Lusíadas" },
                  { label: "Signers", value: "Patient + Cardiologist" },
                  { label: "Scope", value: "consent.informed · cardiology" },
                  { label: "Linked", value: "GDPR processing" },
                  { label: "Latency", value: "188 ms total" },
                  { label: "Surfaced in", value: "Medify · NewSoft · Glintt · mobile" },
                  {
                    label: "Verifiers",
                    value: "Auditor · Regulator · Insurance partner",
                  },
                  { label: "Result", value: "Independently verifiable · forever" },
                ]}
              />
            </>
          ),
        },
        {
          id: "outcome",
          nav: "The Outcome",
          title: "What you get the moment it’s wired in.",
          body: (
            <>
              <CardGrid
                items={[
                  {
                    label: "Unified",
                    title: "One approval API across every system.",
                    text: "Medify, Glintt, NewSoft, Pipedrive, internal apps, the mobile app — they all consume the same single endpoint. Every kind of human approval, one integration.",
                  },
                  {
                    label: "Reusable",
                    title: "Collect once, verify everywhere.",
                    text: "An approval signed in one corner of the ecosystem is valid in every other. Patients sign once; clinicians sign once. The proof travels with them.",
                  },
                  {
                    label: "Compliant",
                    title: "GDPR- and regulator-ready by default.",
                    text: "Every approval emits a cryptographic receipt with signer, scope, timestamp, and validity. Compliance proven at the approval layer — not reproven per vendor integration.",
                  },
                  {
                    label: "Faster",
                    title: "Procedures proceed without rework.",
                    text: "No duplicate signatures, no re-asking the patient, no re-doing the KYC. Missing approvals are collected inline and the original clinical or admin flow resumes immediately.",
                  },
                  {
                    label: "Verifiable",
                    title: "Portable, independently verifiable proof.",
                    text: "Auditors, regulators, and insurance partners verify the receipt directly against Humanos. No log reconstruction from scattered vendor systems.",
                  },
                  {
                    label: "Agent-ready",
                    title: "Same API for humans today, agents tomorrow.",
                    text: "When AI agents start acting inside Lusíadas systems, they inherit the same approval infrastructure that humans use today. No re-engineering, no parallel stack.",
                  },
                ]}
              />
              <Statement>
                Approvals collected in one corner of the ecosystem —{" "}
                <Accent>verified, trusted, and reusable across all of it.</Accent>
              </Statement>
            </>
          ),
        },
        {
          id: "build-vs-buy",
          nav: "Build vs Humanos",
          title: "Approvals don’t scale built per system.",
          body: (
            <CompareTable
              caption="Build per system vs Humanos approval OS"
              columns={["Approvals locked per app", "One API, every system"]}
              highlight={1}
              rows={[
                [
                  "Each vendor implements its own signature, consent, and KYC flow.",
                  "One API every system in the stack calls — consents, signatures, KYCs, prescriptions.",
                ],
                [
                  "Approvals are trapped inside whichever app collected them.",
                  "Approvals are portable proofs, consultable from any other system that needs them.",
                ],
                [
                  "GDPR compliance reproven per vendor integration.",
                  "Compliance proven once at the approval layer; every system inherits it.",
                ],
                [
                  "Audit assembled from scattered vendor logs.",
                  "Every approval emits a portable receipt anchored at the Lusíadas approval ledger.",
                ],
                [
                  "Patients re-sign the same consent across two or three apps.",
                  "Patients sign once; the rest of the ecosystem just verifies.",
                ],
                [
                  "Re-engineer the approval layer when AI agents arrive.",
                  "Same API today for humans, tomorrow for agents — no parallel stack.",
                ],
              ].map(([bad, good]) => [
                { content: `✕ ${bad}`, tone: "negative" as const },
                { content: `✓ ${good}`, tone: "positive" as const },
              ])}
            />
          ),
        },
        {
          id: "network",
          nav: "Network Effect",
          title:
            "One approval becomes shared infrastructure — not something each vendor rebuilds.",
          body: (
            <>
              <Prose>
                <p>
                  <strong>
                    An approval signed in one system works in every other.
                  </strong>{" "}
                  Sign in Medify, verify in Glintt. Sign in the mobile app,
                  verify in NewSoft. The proof travels with the patient.
                </p>
                <p>
                  <strong>Every vendor consumes the same approval layer.</strong>{" "}
                  No re-collection. No duplicated KYCs. No re-asking the patient
                  for a consent they already gave somewhere else in the
                  ecosystem.
                </p>
                <p>
                  <strong>New vendor? Same API.</strong> Onboarding a new
                  clinical or admin system means calling the same endpoint. No
                  new approval logic per integration.
                </p>
                <p>
                  <strong>Each system strengthens the network.</strong> The more
                  systems run on the same approval OS, the more reusable every
                  signed receipt becomes — and the simpler every audit gets.
                </p>
              </Prose>
              <Statement>
                Any approval. Any system. <Accent>One API.</Accent>
              </Statement>
              <CardGrid
                items={[
                  {
                    label: "01",
                    title: "GDPR consents",
                    text: "Captured at first contact — mobile, web, or in-clinic. Valid across every Lusíadas touchpoint. Compliance proven at the approval layer, not reproven per integration.",
                    tags: ["consent", "scope", "expiry"],
                  },
                  {
                    label: "02",
                    title: "Remote identity verification",
                    text: "KYC the patient before any clinical or admin action that requires it. Done once, verifiable across the mobile app, clinical software, and back-office systems.",
                    tags: ["kyc", "identity", "liveness"],
                  },
                  {
                    label: "03",
                    title: "Informed consents",
                    text: "Signed by both the patient and the healthcare professional. Receipt anchored, attached to the clinical record, visible to every system that needs it — without re-collection.",
                    tags: ["patient", "physician", "proof"],
                  },
                  {
                    label: "04",
                    title: "Prescription signing",
                    text: "Physicians sign through Humanos; the pharmacy dispenses against the verified receipt. Same integration covers Medify, Glintt, and the patient mobile app surface.",
                    tags: ["sign", "dispense", "audit"],
                  },
                ]}
              />
            </>
          ),
        },
        {
          id: "model",
          nav: "The Model",
          title: "Issue → Verify → Collect → Prove.",
          body: (
            <CardGrid
              min={200}
              items={[
                {
                  label: "01 · Issue",
                  title: "Mandate.",
                  text: "Human authorizes scope. Humanos issues a machine-verifiable mandate, reusable across every system that verifies.",
                },
                {
                  label: "02 · Verify",
                  title: "Check.",
                  text: (
                    <>
                      Any external system runs{" "}
                      <span className="story-mono">humanos.verify()</span>.
                      Deterministic yes / no.
                    </>
                  ),
                },
                {
                  label: "03 · Collect",
                  title: "Approval.",
                  text: "Out of scope? Request step-up authorization from the human principal in real time — API, SMS, or email.",
                },
                {
                  label: "04 · Prove",
                  title: "Receipt.",
                  text: "Cryptographic Proof per action. Auditable forever. Verifiable by anyone.",
                },
              ]}
            />
          ),
        },
        {
          id: "category",
          nav: "Category Definition",
          title:
            "Humanos is the approval OS across the Lusíadas ecosystem — the moment a human action needs to be authorized.",
          body: (
            <>
              <Prose>
                <p>
                  At that moment, the approval must be unified across every
                  system, portable across every vendor, and future-proofed for
                  the agents that come next. Everything else follows.
                </p>
              </Prose>
              <KeyValueList
                items={[
                  {
                    label: "Unified",
                    value: (
                      <>
                        <strong>One API, every system.</strong> Medify, Glintt,
                        NewSoft, Pipedrive, internal apps and the mobile app all
                        consume the same single approval endpoint.
                      </>
                    ),
                  },
                  {
                    label: "Portable",
                    value: (
                      <>
                        <strong>An approval works wherever it&apos;s needed.</strong>{" "}
                        Signed once. Verifiable everywhere. Patients and
                        clinicians never re-sign what the ecosystem already has.
                      </>
                    ),
                  },
                  {
                    label: "Future-proof",
                    value: (
                      <>
                        <strong>Humans today, agents tomorrow.</strong> The same
                        API serves human approvals now and the AI agents that
                        will act on behalf of those humans next.
                      </>
                    ),
                  },
                ]}
              />
              <FromTo
                from="Each system reimplements approvals."
                to="Every system shares one approval layer."
              />
              <SummaryBox>
                <Statement size="lg">
                  Collected once,
                  <br />
                  <Accent>verifiable everywhere.</Accent>
                </Statement>
              </SummaryBox>
            </>
          ),
        },
      ]}
    />
  );
}
