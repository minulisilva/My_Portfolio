"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, Download, Home, User, Briefcase, GraduationCap, FolderOpen, Wrench, Sparkles, Mail } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { label: "Home",       href: "#home",       icon: Home },
  { label: "About",      href: "#about",      icon: User },
  { label: "Projects",   href: "#projects",   icon: FolderOpen },
  { label: "Skills",     href: "#skills",     icon: Wrench },
  { label: "Services",   href: "#services",   icon: Sparkles },
  { label: "Contact",    href: "#contact",    icon: Mail },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // close on resize to desktop
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setIsOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // active section tracker
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-10% 0px -85% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-paper/80 dark:bg-ink/80 backdrop-blur-xl border-b border-paper-muted/50 dark:border-ink-muted/50 shadow-sm"
          : "bg-transparent"
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-[64px] sm:h-[72px] flex items-center justify-between">

          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="font-display font-bold text-lg sm:text-xl tracking-tight z-50 relative"
            whileHover={{ scale: 1.03 }}
          >
            <span className="text-ink dark:text-paper">minu</span>
            <span className="text-accent">.</span>
          </motion.a>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1);
              const isActive = activeSection === id;
              return (
                <li key={href}>
                  <button
                    onClick={() => handleNavClick(href)}
                    className={`relative px-3 py-2 text-sm font-body font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "text-ink dark:text-paper"
                        : "text-ink/50 dark:text-paper/50 hover:text-ink dark:hover:text-paper"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-paper-soft dark:bg-ink-soft rounded-lg"
                        style={{ zIndex: -1 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-lg flex items-center justify-center
                bg-white/30 dark:bg-white/5 backdrop-blur-xl
                border border-white/40 dark:border-white/10
                text-ink dark:text-paper transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* CV button */}
            <motion.a
              href="/cv/Minuli_De_Silva.pdf"
              download="Minuli_De_Silva.pdf"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-accent text-white text-xs font-display font-semibold transition-all hover:bg-accent-dark"
            >
              <Download size={13} />
              <span className="hidden md:inline">Download CV</span>
              <span className="md:hidden">CV</span>
            </motion.a>

            {/* Hamburger */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.88 }}
              aria-label="Toggle menu"
              className="lg:hidden relative z-[60] w-9 h-9 rounded-xl flex items-center justify-center
                bg-white/30 dark:bg-white/5 backdrop-blur-xl
                border border-white/40 dark:border-white/10
                text-ink dark:text-paper"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? "x" : "menu"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                >
                  {isOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </header>

      {/* ── Creative Mobile Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-[45] bg-ink/40 dark:bg-ink/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Top Down Mobile Menu */}
            <motion.div
              key="panel"
              ref={menuRef}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 30,
              }}
              className="lg:hidden fixed top-[64px] sm:top-[72px] left-0 right-0 z-[50]
                h-[80vh]
                bg-paper/95 dark:bg-ink/95
                backdrop-blur-2xl
                border-b border-paper-muted/50 dark:border-ink-muted/50
                shadow-2xl
                overflow-hidden"
            >
              {/* panel top glow */}
              <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />
              <div className="absolute top-[-60px] left-[-60px] w-48 h-48 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

              {/* nav links */}
              <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4">
                <ul className="space-y-1">
                  {NAV_LINKS.map(({ label, href, icon: Icon }, i) => {
                    const isActive = activeSection === href.slice(1);
                    return (
                      <motion.li
                        key={href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.045, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <button
                          onClick={() => handleNavClick(href)}
                          className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-display font-semibold transition-all duration-200 group relative overflow-hidden ${
                            isActive
                              ? "bg-accent text-white shadow-lg shadow-accent/25"
                              : "text-ink/70 dark:text-paper/70 hover:text-ink dark:hover:text-paper hover:bg-paper-soft dark:hover:bg-ink-soft"
                          }`}
                        >
                          {/* shimmer on hover */}
                          {!isActive && (
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          )}

                          {/* icon box */}
                          <span className={`relative z-10 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isActive
                              ? "bg-white/20"
                              : "bg-paper-muted/60 dark:bg-ink-muted/60 group-hover:bg-accent/10"
                          }`}>
                            <Icon size={15} className={isActive ? "text-white" : "text-accent"} />
                          </span>

                          <span className="relative z-10">{label}</span>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              {/* footer — CV + theme */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative z-10 px-4 pb-8 pt-4 border-t border-paper-muted/30 dark:border-ink-muted/30 space-y-3"
              >
                {/* theme toggle row */}
                {/*<button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl
                    bg-paper-soft dark:bg-ink-soft
                    border border-paper-muted/50 dark:border-ink-muted/50
                    text-sm font-body font-medium text-ink/70 dark:text-paper/70
                    hover:border-accent/30 transition-colors"
                >
                  <span className="w-8 h-8 rounded-xl bg-paper-muted/60 dark:bg-ink-muted/60 flex items-center justify-center shrink-0">
                    {theme === "dark"
                      ? <Sun size={15} className="text-accent" />
                      : <Moon size={15} className="text-accent" />
                    }
                  </span>
                  {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>*/}

                {/* Download CV */}
                <a
                  href="/cv/Minuli_De_Silva.pdf"
                  download="Minuli_De_Silva.pdf"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl
                    bg-accent text-white font-display font-semibold text-sm
                    hover:bg-accent-dark transition-colors
                    shadow-lg shadow-accent/20"
                >
                  <Download size={15} />
                  Download CV
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}