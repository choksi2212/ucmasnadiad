"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 10);
    });
  }, [scrollY]);

  const bgOpacity = useTransform(scrollY, [0, 40], [0, 1]);
  const shadowOpacity = useTransform(scrollY, [0, 40], [0, 1]);

  // Close mobile menu on resize
  useEffect(() => {
    const close = () => setMobileOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{}}
      >
        {/* Background layer */}
        <motion.div
          className="absolute inset-0 bg-white border-b border-gray-100"
          style={{ opacity: bgOpacity, boxShadow: shadowOpacity.get() > 0.1 ? "0 2px 16px rgba(0,0,0,0.08)" : "none" }}
        />

        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <button onClick={() => scrollTo("#home")} className="flex items-center gap-3 group">
            <div className="relative w-[100px] h-[40px]">
              <Image
                src="/ucmas-logo.png"
                alt="UCMAS Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block transition-colors duration-300">
              <div className={`text-sm font-bold leading-tight ${isScrolled ? "text-[#1B3A6B]" : "text-white"}`}>R D Abacuz</div>
              <div className={`text-xs leading-tight ${isScrolled ? "text-[#6B7280]" : "text-white/80"}`}>Nadiad</div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 group ${isScrolled ? "text-[#1A1A2E] hover:text-[#E31837]" : "text-white/90 hover:text-white"}`}
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#E31837] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
              </button>
            ))}
          </div>

          {/* Right: Phone + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${SITE.phone}`}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isScrolled ? "text-[#1B3A6B] hover:text-[#E31837]" : "text-white hover:text-white/80"}`}
            >
              <Phone size={14} />
              {SITE.phoneDisplay}
            </a>
            <button
              onClick={() => scrollTo("#contact")}
              className="px-5 py-2.5 bg-[#E31837] text-white text-sm font-semibold rounded-full hover:bg-[#b8102b] transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5"
            >
              Book Free Demo
            </button>
          </div>

          {/* Mobile: phone icon + hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <a href={`tel:${SITE.phone}`} className={`p-2 transition-colors ${isScrolled ? "text-[#1B3A6B]" : "text-white"}`}>
              <Phone size={18} />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 transition-colors ${isScrolled ? "text-[#1A1A2E]" : "text-white"}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-5 h-[72px] border-b border-gray-100">
                <span className="font-bold text-[#1B3A6B]">Menu</span>
                <button onClick={() => setMobileOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 flex flex-col px-4 py-6 gap-1">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="w-full text-left px-4 py-3 text-base font-medium text-[#1A1A2E] hover:text-[#E31837] hover:bg-red-50 rounded-xl transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <div className="px-4 pb-6 flex flex-col gap-3">
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center justify-center gap-2 w-full py-3 border-2 border-[#1B3A6B] text-[#1B3A6B] font-semibold rounded-full hover:bg-[#1B3A6B] hover:text-white transition-colors"
                >
                  <Phone size={16} />
                  {SITE.phoneDisplay}
                </a>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="w-full py-3 bg-[#E31837] text-white font-semibold rounded-full shadow-lg shadow-red-500/25"
                >
                  Book Free Demo →
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
