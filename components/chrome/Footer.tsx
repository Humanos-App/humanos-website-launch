import { EXTERNAL_LINKS } from "@/lib/external-links";

type FooterLink = { label: string; href: string };
type FooterColumn = {
  title: string;
  links: FooterLink[];
};

/* Deep links into docs.humanos.id used in multiple footer columns. Kept
   in one place so we can flip the API version when it bumps. */
const DOCS = {
  root: EXTERNAL_LINKS.docs,
  quickstart: `${EXTERNAL_LINKS.docs}/essentials/quick-start`,
  webhooks: `${EXTERNAL_LINKS.docs}/essentials/webhooks-intro`,
  verifyVp: `${EXTERNAL_LINKS.docs}/api-reference/2026-05-17/credentials/verify-vp`,
  createRequest: `${EXTERNAL_LINKS.docs}/api-reference/2026-05-17/requests/create-request`,
  revokeCredential: `${EXTERNAL_LINKS.docs}/api-reference/2026-05-17/credentials/revoke-credential`,
};

const SDKS = {
  ts: "https://www.npmjs.com/package/humanos",
  py: "https://pypi.org/project/humanos/",
  cs: "https://www.nuget.org/packages/Humanos",
};

const COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Pricing", href: "/pricing" },
      { label: "humanos.verify()", href: DOCS.verifyVp },
      { label: "Request approvals", href: DOCS.createRequest },
      { label: "Revocation", href: DOCS.revokeCredential },
      { label: "Webhooks", href: DOCS.webhooks },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Quickstart", href: DOCS.quickstart },
      { label: "API reference", href: DOCS.root },
      { label: "TypeScript SDK", href: SDKS.ts },
      { label: "Python SDK", href: SDKS.py },
      { label: "C# SDK", href: SDKS.cs },
      { label: "Get API keys", href: EXTERNAL_LINKS.app },
    ],
  },
  {
    title: "Customers",
    links: [
      { label: "All stories", href: "/case-studies" },
      { label: "Numo — treasury", href: "/case-studies/numo" },
      { label: "Ralio — procurement", href: "/case-studies/ralio" },
      { label: "Paymove — agentic payments", href: "/case-studies/paymove" },
      { label: "Lusíadas — healthcare", href: "/case-studies/lusiadas" },
      { label: "DataWhisper — multi-agent AI", href: "/case-studies/datawhisper" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company" },
      { label: "Customers", href: "/case-studies" },
      { label: "Trust", href: "/trust" },
      { label: "Talk with us", href: EXTERNAL_LINKS.calendly },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Trust overview", href: "/trust" },
      { label: "Why verify", href: "/trust#before" },
      { label: "Independent verification", href: "/trust#verify" },
      { label: "VIA Protocol", href: "/trust#via" },
      { label: "Open standards", href: "/trust#standards" },
      { label: "Regulated systems", href: "/trust#regulated" },
    ],
  },
];

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__brand-mark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logo-mark-white.svg" alt="Humanos" />
              <span className="footer__brand-text">Humanos</span>
            </div>
            <div className="footer__tagline">
              Human intent, programmable and portable. The authorization layer
              for the agentic economy.
            </div>
            <a
              className="footer__api"
              href={EXTERNAL_LINKS.docs}
              target="_blank"
              rel="noopener noreferrer"
            >
              api.humanos.tech
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="footer__col">
              <div className="footer__col-title">{col.title}</div>
              {col.links.map((l) => {
                if (isExternal(l.href)) {
                  return (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.label}
                    </a>
                  );
                }
                return (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                );
              })}
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <div className="footer__bottom-left">
            © 2026 Humanos · All decisions verifiable
          </div>
          <div className="footer__bottom-right">
            <span>SOC 2 Type II</span>
            <span>·</span>
            <span>ISO 27001</span>
            <span>·</span>
            <span>W3C VC 2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
