"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import ContactModal from "@/components/ContactModal";

function FlagUK({ active }: { active: boolean }) {
  return (
    <div className={["w-8 h-8 rounded-full overflow-hidden flex-shrink-0 transition-all duration-300", !active ? "grayscale opacity-50" : ""].join(" ")}>
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" fill="#012169" />
        <line x1="0" y1="0" x2="32" y2="32" stroke="white" strokeWidth="8" />
        <line x1="32" y1="0" x2="0" y2="32" stroke="white" strokeWidth="8" />
        <line x1="0" y1="0" x2="32" y2="32" stroke="#C8102E" strokeWidth="4" />
        <line x1="32" y1="0" x2="0" y2="32" stroke="#C8102E" strokeWidth="4" />
        <rect x="13" y="0" width="6" height="32" fill="white" />
        <rect x="0" y="13" width="32" height="6" fill="white" />
        <rect x="14.5" y="0" width="3" height="32" fill="#C8102E" />
        <rect x="0" y="14.5" width="32" height="3" fill="#C8102E" />
      </svg>
    </div>
  );
}

function FlagBR({ active }: { active: boolean }) {
  return (
    <div className={["w-8 h-8 rounded-full overflow-hidden flex-shrink-0 transition-all duration-300", !active ? "grayscale opacity-50" : ""].join(" ")}>
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" fill="#009C3B" />
        <polygon points="16,3 29,16 16,29 3,16" fill="#FFDF00" />
        <circle cx="16" cy="16" r="7.5" fill="#002776" />
        <path d="M9.5,15.8 Q16,13.2 22.5,15.8" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Easing cúbico para scroll suave com aceleração/desaceleração
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetY: number) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = Math.min(1350, Math.max(600, Math.abs(distance) * 0.6));
  const startTime = performance.now();

  const animate = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}

function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  const navHeight = 67;
  const targetY = el.getBoundingClientRect().top + window.scrollY - navHeight;
  smoothScrollTo(targetY);
}

export default function Navbar() {
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState("sobre");
  const [scrolled,     setScrolled]     = useState(false);
  const [contactOpen,  setContactOpen]  = useState(false);
  const { lang, switchLang, t } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = t.nav.links.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [t.nav.links]);

  return (
    <>
    <header
      className={[
        "sticky top-0 z-50 w-full bg-[#ECEEE8] transition-shadow duration-300",
        scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.08)]" : "shadow-none",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-4">

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          {t.nav.links.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group relative text-[15px] font-normal uppercase tracking-wide text-[#1F2937] transition-colors pb-1"
              >
                {link.label}
                <span
                  className={[
                    "absolute bottom-0 left-0 h-[2px] w-full bg-[#FFBB1E] transition-opacity duration-200",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                  ].join(" ")}
                />
              </a>
            );
          })}
        </nav>

        {/* Mobile: hamburger + active section label */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="text-[#1F2937] cursor-pointer"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm font-medium uppercase tracking-widest text-[#1F2937]">
            {t.nav.links[0].label}
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button aria-label="English" onClick={() => switchLang("en")} className="cursor-pointer">
              <FlagUK active={lang === "en"} />
            </button>
            <button aria-label="Português" onClick={() => switchLang("pt")} className="cursor-pointer">
              <FlagBR active={lang === "pt"} />
            </button>
          </div>

          <button
            onClick={() => setContactOpen(true)}
            className="hidden rounded-full border border-[#1F2937] px-6 py-1.5 text-sm font-normal text-[#1F2937] transition-all duration-200 hover:bg-[#FFBB1E] hover:border-[#FFBB1E] md:block cursor-pointer"
          >
            {t.nav.cta}
          </button>

        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav className="border-t border-[#1F2937]/10 bg-[#ECEEE8] px-8 py-4 md:hidden">
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { handleNavClick(e, link.href); setMenuOpen(false); }}
              className="block py-3 text-base font-normal uppercase tracking-wide text-[#1F2937]"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { setMenuOpen(false); setContactOpen(true); }}
            className="block py-3 text-base font-normal uppercase tracking-wide text-[#1F2937] cursor-pointer"
          >
            {t.nav.cta}
          </button>
        </nav>
      )}
    </header>

    {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </>
  );
}
