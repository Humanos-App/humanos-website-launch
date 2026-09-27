"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string; n: string };

/**
 * Contents rail for a customer story. From 1000px up it is a sticky
 * sidebar; below that it collapses into a "Contents" toggle above the
 * article, showing the section currently in view.
 *
 * The active section is the last one whose top has scrolled past a line
 * just under the sticky site chrome; at the very bottom of the page the
 * last section wins, since it may never reach that line.
 */
export function StoryToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const chrome = document.querySelector(".site-chrome");
      const line = Math.max(chrome?.getBoundingClientRect().bottom ?? 0, 0) + 104;
      let next = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top < line) next = it.id;
      }
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
        next = items[items.length - 1]?.id;
      }
      setActive(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  const current = items.find((it) => it.id === active);

  return (
    <nav
      className={`story-toc${open ? " is-open" : ""}`}
      aria-label="Table of contents"
    >
      <button
        type="button"
        className="story-toc__toggle"
        aria-expanded={open}
        aria-controls="story-toc-list"
        onClick={() => setOpen((o) => !o)}
      >
        <span>Contents</span>
        <span className="story-toc__current">{current?.label}</span>
        <span className="story-toc__chev" aria-hidden="true">
          +
        </span>
      </button>
      <p className="story-toc__title">Contents</p>
      <ol id="story-toc-list" className="story-toc__list">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={it.id === active ? "is-active" : undefined}
              aria-current={it.id === active ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              <span className="story-toc__n">{it.n}</span>
              <span>{it.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
