const BLOCKS = [
  {
    num: "Step 01",
    title: "Define",
    desc: "Issue authorization with rules and constraints.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="4" y="5" width="20" height="18" rx="2.5" />
        <path d="M8 10h12M8 14h12M8 18h7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "Step 02",
    title: "Verify",
    desc: "Check authorization before execution.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14 3l9 4v6c0 5.5-3.8 9.8-9 11-5.2-1.2-9-5.5-9-11V7l9-4z" />
        <path d="M10 14l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "Step 03",
    title: "Prove",
    desc: "Generate independently verifiable evidence afterwards.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M7 4h11l4 4v16H7z" strokeLinejoin="round" />
        <path d="M17 4v5h5" strokeLinejoin="round" />
        <circle cx="13" cy="16" r="3" />
        <path d="M13 19v3l-1.5-1-1.5 1v-3" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section className="uc-sec uc-how">
      <div className="uc-how__grid" aria-hidden="true" />
      <div className="wrap">
        <div className="uc-sec__head">
          <div className="uc-eyebrow">
            <span className="uc-eyebrow__dot" />
            How it works
          </div>
          <h2 className="uc-sec__title">Define. Verify. Prove.</h2>
          <p className="uc-sec__sub uc-sec__sub--center">
            Authorization moves through three stages — continuously, on every
            action.
          </p>
        </div>

        <div className="uc-how__track">
          <div className="uc-how__line" aria-hidden="true" />
          {BLOCKS.map((b) => (
            <div className="uc-how__block" key={b.title}>
              <div className="uc-how__badge">{b.icon}</div>
              <div className="uc-how__num">{b.num}</div>
              <div className="uc-how__title">{b.title}</div>
              <p className="uc-how__desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
