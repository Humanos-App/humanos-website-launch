/**
 * Which routes render the site chrome (banner, navbar, mega menus, mobile
 * drawer) on its dark theme: the dark long-form story-layout pages — the
 * customer stories (/case-studies/<slug>) and the three Solutions pages.
 * Everything else is light.
 */
const DARK_PAGES = ["/measure", "/control", "/intelligence"];

export function isDarkRoute(pathname: string | null): boolean {
  const p = pathname ?? "";
  return /^\/case-studies\/[^/]+/.test(p) || DARK_PAGES.includes(p);
}
