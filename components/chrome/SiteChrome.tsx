"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { isDarkRoute } from "@/lib/chrome-theme";

/**
 * The sticky banner + navbar stack. Carries the chrome theme as
 * data-theme="dark" on dark routes (lib/chrome-theme.ts) so the banner,
 * bar, mega menus and mobile drawer all follow the page from one switch
 * (navbar.css). An attribute rather than a class, because
 * ChromeScrollBehavior toggles classes on this element directly.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div
      className="site-chrome"
      data-theme={isDarkRoute(pathname) ? "dark" : undefined}
    >
      {children}
    </div>
  );
}
