import { ROUTES } from "./routes";
import { DEVELOPERS_MENU, type MegaMenu } from "./mega-menus";

export type NavLink =
  | { kind: "mega"; label: string; menu: MegaMenu }
  | { kind: "link"; label: string; href: string; external?: boolean };

export const NAV_LINKS: NavLink[] = [
  { kind: "mega", label: "Developers", menu: DEVELOPERS_MENU },
  { kind: "link", label: "Customers", href: ROUTES.customers },
  { kind: "link", label: "Pricing", href: ROUTES.pricing },
  { kind: "link", label: "Company", href: ROUTES.company },
];
