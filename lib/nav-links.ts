import { ROUTES } from "./routes";
import {
  DEVELOPERS_MENU,
  USE_CASES_MENU,
  type MegaMenu,
} from "./mega-menus";

export type NavLink =
  | { kind: "mega"; label: string; menu: MegaMenu }
  | { kind: "link"; label: string; href: string; external?: boolean };

export const NAV_LINKS: NavLink[] = [
  { kind: "link", label: "Platform", href: ROUTES.platform },
  { kind: "mega", label: "Use cases", menu: USE_CASES_MENU },
  { kind: "mega", label: "Developers", menu: DEVELOPERS_MENU },
  { kind: "link", label: "Pricing", href: ROUTES.pricing },
];
