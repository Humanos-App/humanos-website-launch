type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

const COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Mandates", href: "#" },
      { label: "Requests", href: "#" },
      { label: "Execution Receipts", href: "#" },
      { label: "Verification", href: "#" },
      { label: "Intelligence", href: "#" },
      { label: "Mandate Console", href: "#" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Quickstart", href: "#" },
      { label: "Reference", href: "#" },
      { label: "SDKs", href: "#" },
      { label: "VIA Protocol", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Use cases",
    links: [
      { label: "Agentic finance", href: "#" },
      { label: "Treasury", href: "#" },
      { label: "Trading", href: "#" },
      { label: "Healthcare", href: "#" },
      { label: "Agent delegation", href: "#" },
      { label: "Multi-party approval", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Customers", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Security", href: "#" },
      { label: "Compliance", href: "#" },
      { label: "Status", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "DPA", href: "#" },
    ],
  },
];

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
            <div className="footer__api">api.humanos.tech</div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="footer__col">
              <div className="footer__col-title">{col.title}</div>
              {col.links.map((l) => (
                <a key={l.label} href={l.href}>
                  {l.label}
                </a>
              ))}
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
