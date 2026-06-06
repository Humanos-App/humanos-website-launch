/**
 * Site-wide announcement bar that sits above the navbar. Links to the
 * Mastercard For Fintechs 2026 press release. Static markup — no
 * client JS, no dismiss state (intentionally persistent for now).
 */
export function AnnouncementBanner() {
  return (
    <a
      className="announce"
      href="https://www.mastercard.com/news/europe/es-es/noticias/notas-de-prensa/es-es/2026/stamp-y-humanos-ganadoras-de-mastercard-for-fintechs-iberia-2026/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="announce__inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="announce__mark"
          src="/assets/logos/mastercard.png"
          alt=""
          width="28"
          height="17"
        />
        <span className="announce__text">
          Humanos wins <strong>Mastercard For Fintechs 2026</strong>{" "}
          competition
        </span>
        <span className="announce__arrow" aria-hidden="true">
          →
        </span>
      </span>
    </a>
  );
}
