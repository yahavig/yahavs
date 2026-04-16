"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import MobileNav from "./MobileNav";

export default function Header({ navItems = [] }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHeroPage = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the homepage before scroll, sit over dark video → white text
  const linkClass = !scrolled && isHeroPage
    ? "rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
    : "rounded-full px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]";

  return (
    <>
      {/* Desktop header */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 hidden md:block ${
          scrolled
            ? "glass-strong border-b border-white/30"
            : "bg-transparent"
        }`}
      >
        <Container>
          {/* RTL: justify-start = visually right */}
          <nav className="flex h-14 items-center justify-start">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </Container>
      </header>

      {/* Mobile - only the hamburger button, no bar */}
      <div className="fixed top-3 right-4 z-50 md:hidden">
        <MobileNav navItems={navItems} lightMode={!scrolled && isHeroPage} />
      </div>
    </>
  );
}
