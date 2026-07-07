"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { MobileNavOverlay } from "@/components/layout/MobileNavOverlay";
import { isNavActive, navItems } from "@/constants/nav";
import { site } from "@/constants/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [openedAtPath, setOpenedAtPath] = useState<string | null>(null);

  const isMobileMenuOpen = mobileNavOpen && openedAtPath === pathname;

  const openMobileMenu = () => {
    setMobileNavOpen(true);
    setOpenedAtPath(pathname);
  };

  const closeMobileMenu = () => {
    setMobileNavOpen(false);
    setOpenedAtPath(null);
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 md:h-[72px] md:px-8 lg:px-12"
        >
          <Link
            href="/"
            className={cn(
              "text-base font-medium text-ink-secondary transition-colors duration-200 hover:text-ink-primary",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              pathname === "/" && "text-accent",
            )}
          >
            {site.name}
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const active = isNavActive(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-base text-ink-secondary transition-colors duration-200 hover:text-ink-primary",
                      active && "text-accent",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className={cn(
              "flex size-11 items-center justify-center text-ink-secondary transition-colors duration-200 hover:text-ink-primary md:hidden",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            )}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X aria-hidden size={20} strokeWidth={1.5} />
            ) : (
              <Menu aria-hidden size={20} strokeWidth={1.5} />
            )}
          </button>
        </nav>
      </header>

      <MobileNavOverlay isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
}
