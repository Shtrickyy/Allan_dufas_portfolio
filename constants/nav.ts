export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Systems", href: "/systems" },
  { label: "About", href: "/about" },
  { label: "Thinking", href: "/thinking" },
  { label: "Contact", href: "/contact" },
];

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
