"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/* Routes that render without the site chrome (banner, navbar, floating bar,
   footer): standalone splash pages like /events, reached from QR codes rather
   than site navigation. The chrome lives in the root layout, so opting out
   happens here instead of via a route group — restructuring app/ into groups
   is deferred. */
const CHROMELESS = ["/events"];

export function RouteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const bare = CHROMELESS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  if (bare) return null;
  return <>{children}</>;
}
