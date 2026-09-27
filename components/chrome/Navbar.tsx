"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/lib/nav-links";
import { ROUTES } from "@/lib/routes";
import { isDarkRoute } from "@/lib/chrome-theme";
import { EXTERNAL_LINKS } from "@/lib/external-links";
import { TalkWithUs } from "@/components/dialogs/TalkWithUs";
import type { MegaItem, MegaMenu } from "@/lib/mega-menus";

function Chevron() {
  return (
    <svg className="chev" viewBox="0 0 10 10">
      <path
        d="M2 4l3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Line icons for compact menu items (Solutions). */
function MegaIcon({ name }: { name: NonNullable<MegaItem["icon"]> }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "measure")
    return (
      <svg {...common}>
        <path d="M4 17a8 8 0 1 1 16 0" />
        <path d="M12 17l4-5" />
        <circle cx="12" cy="17" r="1.2" />
      </svg>
    );
  if (name === "control")
    return (
      <svg {...common}>
        <path d="M12 3l7 3v5c0 4.4-3 8.3-7 9.5C8 19.3 5 15.4 5 11V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  );
}

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

function MegaItemLink({
  item,
  onClick,
}: {
  item: MegaItem;
  onClick?: () => void;
}) {
  const content = (
    <>
      {item.icon && (
        <span className="mega__item-icon" aria-hidden="true">
          <MegaIcon name={item.icon} />
        </span>
      )}
      <div className="mega__item-title">
        {item.title}
        {item.tag && (
          <span className="mega__item-tag">{item.tag}</span>
        )}
      </div>
      {item.sub && <div className="mega__item-sub">{item.sub}</div>}
    </>
  );
  /* Items that don't exist yet (tagged "Coming soon", href "#") render as
     plain text rather than a link that jumps to the top of the page. */
  if (!item.href || item.href === "#") {
    return (
      <div className="mega__item is-soon" aria-disabled="true">
        {content}
      </div>
    );
  }
  if (isExternal(item.href)) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mega__item"
        onClick={onClick}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={item.href} className="mega__item" onClick={onClick}>
      {content}
    </Link>
  );
}

function MegaPanel({
  menu,
  open,
  onNavigate,
}: {
  menu: MegaMenu;
  open: boolean;
  /* Closes the dropdown when an item is chosen. Without it the panel stays
     open over the page that was just navigated to. */
  onNavigate: () => void;
}) {
  if (menu.compact) {
    return (
      <div
        className={`mega mega--compact${open ? " is-open" : ""}`}
        data-mega-panel={menu.key}
      >
        {menu.columns.flatMap((col) => col.items ?? []).map((item) => (
          <MegaItemLink key={item.title} item={item} onClick={onNavigate} />
        ))}
      </div>
    );
  }
  return (
    <div className={`mega${open ? " is-open" : ""}`} data-mega-panel={menu.key}>
      <div
        className="mega__grid"
        style={{
          gridTemplateColumns: `repeat(${menu.columns.length}, minmax(0, 1fr))`,
        }}
      >
        {menu.columns.map((col) => (
          <div key={col.label}>
            <div className="mega__col-label">{col.label}</div>
            {col.items?.map((item) => (
              <MegaItemLink key={item.title} item={item} onClick={onNavigate} />
            ))}
            {col.groups?.map((group, gi) => (
              <div key={group.label ?? gi} className="mega__group">
                {group.label && (
                  <div className="mega__group-label">{group.label}</div>
                )}
                {group.items.map((item) => (
                  <MegaItemLink
                    key={item.title}
                    item={item}
                    onClick={onNavigate}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Navbar() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMegaOpen, setMobileMegaOpen] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  /* Close desktop mega on outside click / Escape. */
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target as Node)) setOpenKey(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenKey(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  /* Close the mobile drawer whenever the route changes. */
  useEffect(() => {
    setMobileOpen(false);
    setMobileMegaOpen(null);
  }, [pathname]);

  /* Lock background scroll while the mobile drawer is open. */
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileMegaOpen(null);
  };

  /* Dark chrome theme (styled via .site-chrome[data-theme]); only the
     logo asset itself has to switch here. */
  const dark = isDarkRoute(pathname);

  return (
    <>
      <header
        ref={headerRef}
        className="nav"
        onMouseLeave={() => setOpenKey(null)}
      >
        <div className="nav__inner">
          <Link className="nav__brand" href={ROUTES.home}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dark ? "/assets/logo-mark-white.svg" : "/assets/logo-mark-black.svg"}
              alt="Humanos"
            />
            <span className="nav__brand-text">Humanos</span>
          </Link>

          <nav className="nav__links">
            {NAV_LINKS.map((link) => {
              if (link.kind === "mega") {
                const trigger = (
                  <span
                    key={link.label}
                    className="nav__link"
                    onMouseEnter={() => setOpenKey(link.menu.key)}
                    onFocus={() => setOpenKey(link.menu.key)}
                    onClick={() =>
                      setOpenKey((prev) =>
                        prev === link.menu.key ? null : link.menu.key,
                      )
                    }
                    tabIndex={0}
                    role="button"
                    aria-expanded={openKey === link.menu.key}
                  >
                    {link.label}
                    <Chevron />
                  </span>
                );
                /* Compact menus drop down right under their own label. */
                if (link.menu.compact) {
                  return (
                    <div key={link.label} className="nav__item">
                      {trigger}
                      <MegaPanel
                        menu={link.menu}
                        open={openKey === link.menu.key}
                        onNavigate={() => setOpenKey(null)}
                      />
                    </div>
                  );
                }
                return trigger;
              }
              if (link.external) {
                return (
                  <a
                    key={link.label}
                    className="nav__link"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setOpenKey(null)}
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="nav__link"
                  onMouseEnter={() => setOpenKey(null)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="nav__cta-group">
            <TalkWithUs>
              <button
                type="button"
                className="btn btn--ghost btn--sm nav__cta nav__cta--talk"
              >
                Talk to us
              </button>
            </TalkWithUs>
            <a
              className="btn btn--primary btn--sm nav__cta nav__cta--login"
              href={EXTERNAL_LINKS.app}
              target="_blank"
              rel="noopener noreferrer"
            >
              Login
            </a>
            {/* Burger — hidden on desktop, visible on mobile via navbar.css */}
            <button
              type="button"
              className="nav__burger"
              aria-expanded={mobileOpen}
              aria-controls="nav-mobile"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span className="nav__burger-bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        {/* Desktop mega menus (full width; compact ones render in place) */}
        {NAV_LINKS.filter((l) => l.kind === "mega" && !l.menu.compact).map((link) =>
          link.kind === "mega" ? (
            <MegaPanel
              key={link.menu.key}
              menu={link.menu}
              open={openKey === link.menu.key}
              onNavigate={() => setOpenKey(null)}
            />
          ) : null,
        )}
      </header>

      {/* Mobile drawer — rendered OUTSIDE the <header>. The header has
          backdrop-filter set on it, which would make it the containing
          block for any position:fixed descendant (collapsing the drawer
          to 0 height). Keeping the drawer as a header sibling lets
          `position: fixed` resolve against the viewport. */}
      <div
        id="nav-mobile"
        className={`nav__mobile${mobileOpen ? " is-open" : ""}`}
        aria-hidden={!mobileOpen}
        /* inert removes the off-screen menu's links from the tab order and
           a11y tree while closed — fixes the aria-hidden-focus audit. */
        inert={!mobileOpen}
      >
        <nav className="nav__mobile-links">
          {NAV_LINKS.map((link) => {
            if (link.kind === "mega") {
              const expanded = mobileMegaOpen === link.menu.key;
              return (
                <div key={link.label} className="nav__mobile-group">
                  <button
                    type="button"
                    className="nav__mobile-link"
                    aria-expanded={expanded}
                    onClick={() =>
                      setMobileMegaOpen((p) =>
                        p === link.menu.key ? null : link.menu.key,
                      )
                    }
                  >
                    <span>{link.label}</span>
                    <Chevron />
                  </button>
                  {expanded && (
                    <div className="nav__mobile-mega">
                      {link.menu.columns.map((col) => (
                        <div key={col.label} className="nav__mobile-mega-col">
                          {/* a compact menu's single column repeats the group name */}
                          {!link.menu.compact && (
                            <div className="mega__col-label">{col.label}</div>
                          )}
                          {col.items?.map((item) => (
                            <MegaItemLink
                              key={item.title}
                              item={item}
                              onClick={closeMobile}
                            />
                          ))}
                          {col.groups?.map((group, gi) => (
                            <div
                              key={group.label ?? gi}
                              className="mega__group"
                            >
                              {group.label && (
                                <div className="mega__group-label">
                                  {group.label}
                                </div>
                              )}
                              {group.items.map((item) => (
                                <MegaItemLink
                                  key={item.title}
                                  item={item}
                                  onClick={closeMobile}
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            if (link.external) {
              return (
                <a
                  key={link.label}
                  className="nav__mobile-link"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                >
                  <span>{link.label}</span>
                </a>
              );
            }
            return (
              <Link
                key={link.label}
                href={link.href}
                className="nav__mobile-link"
                onClick={closeMobile}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="nav__mobile-ctas">
          <TalkWithUs>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={closeMobile}
            >
              Talk to us
            </button>
          </TalkWithUs>
          <a
            className="btn btn--primary"
            href={EXTERNAL_LINKS.app}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
          >
            Login
          </a>
        </div>
      </div>
    </>
  );
}
