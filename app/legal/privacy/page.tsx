import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Statement",
  description:
    "How Humanos (Humanos Labs Inc.) collects, uses, shares and protects personal data in compliance with GDPR and Portuguese data protection law.",
  alternates: { canonical: "/legal/privacy" },
};

const LAST_UPDATED = "2026-06-01";

export default function PrivacyPage() {
  return (
    <main className="legal">
      <div className="wrap">
        <div className="legal__inner">
          <p className="legal__eyebrow">
            Privacy Statement · v1.0 · effective {LAST_UPDATED}
          </p>
          <h1 className="legal__title">Privacy Statement</h1>

          <p className="legal__lede">
            <strong>Humanos</strong> — operated by{" "}
            <strong>Humanos Labs Inc.</strong>. This Privacy Statement explains
            how we collect, use, share and protect personal data when you use
            the Humanos platform, websites, applications and related services.
          </p>

          <h2 className="legal__h2">1. Introduction</h2>
          <p>
            This Privacy Statement explains how{" "}
            <strong>Humanos Labs Inc.</strong>, trading as{" "}
            <strong>Humanos</strong> (&ldquo;Humanos&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;, &ldquo;our&rdquo;), collects, uses, shares and
            protects personal data when you use the Humanos digital identity and
            verifiable credentials platform, our websites, applications and
            related services (together, the &ldquo;Service&rdquo;).
          </p>
          <p>
            We are committed to protecting the privacy of personal information
            and to compliance with applicable data protection laws, including
            the EU General Data Protection Regulation (Regulation (EU) 2016/679,
            &ldquo;GDPR&rdquo;) and Portuguese data protection law. Our
            practices are governed by our internal Data Protection Policy,
            Privacy By Design Policy, Data Classification Policy and Data
            Retention Policy, and our information security controls are
            certified to ISO/IEC 27001:2022.
          </p>
          <p>
            By using the Service, you acknowledge the practices described in
            this Privacy Statement.
          </p>

          <h2 className="legal__h2">2. Who we are (Data Controller)</h2>
          <p>
            For the personal data processed in connection with the Service, the
            data controller is:
          </p>
          <ul className="legal__list">
            <li>
              <strong>Humanos Labs Inc.</strong> (trading as
              &ldquo;Humanos&rdquo;)
            </li>
            <li>Portugal</li>
            <li>
              Privacy / data protection contact:{" "}
              <a className="legal__link" href="mailto:privacy@humanos.tech">
                privacy@humanos.tech
              </a>
            </li>
            <li>
              Data Protection Officer (DPO):{" "}
              <a className="legal__link" href="mailto:dpo@humanos.tech">
                dpo@humanos.tech
              </a>
            </li>
          </ul>
          <p>
            Where Humanos processes personal data on behalf of a business
            customer (for example, when a customer uses our platform to verify
            the identity of its own users), Humanos acts as a{" "}
            <strong>data processor</strong> and the business customer is the{" "}
            <strong>data controller</strong>. In those cases, processing is
            governed by the Data Processing Agreement (DPA) entered into with
            that customer.
          </p>

          <h2 className="legal__h2">3. The personal data we collect</h2>
          <p>
            We collect only the data required to deliver the Service
            (&ldquo;data minimisation&rdquo;). Depending on how you use the
            Service, this may include:
          </p>
          <table className="legal__table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Examples</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Account data</strong>
                </td>
                <td>Name, email address, phone number, account records</td>
                <td>Provided by you at registration</td>
              </tr>
              <tr>
                <td>
                  <strong>Authentication data</strong>
                </td>
                <td>
                  Login credentials, authentication tokens, session information
                </td>
                <td>Generated when you sign in</td>
              </tr>
              <tr>
                <td>
                  <strong>Identity verification (KYC) data</strong>
                </td>
                <td>
                  Identity documents and facial image used to verify your
                  identity
                </td>
                <td>
                  Provided by you; processed via our verification provider
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Verifiable credential data</strong>
                </td>
                <td>
                  Decentralised identifiers (DIDs), credential metadata and
                  cryptographic anchors
                </td>
                <td>Generated when credentials are issued</td>
              </tr>
              <tr>
                <td>
                  <strong>Uploaded documents</strong>
                </td>
                <td>
                  Files and documents you upload, and text extracted from them
                </td>
                <td>Provided by you</td>
              </tr>
              <tr>
                <td>
                  <strong>Payment and billing data</strong>
                </td>
                <td>
                  Billing details and payment method (card details are sent
                  directly to our payment processor and never reach Humanos
                  servers)
                </td>
                <td>Provided by you / payment processor</td>
              </tr>
              <tr>
                <td>
                  <strong>Technical and usage data</strong>
                </td>
                <td>
                  Operational logs and security events (personal identifiers are
                  scrubbed before these logs are stored)
                </td>
                <td>Generated automatically</td>
              </tr>
            </tbody>
          </table>
          <p>
            &ldquo;Personal Data&rdquo; means any information relating to an
            identified or identifiable individual. Identity documents and facial
            images are <strong>special category / sensitive data</strong> and
            are subject to additional safeguards.
          </p>

          <h2 className="legal__h2">
            4. How we use personal data and our legal bases
          </h2>
          <p>
            We process personal data for the following purposes and on the
            following GDPR legal bases:
          </p>
          <table className="legal__table">
            <thead>
              <tr>
                <th>Purpose</th>
                <th>Legal basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Creating and managing your account and providing the Service
                </td>
                <td>Performance of a contract (Art. 6(1)(b))</td>
              </tr>
              <tr>
                <td>
                  Verifying your identity (KYC) and issuing verifiable
                  credentials
                </td>
                <td>
                  Performance of a contract; compliance with a legal obligation;
                  explicit consent for biometric/identity data where required
                  (Art. 9(2)(a))
                </td>
              </tr>
              <tr>
                <td>Processing payments and managing billing</td>
                <td>Performance of a contract; legal obligation</td>
              </tr>
              <tr>
                <td>
                  Securing the Service, preventing fraud and abuse, and
                  maintaining audit logs
                </td>
                <td>Legitimate interests (Art. 6(1)(f)); legal obligation</td>
              </tr>
              <tr>
                <td>Communicating with you about the Service</td>
                <td>Performance of a contract; legitimate interests</td>
              </tr>
              <tr>
                <td>
                  Complying with legal, regulatory and accounting obligations
                </td>
                <td>Legal obligation (Art. 6(1)(c))</td>
              </tr>
            </tbody>
          </table>
          <p>
            We process personal data lawfully, fairly and transparently; for
            specified, explicit and legitimate purposes; limited to what is
            necessary; kept accurate and up to date; and retained only as long
            as necessary.
          </p>

          <h2 className="legal__h2">
            5. How we share personal data — subprocessors
          </h2>
          <p>
            We do not sell personal data. We share personal data only with
            vetted third-party subprocessors that help us deliver the Service,
            under contractual data protection terms (DPAs) and on a scoped,
            least-privilege basis. Our current subprocessors are:
          </p>
          <table className="legal__table">
            <thead>
              <tr>
                <th>Subprocessor</th>
                <th>Purpose</th>
                <th>Data involved</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>MongoDB Atlas</strong>
                </td>
                <td>Primary application database</td>
                <td>Name, email, phone, account records</td>
                <td>AWS eu-west-3 (Paris, EU)</td>
              </tr>
              <tr>
                <td>
                  <strong>AWS S3</strong>
                </td>
                <td>Encrypted file / document storage</td>
                <td>User-uploaded files</td>
                <td>eu-west-3 (Paris, EU)</td>
              </tr>
              <tr>
                <td>
                  <strong>AWS KMS</strong>
                </td>
                <td>Encryption key management</td>
                <td>Encryption keys (no personal data)</td>
                <td>EU</td>
              </tr>
              <tr>
                <td>
                  <strong>Firebase (Google Cloud)</strong>
                </td>
                <td>Authentication and session management</td>
                <td>Email, authentication tokens, sessions</td>
                <td>EU / US</td>
              </tr>
              <tr>
                <td>
                  <strong>Stripe</strong>
                </td>
                <td>Payment processing</td>
                <td>
                  Payment method and billing data (card data transmitted
                  directly to Stripe)
                </td>
                <td>US (PCI DSS Level 1)</td>
              </tr>
              <tr>
                <td>
                  <strong>Veriff</strong>
                </td>
                <td>KYC / identity verification</td>
                <td>
                  ID documents, facial image (raw media{" "}
                  <strong>not retained</strong> by Humanos)
                </td>
                <td>EU</td>
              </tr>
              <tr>
                <td>
                  <strong>Azure OCR</strong>
                </td>
                <td>Text extraction from documents</td>
                <td>
                  Uploaded documents (extracted text stored by us; originals
                  encrypted)
                </td>
                <td>EU</td>
              </tr>
              <tr>
                <td>
                  <strong>Grafana / Loki</strong>
                </td>
                <td>Application logging and monitoring</td>
                <td>
                  Operational logs only (<strong>no PII</strong> — scrubbed
                  before ingestion)
                </td>
                <td>EU (eu-west-2)</td>
              </tr>
              <tr>
                <td>
                  <strong>Blockchain (Base)</strong>
                </td>
                <td>Public credential anchoring</td>
                <td>
                  Public credential anchors / DIDs only (
                  <strong>non-PII data only</strong>)
                </td>
                <td>Decentralised public network</td>
              </tr>
            </tbody>
          </table>
          <p>
            We may also disclose personal data to authorities or third parties
            where required by law, to enforce our agreements, or to protect the
            rights, safety and security of Humanos, our users or the public.
          </p>

          <h2 className="legal__h2">6. International data transfers</h2>
          <p>
            Our primary data storage is located in the{" "}
            <strong>European Union</strong> (AWS eu-west-3, Paris). Some
            subprocessors operate, in whole or in part, outside the EU/EEA:
          </p>
          <ul className="legal__list">
            <li>
              <strong>Stripe</strong> (United States) — operates under a PCI DSS
              Level 1 compliant channel.
            </li>
            <li>
              <strong>Firebase / Google Cloud</strong> (EU/US) — Google-managed
              infrastructure.
            </li>
          </ul>
          <p>
            Where personal data is transferred outside the EU/EEA, we rely on
            appropriate safeguards under the GDPR, such as the European
            Commission&rsquo;s <strong>Standard Contractual Clauses</strong> and
            the providers&rsquo; equivalent transfer mechanisms.
          </p>

          <h2 className="legal__h2">
            7. Blockchain anchoring — important notice
          </h2>
          <p>
            When verifiable credentials are issued, only{" "}
            <strong>
              cryptographic hashes and decentralised identifiers (DIDs)
            </strong>{" "}
            are anchored on a public blockchain (Base).{" "}
            <strong>No personal data is ever written on-chain.</strong> Because
            public blockchains are immutable, any anchored data (which contains
            no personal data by design) is permanent and cannot be deleted.
          </p>

          <h2 className="legal__h2">8. How we protect personal data</h2>
          <p>
            We apply technical and organisational measures appropriate to the
            risk, including:
          </p>
          <ul className="legal__list">
            <li>
              <strong>Encryption in transit:</strong> TLS 1.2+ on all
              connections, with no exceptions.
            </li>
            <li>
              <strong>Encryption at rest:</strong> AES-256 across primary data
              stores (Atlas native, AWS KMS, Stripe-managed).
            </li>
            <li>
              <strong>Access control:</strong> Role-based access control (RBAC),
              multi-factor authentication (MFA), VPN for administrative access,
              scoped API keys and rate limiting.
            </li>
            <li>
              <strong>Data minimisation:</strong> Only data required for service
              delivery is collected and shared.
            </li>
            <li>
              <strong>Audit trail:</strong> All access and modifications are
              logged and monitored centrally.
            </li>
            <li>
              <strong>Geographic containment:</strong> Primary storage in the
              EU.
            </li>
          </ul>
          <p>
            These measures are described in our Information Security Policy and
            Data Lifecycle documentation and are maintained under our ISO/IEC
            27001:2022 certified Information Security Management System.
          </p>

          <h2 className="legal__h2">9. How long we keep personal data</h2>
          <p>
            We retain personal data only while there is a continued and valid
            reason to do so — for the duration of your relationship with us and
            as required to provide the Service, comply with legal and regulatory
            obligations, resolve disputes and enforce our agreements.
          </p>
          <p>
            When data is no longer necessary, it is securely deleted from cloud
            storage, databases and backups using secure deletion protocols (such
            as cryptographic erasure or overwriting), or anonymised where
            appropriate. Backups are purged according to our backup retention
            schedule. Policy documentation and certain records are retained for
            at least six years where required.
          </p>

          <h2 className="legal__h2">10. Your rights</h2>
          <p>Subject to applicable law, you have the right to:</p>
          <ul className="legal__list">
            <li>
              <strong>Be informed</strong> about how your personal data is used;
            </li>
            <li>
              <strong>Access</strong> the personal data we hold about you;
            </li>
            <li>
              <strong>Data portability</strong> — receive your data in a common,
              machine-readable format;
            </li>
            <li>
              <strong>Erasure</strong> (&ldquo;right to be forgotten&rdquo;);
            </li>
            <li>
              <strong>Rectification</strong> of inaccurate or incomplete data;
            </li>
            <li>
              <strong>Object</strong> to processing and to lodge complaints;
            </li>
            <li>
              <strong>Restrict</strong> processing;
            </li>
            <li>
              Not be subject to solely{" "}
              <strong>automated decision-making</strong>, including profiling,
              that produces legal or similarly significant effects without human
              involvement;
            </li>
            <li>
              <strong>Non-discrimination</strong> for exercising your rights.
            </li>
          </ul>
          <p>
            To exercise these rights, contact us at{" "}
            <a className="legal__link" href="mailto:privacy@humanos.tech">
              privacy@humanos.tech
            </a>
            . We will authenticate your request and respond within the
            timeframes required by law (generally within one month under the
            GDPR). Deletion may be limited where retention is necessary to
            comply with legal obligations, resolve disputes, enforce agreements
            or where it would disrupt an active contracted service.
          </p>
          <p>
            You also have the right to lodge a complaint with the Portuguese
            supervisory authority, the{" "}
            <strong>Comissão Nacional de Proteção de Dados (CNPD)</strong>, or
            with the supervisory authority of your country of residence.
          </p>

          <h2 className="legal__h2">11. Children</h2>
          <p>
            The Service is not directed to children below the age required to
            provide valid consent under applicable law, and we do not knowingly
            collect their personal data without appropriate authorisation.
          </p>

          <h2 className="legal__h2">12. Changes to this Privacy Statement</h2>
          <p>
            We may update this Privacy Statement from time to time. The latest
            version will always be available at this URL, with the effective
            date shown above. Material changes will be communicated through the
            Service or by other appropriate means.
          </p>

          <h2 className="legal__h2">13. Contact us</h2>
          <ul className="legal__list">
            <li>
              <strong>Privacy / data protection:</strong>{" "}
              <a className="legal__link" href="mailto:privacy@humanos.tech">
                privacy@humanos.tech
              </a>
            </li>
            <li>
              <strong>Data Protection Officer (DPO):</strong>{" "}
              <a className="legal__link" href="mailto:dpo@humanos.tech">
                dpo@humanos.tech
              </a>
            </li>
            <li>
              <strong>Controller:</strong> Humanos Labs Inc. (trading as
              Humanos), Portugal
            </li>
          </ul>

          <p className="legal__note">
            See also our{" "}
            <Link className="legal__link" href="/legal/terms">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link className="legal__link" href="/legal/cookies">
              Cookie policy
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
