/**
 * Which routes render the site chrome (banner, navbar, mega menus, mobile
 * drawer) on its dark theme. Customer stories (/case-studies/<slug>) are
 * dark long-form pages; everything else is light.
 */
export function isDarkRoute(pathname: string | null): boolean {
  return /^\/case-studies\/[^/]+/.test(pathname ?? "");
}
