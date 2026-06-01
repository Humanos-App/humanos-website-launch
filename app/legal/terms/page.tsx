import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for the Humanos digital identity and verifiable credentials platform, operated by Unicorn Dimension, Lda.",
  alternates: { canonical: "/legal/terms" },
};

const LAST_UPDATED = "2026-06-01";

export default function TermsPage() {
  return (
    <main className="legal">
      <div className="wrap">
        <div className="legal__inner">
          <p className="legal__eyebrow">
            Terms of Service · v1.0 · effective {LAST_UPDATED}
          </p>
          <h1 className="legal__title">Terms of Service</h1>

          <p className="legal__lede">
            <strong>Humanos</strong> — operated by{" "}
            <strong>Unicorn Dimension, Lda</strong>. These Terms govern your
            access to and use of the Humanos digital identity and
            verifiable credentials platform, including our websites,
            applications, public API and related services.
          </p>

          <h2 className="legal__h2">1. Introduction and acceptance</h2>
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access
            to and use of the <strong>Humanos</strong> digital identity and
            verifiable credentials platform, including our websites,
            applications, public API and related services (together, the
            &ldquo;Service&rdquo;), operated by{" "}
            <strong>Unicorn Dimension, Lda</strong>, trading as{" "}
            <strong>Humanos</strong> (&ldquo;Humanos&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;, &ldquo;our&rdquo;).
          </p>
          <p>
            By creating an account, accessing or using the Service, you
            agree to be bound by these Terms and by our{" "}
            <Link className="legal__link" href="/legal/privacy">
              Privacy Statement
            </Link>
            , which is incorporated by reference. If you do not agree, you
            must not use the Service. If you use the Service on behalf of
            an organisation, you represent that you have authority to bind
            that organisation to these Terms.
          </p>

          <h2 className="legal__h2">2. Definitions</h2>
          <ul className="legal__list">
            <li>
              <strong>&ldquo;User&rdquo;</strong> — any individual or entity
              that accesses or uses the Service.
            </li>
            <li>
              <strong>&ldquo;Customer&rdquo;</strong> — an organisation that
              contracts with Humanos to use the platform, including to
              verify or manage the identities of its own end users.
            </li>
            <li>
              <strong>&ldquo;Verifiable Credential&rdquo;</strong> — a
              digitally signed, cryptographically verifiable attestation
              issued or managed through the Service.
            </li>
            <li>
              <strong>&ldquo;DID&rdquo;</strong> — a decentralised
              identifier associated with a credential.
            </li>
            <li>
              <strong>&ldquo;Authorized Agent&rdquo;</strong> — a person,
              partner or system authorised to access the Service (including
              via the public API) under a mandate or scoped permission,
              acting on behalf of a User or Customer.
            </li>
            <li>
              <strong>&ldquo;Content&rdquo;</strong> — any data, documents,
              files or information you submit to the Service.
            </li>
          </ul>

          <h2 className="legal__h2">3. Eligibility and accounts</h2>
          <p>
            To use the Service you must be of the age required to enter
            into a binding contract under applicable law and capable of
            forming a legally binding agreement. You agree to:
          </p>
          <ul className="legal__list">
            <li>
              provide accurate, current and complete information during
              registration and identity verification;
            </li>
            <li>
              keep your credentials and authentication factors confidential;
            </li>
            <li>
              enable and maintain multi-factor authentication where offered;
            </li>
            <li>
              be responsible for all activity occurring under your account;
              and
            </li>
            <li>
              notify us promptly at{" "}
              <a className="legal__link" href="mailto:security@humanos.tech">
                security@humanos.tech
              </a>{" "}
              of any unauthorised use or security incident.
            </li>
          </ul>
          <p>
            We may suspend or terminate accounts that contain false
            information, are used in breach of these Terms, or that pose a
            security or legal risk.
          </p>

          <h2 className="legal__h2">4. The Service</h2>
          <p>
            Humanos provides a platform for digital identity and verifiable
            credentials, which may include identity verification (KYC),
            issuance and management of verifiable credentials and
            decentralised identifiers (DIDs), secure document storage, and
            anchoring of cryptographic credential references on a public
            blockchain. Specific features available to you depend on your
            account type and any separate agreement (such as an order form,
            subscription or Data Processing Agreement) between you and
            Humanos.
          </p>
          <p>
            We may modify, enhance or discontinue features of the Service.
            We will use reasonable efforts to give notice of material
            changes that adversely affect your use.
          </p>

          <h2 className="legal__h2">
            5. Identity verification and verifiable credentials
          </h2>
          <p>
            Where the Service includes identity verification, you agree
            that:
          </p>
          <ul className="legal__list">
            <li>
              identity documents and biometric/facial images you submit
              will be processed through our verification provider for the
              purpose of verifying your identity;
            </li>
            <li>
              you will only submit documents and information that are
              genuine, lawful and relate to you (or to a person you are
              authorised to represent);
            </li>
            <li>
              verifiable credentials issued through the Service are
              cryptographically signed attestations, and their validity may
              depend on the issuer, the verification performed and the
              integrity of the underlying data.
            </li>
          </ul>
          <p>
            You acknowledge that, when credentials are anchored on a public
            blockchain,{" "}
            <strong>
              only cryptographic hashes and DIDs are written on-chain and no
              personal data is stored on-chain
            </strong>
            . Because public blockchains are immutable, anchored references
            are permanent and cannot be deleted or modified.
          </p>

          <h2 className="legal__h2">
            6. Authorized Agents, mandates and the public API
          </h2>
          <p>
            The Service may allow access by Authorized Agents and partners
            through the public API or through a delegated mandate (where a
            User or Customer authorises another party or system to act on
            their behalf). If you grant or operate under such a mandate, you
            agree that:
          </p>
          <ul className="legal__list">
            <li>
              access must remain within the scope of the permissions or
              mandate granted;
            </li>
            <li>
              API access is authenticated and subject to API key
              authentication, role-based access control (RBAC), rate
              limiting and IP restrictions;
            </li>
            <li>
              you are responsible for actions taken under your API keys or
              delegated mandate, and for revoking access that is no longer
              required;
            </li>
            <li>
              you will not exceed, circumvent or attempt to escalate the
              permissions granted; and
            </li>
            <li>
              mandates may be time-limited, scoped and revocable, and we
              may enforce these limits technically.
            </li>
          </ul>
          <p>
            We may suspend API or mandate access that exceeds its scope,
            threatens security or integrity, or breaches these Terms.
          </p>

          <h2 className="legal__h2">7. Acceptable use</h2>
          <p>
            You agree <strong>not</strong> to:
          </p>
          <ul className="legal__list">
            <li>
              use the Service for any unlawful, fraudulent or harmful
              purpose, or to submit forged, stolen or misrepresented identity
              information;
            </li>
            <li>
              impersonate any person or entity, or misrepresent your
              authority or affiliation;
            </li>
            <li>
              attempt to gain unauthorised access to the Service, other
              accounts, or our systems or networks;
            </li>
            <li>
              probe, scan, disrupt or test the vulnerability of the Service
              without our prior written authorisation;
            </li>
            <li>
              interfere with or circumvent security, authentication, rate
              limiting or access controls;
            </li>
            <li>
              reverse engineer, decompile or extract source code, except to
              the extent permitted by law;
            </li>
            <li>
              introduce malware or use the Service to distribute unlawful or
              infringing content;
            </li>
            <li>
              scrape, harvest or collect data from the Service other than
              through permitted interfaces; or
            </li>
            <li>
              use the Service in a way that infringes the intellectual
              property, privacy or other rights of others.
            </li>
          </ul>
          <p>
            These obligations reflect our Acceptable Usage Policy.
            Violations may result in suspension or termination and may be
            reported to the relevant authorities.
          </p>

          <h2 className="legal__h2">8. Your Content and data</h2>
          <p>
            You retain all rights in the Content you submit. You grant
            Humanos a limited licence to host, process, transmit and store
            your Content solely as necessary to provide and secure the
            Service and as described in the{" "}
            <Link className="legal__link" href="/legal/privacy">
              Privacy Statement
            </Link>
            .
          </p>
          <p>
            You represent that you have all rights and, where required,
            consents necessary to submit your Content and to have it
            processed through the Service. Where Humanos processes personal
            data on behalf of a Customer, the Customer is the data
            controller and processing is governed by the applicable Data
            Processing Agreement.
          </p>
          <p>
            Personal data is handled in accordance with our Privacy
            Statement, Data Protection Policy and Data Retention Policy.
          </p>

          <h2 className="legal__h2">9. Fees and payment</h2>
          <p>
            Where the Service or specific features are paid, fees, billing
            cycles and terms will be set out in an applicable order form,
            subscription plan or separate agreement. Payments are processed
            by our third-party payment processor (Stripe);{" "}
            <strong>
              card details are transmitted directly to the payment
              processor and do not pass through Humanos servers
            </strong>
            . Unless otherwise stated, fees are exclusive of applicable
            taxes, which are your responsibility. Late or failed payment may
            result in suspension of the Service.
          </p>

          <h2 className="legal__h2">10. Intellectual property</h2>
          <p>
            The Service, including its software, design, text, graphics,
            trademarks and all related intellectual property, is owned by
            Humanos (Unicorn Dimension, Lda) or its licensors and is
            protected by law. Except for the rights expressly granted to
            you to use the Service, no rights are transferred.
            &ldquo;Humanos&rdquo; and associated logos are our trademarks
            and may not be used without our prior written consent.
          </p>

          <h2 className="legal__h2">11. Third-party services</h2>
          <p>
            The Service relies on, and may integrate with, third-party
            providers (for example, our database, storage, authentication,
            payment, identity verification and OCR providers). Your use of
            such integrations may also be subject to the third parties&rsquo;
            own terms. We are not responsible for third-party services
            outside our control, but we contract with subprocessors under
            appropriate data protection terms as described in the Privacy
            Statement.
          </p>

          <h2 className="legal__h2">12. Service availability and security</h2>
          <p>
            We use commercially reasonable efforts to keep the Service
            available and secure, including the technical and organisational
            measures described in our Information Security Policy and
            maintained under our ISO/IEC 27001:2022 certified Information
            Security Management System. However, the Service is provided on
            an &ldquo;as available&rdquo; basis and we do not guarantee
            uninterrupted or error-free operation. We may perform
            maintenance and may impose limits to protect the integrity and
            security of the Service.
          </p>

          <h2 className="legal__h2">13. Suspension and termination</h2>
          <p>
            You may stop using the Service and close your account at any
            time. We may suspend or terminate your access, with or without
            notice, if you breach these Terms, if required by law, or to
            protect the Service, other users or third parties.
          </p>
          <p>
            Upon termination, your right to use the Service ceases. We will
            handle any remaining personal data in accordance with our Data
            Retention Policy, including secure deletion or anonymisation
            where applicable, subject to legal retention obligations.
            Provisions that by their nature should survive termination
            (including intellectual property, disclaimers, limitation of
            liability and governing law) will survive.
          </p>

          <h2 className="legal__h2">14. Disclaimers</h2>
          <p>
            To the maximum extent permitted by law, the Service is provided{" "}
            <strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong>{" "}
            without warranties of any kind, whether express or implied,
            including warranties of merchantability, fitness for a
            particular purpose and non-infringement. We do not warrant that
            the Service will meet your requirements, be uninterrupted,
            secure or error-free, or that any verification result or
            credential will be accepted by any third party.
          </p>

          <h2 className="legal__h2">15. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, Humanos and its
            officers, employees and agents will not be liable for any
            indirect, incidental, special, consequential or punitive
            damages, or for any loss of profits, revenue, data or goodwill,
            arising out of or relating to your use of (or inability to use)
            the Service. Our total aggregate liability arising out of or
            relating to the Service will not exceed the amounts you paid to
            us for the Service in the twelve (12) months preceding the
            event giving rise to the liability, or, where no fees were
            paid, EUR 100.
          </p>
          <p>
            Nothing in these Terms excludes or limits liability that cannot
            be excluded or limited under applicable law (including
            liability for fraud, gross negligence, or death or personal
            injury caused by negligence).
          </p>

          <h2 className="legal__h2">16. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Humanos from and
            against any claims, damages, liabilities and reasonable
            expenses (including legal fees) arising from your breach of
            these Terms, your misuse of the Service, your Content, or your
            violation of any law or third-party rights.
          </p>

          <h2 className="legal__h2">17. Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. The latest version
            will be available at this URL, with the effective date shown
            above. Material changes will be communicated through the
            Service or by other appropriate means. Your continued use of
            the Service after changes take effect constitutes acceptance of
            the updated Terms.
          </p>

          <h2 className="legal__h2">18. Governing law and jurisdiction</h2>
          <p>
            These Terms are governed by the laws of{" "}
            <strong>Portugal</strong>, without regard to conflict-of-law
            rules. Subject to any mandatory consumer protection rights, the
            courts of <strong>Portugal</strong> (Comarca de Lisboa) will
            have exclusive jurisdiction over any dispute arising out of or
            relating to these Terms or the Service. The application of the
            United Nations Convention on Contracts for the International
            Sale of Goods is excluded.
          </p>

          <h2 className="legal__h2">19. General</h2>
          <ul className="legal__list">
            <li>
              <strong>Entire agreement:</strong> These Terms, together with
              the Privacy Statement and any applicable order form,
              subscription or Data Processing Agreement, constitute the
              entire agreement between you and Humanos regarding the
              Service.
            </li>
            <li>
              <strong>Severability:</strong> If any provision is held
              invalid or unenforceable, the remaining provisions remain in
              full force.
            </li>
            <li>
              <strong>No waiver:</strong> Our failure to enforce any
              provision is not a waiver of that provision.
            </li>
            <li>
              <strong>Assignment:</strong> You may not assign these Terms
              without our prior written consent; we may assign them in
              connection with a merger, acquisition or transfer of assets.
            </li>
            <li>
              <strong>Notices:</strong> We may provide notices through the
              Service or to the contact details associated with your
              account.
            </li>
          </ul>

          <h2 className="legal__h2">20. Contact</h2>
          <ul className="legal__list">
            <li>
              <strong>General / legal:</strong>{" "}
              <a className="legal__link" href="mailto:legal@humanos.tech">
                legal@humanos.tech
              </a>
            </li>
            <li>
              <strong>Security incidents:</strong>{" "}
              <a className="legal__link" href="mailto:security@humanos.tech">
                security@humanos.tech
              </a>
            </li>
            <li>
              <strong>Privacy / data protection:</strong>{" "}
              <a className="legal__link" href="mailto:privacy@humanos.tech">
                privacy@humanos.tech
              </a>
            </li>
            <li>
              <strong>Provider:</strong> Unicorn Dimension, Lda (trading as
              Humanos), Portugal
            </li>
          </ul>

          <p className="legal__note">
            See also our{" "}
            <Link className="legal__link" href="/legal/privacy">
              Privacy Statement
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
