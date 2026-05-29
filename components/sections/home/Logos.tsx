type LogoCell = {
  tag: string;
  /** Customer display name (used as alt text + fallback when no src). */
  name: React.ReactNode;
  /** Optional path to the customer logo image. When present, replaces the text. */
  src?: string;
  nameClass: string;
  desc: string;
  href?: string;
};

const CELLS: LogoCell[] = [
  {
    tag: "Professional services",
    name: "PwC",
    src: "/assets/logos/pwc.png",
    nameClass: "logos__name--pwc",
    desc: "Big Four · audit & assurance",
  },
  {
    tag: "Insurance · global",
    name: "Fidelidade",
    src: "/assets/logos/fidelidade.png",
    nameClass: "logos__name--fidelidade",
    desc: "7M customers · 14 countries",
    href: "https://www.fidelidade.pt/en",
  },
  {
    tag: "Healthcare",
    name: "Lusíadas",
    src: "/assets/logos/lusiadas.svg",
    nameClass: "logos__name--lusiadas",
    desc: "National private hospital network",
    href: "https://www.lusiadas.pt/en",
  },
  {
    tag: "Diagnostics",
    name: "Joaquim Chaves",
    src: "/assets/logos/joaquim_chaves.svg",
    nameClass: "logos__name--jcs",
    desc: "Millions of exams / year",
    href: "https://jcs.pt/en",
  },
  {
    tag: "Banking",
    name: "numo",
    src: "/assets/logos/numo.png",
    nameClass: "logos__name--numo",
    desc: "Regulated payment rails",
    href: "https://usenumo.com/",
  },
  {
    tag: "Healthtech",
    name: "Bloodflow",
    src: "/assets/logos/bloodflow.png",
    nameClass: "logos__name--bloodflow",
    desc: "Vascular care decisions",
    href: "https://www.bloodflow.eu/",
  },
  {
    tag: "Clinical software",
    name: "medify",
    src: "/assets/logos/medify.png",
    nameClass: "logos__name--medify",
    desc: "Prescriptions & referrals",
    href: "https://medify.eu/",
  },
  {
    tag: "Safety-critical",
    name: "Critical Software",
    src: "/assets/logos/critical_software.jpg",
    nameClass: "logos__name--critical",
    desc: "Aerospace · defense · rail",
  },
  {
    tag: "Healthcare tech",
    name: "Glintt",
    src: "/assets/logos/glintt.svg",
    nameClass: "logos__name--glintt",
    desc: "Hospitals & pharmacies, EU-wide",
  },
  {
    tag: "Cybersecurity",
    name: "Ciberbit",
    src: "/assets/logos/ciberbit.png",
    nameClass: "logos__name--ciberbit",
    desc: "Privileged access · incident response",
  },
  {
    tag: "Industrial ops",
    name: "Extraflow",
    nameClass: "logos__name--extraflow",
    desc: "Shop-floor sign-offs at scale",
  },
  {
    tag: "Operations",
    name: "Ralio",
    src: "/assets/logos/ralio.png",
    nameClass: "logos__name--ralio",
    desc: "Audit-grade approval workflows",
  },
  {
    tag: "Regulated AI · UK",
    name: "DataWhisper",
    src: "/assets/logos/data_whisper.webp",
    nameClass: "logos__name--ralio",
    desc: "Multi-Agent AI Operating System",
    href: "https://www.datawhisper.co.uk",
  },
];

function Cell({ cell }: { cell: LogoCell }) {
  const inner = (
    <>
      <span className="logos__tag">{cell.tag}</span>
      {cell.src ? (
        <img
          className="logos__img"
          src={cell.src}
          alt={typeof cell.name === "string" ? cell.name : ""}
          loading="lazy"
        />
      ) : (
        <span className={`logos__name ${cell.nameClass}`}>{cell.name}</span>
      )}
      <span className="logos__desc">{cell.desc}</span>
    </>
  );

  if (cell.href) {
    return (
      <a
        className="logos__cell"
        href={cell.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }
  return <div className="logos__cell">{inner}</div>;
}

function Track() {
  return (
    <div className="logos__track-inner">
      {CELLS.map((c, i) => (
        <Cell key={`${c.tag}-${i}`} cell={c} />
      ))}
    </div>
  );
}

export function Logos() {
  return (
    <section className="logos">
      <div className="wrap">
        <div className="logos__caption">
          Loved by startups and companies with billions in revenue
        </div>
      </div>
      <div className="logos__marquee" aria-label="Customers">
        <div className="logos__track">
          <Track />
          <Track />
        </div>
      </div>
    </section>
  );
}
