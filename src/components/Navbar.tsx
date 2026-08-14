"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { LeafIcon, CartIcon, MenuIcon, CloseIcon } from "./Icons";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu upon navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Why Natural", href: "/#why-natural" },
    { name: "FAQ", href: "/#faq" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled ? "glass-nav shadow-soft py-3" : "bg-[#F8F3E9]/95 py-4 border-b border-[#2A2521]/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-[#E2606B] rounded-lg p-1"
            aria-label="Urban Vital - Home"
          >
            <span className="w-8 h-8 rounded-full bg-[#8CC79B]/25 text-[#2A2521] flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <LeafIcon size={18} />
            </span>
            <div className="flex flex-col">
              <span className="font-bold tracking-[0.16em] uppercase text-sm leading-none text-[#2A2521]">
                URBAN VITAL
              </span>
              <span className="text-[10px] tracking-[0.18em] uppercase text-[#2A2521]/60 font-semibold mt-0.5">
                Nourish The Roots
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide transition-colors duration-150 relative py-1 focus-visible:ring-2 focus-visible:ring-[#E2606B] rounded-md px-1 ${
                    isActive
                      ? "text-[#2A2521]"
                      : "text-[#2A2521]/78 hover:text-[#2A2521]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-[#E2606B] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Cart + Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative p-2.5 rounded-full text-[#2A2521] bg-[#2A2521]/5 hover:bg-[#2A2521]/10 focus-visible:ring-2 focus-visible:ring-[#E2606B] transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <CartIcon size={20} />
              {itemCount > 0 && (
                <span
                  key={itemCount}
                  className="absolute -top-1 -right-1 bg-[#E2606B] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-scale"
                >
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#2A2521] hover:bg-[#2A2521]/5 focus-visible:ring-2 focus-visible:ring-[#E2606B] min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-3 pb-6 bg-[#F8F3E9] border-b border-[#2A2521]/10 shadow-lifted animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-[#2A2521]/10 text-[#2A2521]"
                        : "text-[#2A2521]/78 hover:bg-[#2A2521]/5 text-[#2A2521]"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#E2606B]" />}
                  </Link>
                );
              })}
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 px-4 py-3 rounded-xl bg-[#E2606B] text-white font-bold flex items-center justify-between"
              >
                <span>View Cart</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
