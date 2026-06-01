import { TalkWithUs } from "@/components/dialogs/TalkWithUs";
import { RuntimeFlow } from "./RuntimeFlow";

type CompatItem = {
  label: string;
  /** Shorter label rendered on mobile in place of `label`. */
  mobileLabel?: string;
  href: string;
  logo: React.ReactNode;
};

const COMPAT_ITEMS: CompatItem[] = [
  {
    label: "Visa Intelligent Commerce Connect",
    mobileLabel: "Visa ICC",
    href: "https://corporate.visa.com/en/sites/visa-perspectives/newsroom/visa-intelligent-commerce-connect-ai-shopping-for-businesses.html",
    logo: (
      <svg className="hero__compat-logo" viewBox="0 0 32 20" aria-hidden="true">
        <rect width="32" height="20" rx="3" fill="#1A1F71" />
        <path
          d="M14.2 13.6h-1.7l1.06-6.5h1.7l-1.06 6.5zm6.7-6.34a4.2 4.2 0 0 0-1.52-.27c-1.67 0-2.85.86-2.86 2.1-.01.91.85 1.42 1.5 1.72.66.31.89.5.88.78 0 .42-.52.62-1 .62-.66 0-1.02-.1-1.57-.33l-.21-.1-.23 1.4c.4.18 1.13.33 1.9.34 1.78 0 2.93-.85 2.95-2.16.01-.72-.45-1.27-1.43-1.72-.6-.3-.96-.49-.96-.79 0-.27.31-.55.97-.55a3 3 0 0 1 1.27.24l.15.07.22-1.35zm4.4-.16h-1.32c-.4 0-.71.11-.89.52l-2.54 5.98h1.78l.36-.95h2.18l.2.95h1.57L24.3 7.1zm-2.1 4.21c.13-.34.66-1.7.66-1.7l.18-.5.1.45.39 1.75h-1.33zM10.45 7.1l-1.65 4.43-.18-.86c-.31-1-1.27-2.07-2.34-2.6l1.5 5.52h1.8l2.68-6.5h-1.8z"
          fill="#fff"
        />
        <path
          d="M7.16 7.1H4.42l-.03.13c2.13.51 3.54 1.74 4.13 3.22L7.91 7.6c-.1-.4-.4-.5-.75-.5z"
          fill="#F7B600"
        />
      </svg>
    ),
  },
  {
    label: "x402",
    href: "https://www.x402.org/",
    logo: (
      <svg className="hero__compat-logo" viewBox="0 0 20 20" aria-hidden="true">
        <rect width="20" height="20" rx="4" fill="#0052FF" />
        <text
          x="10"
          y="13.5"
          textAnchor="middle"
          fontFamily="ui-monospace, Menlo, monospace"
          fontSize="7"
          fontWeight="700"
          fill="#fff"
          letterSpacing="-0.3"
        >
          x402
        </text>
      </svg>
    ),
  },
  {
    label: "EU Digital Identity Wallet",
    mobileLabel: "EU Wallet",
    href: "https://ec.europa.eu/digital-building-blocks/sites/spaces/EUDIGITALIDENTITYWALLET/pages/694487738/EU+Digital+Identity+Wallet+Home",
    logo: (
      <svg className="hero__compat-logo" viewBox="0 0 20 20" aria-hidden="true">
        <rect width="20" height="20" rx="4" fill="#003399" />
        <g fill="#FFCC00">
          <circle cx="10" cy="4.6" r="0.55" />
          <circle cx="13.05" cy="5.42" r="0.55" />
          <circle cx="15.28" cy="7.65" r="0.55" />
          <circle cx="16.1" cy="10.7" r="0.55" />
          <circle cx="15.28" cy="13.75" r="0.55" />
          <circle cx="13.05" cy="15.98" r="0.55" />
          <circle cx="10" cy="16.8" r="0.55" />
          <circle cx="6.95" cy="15.98" r="0.55" />
          <circle cx="4.72" cy="13.75" r="0.55" />
          <circle cx="3.9" cy="10.7" r="0.55" />
          <circle cx="4.72" cy="7.65" r="0.55" />
          <circle cx="6.95" cy="5.42" r="0.55" />
        </g>
      </svg>
    ),
  },
  {
    label: "Mastercard Verifiable Intent",
    mobileLabel: "Mastercard VI",
    href: "https://verifiableintent.dev/",
    logo: (
      <svg className="hero__compat-logo" viewBox="0 0 32 20" aria-hidden="true">
        <circle cx="12" cy="10" r="8" fill="#EB001B" />
        <circle cx="20" cy="10" r="8" fill="#F79E1B" />
        <path
          d="M16 4.2a7.98 7.98 0 0 1 0 11.6 7.98 7.98 0 0 1 0-11.6z"
          fill="#FF5F00"
        />
      </svg>
    ),
  },
  {
    label: "Google AP2",
    href: "https://github.com/google-agentic-commerce/AP2",
    logo: (
      <svg className="hero__compat-logo" viewBox="0 0 20 20" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M19.6 10.23c0-.7-.06-1.36-.18-2H10v3.78h5.39c-.23 1.25-.94 2.3-2 3.01v2.5h3.23c1.89-1.74 2.98-4.3 2.98-7.3z"
        />
        <path
          fill="#34A853"
          d="M10 20c2.7 0 4.96-.9 6.62-2.43l-3.23-2.5c-.9.6-2.05.95-3.39.95-2.6 0-4.8-1.76-5.59-4.12H1.07v2.59A10 10 0 0 0 10 20z"
        />
        <path
          fill="#FBBC05"
          d="M4.41 11.9A5.99 5.99 0 0 1 4.1 10c0-.66.11-1.3.31-1.9V5.51H1.07A10 10 0 0 0 0 10c0 1.6.38 3.12 1.07 4.49l3.34-2.6z"
        />
        <path
          fill="#EA4335"
          d="M10 3.96c1.47 0 2.78.5 3.82 1.5l2.86-2.86A10 10 0 0 0 10 0 10 10 0 0 0 1.07 5.51L4.41 8.1C5.2 5.73 7.4 3.96 10 3.96z"
        />
      </svg>
    ),
  },
  {
    label: "Stripe Agentic Commerce",
    mobileLabel: "Stripe ACP",
    href: "https://www.agenticcommerce.dev/",
    logo: (
      <svg className="hero__compat-logo" viewBox="0 0 20 20" aria-hidden="true">
        <rect width="20" height="20" rx="4" fill="#635BFF" />
        <path
          fill="#fff"
          d="M9.3 7.68c0-.54.44-.75 1.17-.75 1.05 0 2.37.32 3.42.88V4.5a9.1 9.1 0 0 0-3.42-.63c-2.8 0-4.66 1.46-4.66 3.9 0 3.8 5.23 3.2 5.23 4.83 0 .64-.56.85-1.33.85-1.14 0-2.6-.47-3.76-1.1v3.35c1.28.55 2.58.78 3.76.78 2.87 0 4.84-1.42 4.84-3.88-.02-4.1-5.25-3.38-5.25-4.93z"
        />
      </svg>
    ),
  },
  {
    label: "Skills.md",
    href: "https://agentskills.io/",
    logo: (
      <svg className="hero__compat-logo" viewBox="0 0 20 20" aria-hidden="true">
        <rect width="20" height="20" rx="4" fill="#111111" />
        <path
          d="M4.5 6.5 h4 l1.2 1.4 h5.8 v6.4 a1.2 1.2 0 0 1-1.2 1.2 h-9.6 a1.2 1.2 0 0 1-1.2-1.2 V6.5 z"
          fill="none"
          stroke="#F4F3EF"
          strokeWidth="1.3"
        />
        <path
          d="M8.3 11.1 l2.2 1.4 l-2.2 1.4"
          fill="none"
          stroke="#F4F3EF"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "OAuth 2.0",
    href: "https://oauth.net/2/",
    logo: (
      <svg className="hero__compat-logo" viewBox="0 0 20 20" aria-hidden="true">
        <rect width="20" height="20" rx="4" fill="#000000" />
        <path
          d="M10 4.2 a5.8 5.8 0 1 0 5.8 5.8"
          fill="none"
          stroke="#F4F3EF"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle
          cx="10"
          cy="10"
          r="2.1"
          fill="none"
          stroke="#F4F3EF"
          strokeWidth="1.4"
        />
      </svg>
    ),
  },
];

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__grid-bg" />
      <div className="wrap hero__inner">
        <div className="hero__left">
          <div className="hero__eyebrow">
            <span className="dot" />
            <span>
              Portable Authorization &amp; Runtime Verification{" "}
              <span className="hero__eyebrow-suffix">for AI Systems</span>
            </span>
            <span className="sep">·</span>
            <span className="mono">api.humanos.tech</span>
          </div>

          <h1 id="hero-headline">
            AI can act.
            <br />
            Make sure it was <span className="underline">allowed to</span>.
          </h1>

          <p className="hero__sub" id="hero-sub">
            Allow systems to verify portable authorization before execution and
            recover missing approval in real time.{" "}
            <strong>
              Ensure AI only acts within approved limits and generate
              independently verifiable execution receipts afterwards.
            </strong>
          </p>

          <div className="hero__ctas">
            <a className="btn btn--primary" href="#">
              Get API key <span className="arrow">→</span>
            </a>
            <TalkWithUs>
              <button type="button" className="btn btn--ghost">
                Talk with us <span className="arrow">→</span>
              </button>
            </TalkWithUs>
          </div>

          <div className="hero__compat">
            <span className="hero__compat-label">Compatible with</span>
            {COMPAT_ITEMS.map((item, i) => (
              <span key={item.label} style={{ display: "contents" }}>
                <a
                  className="hero__compat-item"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.logo}
                  <span className="hero__compat-name">
                    {item.mobileLabel && (
                      <span className="hero__compat-name-short">
                        {item.mobileLabel}
                      </span>
                    )}
                    <span className="hero__compat-name-full">{item.label}</span>
                  </span>
                </a>
                {i < COMPAT_ITEMS.length && (
                  <span className="hero__compat-sep">·</span>
                )}
              </span>
            ))}
            <span className="hero__compat-item hero__compat-more">
              and more…
            </span>
          </div>
        </div>

        <div className="hero__right">
          <RuntimeFlow />
        </div>
      </div>
    </section>
  );
}
