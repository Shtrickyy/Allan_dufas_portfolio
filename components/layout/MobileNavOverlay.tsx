"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isNavActive, navItems } from "@/constants/nav";
import { site } from "@/constants/site";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type MobileNavOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileNavOverlay({ isOpen, onClose }: MobileNavOverlayProps) {
  const pathname = usePathname();

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <SheetContent
        side="top"
        showCloseButton
        className={cn(
          "inset-0 h-dvh w-full max-w-none border-0 bg-surface p-0 shadow-elevation-2",
          "data-[side=top]:inset-0 data-[side=top]:h-dvh data-[side=top]:translate-none",
        )}
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <nav
          id="mobile-navigation"
          aria-label="Mobile"
          className="flex h-full flex-col px-6 pb-8 pt-20"
        >
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = isNavActive(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex min-h-11 items-center text-2xl font-medium leading-snug tracking-tight transition-colors duration-200",
                      active
                        ? "text-accent"
                        : "text-ink-primary hover:text-accent",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-auto font-mono text-xs font-medium uppercase tracking-widest text-ink-secondary">
            {site.name}
          </p>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
