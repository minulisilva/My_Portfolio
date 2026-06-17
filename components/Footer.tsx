"use client";

import { motion } from "framer-motion";
import { Code2, Globe, X, Mail, ArrowUpRight } from "lucide-react";

/* ─── Social Links — TODO: replace hrefs with your profiles ────────────── */
const SOCIAL_LINKS = [
  { icon: Code2, label: "GitHub", href: "https://github.com/minulisilva" },
  { icon: Globe, label: "LinkedIn", href: "https://www.linkedin.com/in/minuli-de-silva" },
  { icon: X, label: "Twitter", href: "https://twitter.com/minulisilva" },
  { icon: Mail, label: "Email", href: "mailto:minulidesilva2003@gmail.com" },
];

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-paper-muted dark:border-ink-muted">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* ── Brand ── */}
          <div>
            <p className="font-display font-bold text-2xl">
              minu<span className="text-accent">.</span>
            </p>
            <p className="text-ink/50 dark:text-paper/50 text-sm font-body mt-1">
              Building things for the web
            </p>
          </div>

          {/* ── Nav ── */}
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sm font-body text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper transition-colors flex items-center gap-1 group"
                >
                  {label}
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* ── Social ── */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-lg flex items-center justify-center bg-paper dark:bg-ink border border-paper-muted dark:border-ink-muted text-ink/60 dark:text-paper/60 hover:text-accent hover:border-accent/40 transition-colors"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-10 pt-6 border-t border-paper-muted dark:border-ink-muted flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-ink/40 dark:text-paper/40 font-body">
          <p>© {new Date().getFullYear()} Minuli De Silva. All rights reserved.</p>
          {/*<p>
            Built with{" "}
            <span className="text-accent font-medium">Next.js</span> &{" "}
            <span className="text-accent font-medium">TailwindCSS</span>
          </p>*/}
        </div>
      </div>
    </footer>
  );
}
