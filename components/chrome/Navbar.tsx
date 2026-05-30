"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/lib/nav-links";
import { ROUTES } from "@/lib/routes";
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
      <div className="mega__item-title">{item.title}</div>
      {item.sub && <div className="mega__item-sub">{item.sub}</div>}
    </>
  );
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

function MegaPanel({ menu, open }: { menu: MegaMenu; open: boolean }) {
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
              <MegaItemLink key={item.title} item={item} />
            ))}
            {col.groups?.map((group, gi) => (
              <div key={group.label ?? gi} className="mega__group">
                {group.label && (
                  <div className="mega__group-label">{group.label}</div>
                )}
                {group.items.map((item) => (
                  <MegaItemLink key={item.title} item={item} />
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

  /* Close mega on outside click / Escape. */
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

  return (
    <header
      ref={headerRef}
      className="nav"
      onMouseLeave={() => setOpenKey(null)}
    >
      <div className="nav__inner">
        <Link className="nav__brand" href={ROUTES.home}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-mark-black.svg" alt="Humanos" />
          <span className="nav__brand-text">Humanos</span>
        </Link>

        <nav className="nav__links">
          {NAV_LINKS.map((link) => {
            if (link.kind === "mega") {
              return (
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
            <button type="button" className="btn btn--ghost btn--sm">
              Talk with us
            </button>
          </TalkWithUs>
          <a
            className="btn btn--primary btn--sm"
            href={EXTERNAL_LINKS.app}
            target="_blank"
            rel="noopener noreferrer"
          >
            Login
          </a>
          {/* Burger — hidden on desktop, visible on mobile via .navbar.css */}
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

      {/* Desktop mega menus */}
      {NAV_LINKS.filter((l) => l.kind === "mega").map((link) =>
        link.kind === "mega" ? (
          <MegaPanel
            key={link.menu.key}
            menu={link.menu}
            open={openKey === link.menu.key}
          />
        ) : null,
      )}

      {/* Mobile drawer */}
      <div
        id="nav-mobile"
        className={`nav__mobile${mobileOpen ? " is-open" : ""}`}
        aria-hidden={!mobileOpen}
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
                          <div className="mega__col-label">{col.label}</div>
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
              Talk with us
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
    </header>
  );
}
