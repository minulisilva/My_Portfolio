"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Override default section-padding */
  noPadding?: boolean;
}

/* ─── Section Wrapper ────────────────────────────────────────────────────
   Wraps each page section with a consistent layout and scroll-triggered
   fade-in animation via Framer Motion + IntersectionObserver.
──────────────────────────────────────────────────────────────────────── */
export default function SectionWrapper({
  id,
  children,
  className = "",
  noPadding = false,
}: SectionWrapperProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section
      id={id}
      ref={ref}
      className={`${noPadding ? "" : "section-padding"} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ─── Section Label ──────────────────────────────────────────────────────
   A small decorative heading label displayed above section titles.
──────────────────────────────────────────────────────────────────────── */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <span className="w-6 h-px bg-accent" />
      <span className="text-accent font-mono text-xs font-medium uppercase tracking-widest">
        {children}
      </span>
    </div>
  );
}

/* ─── Section Title ──────────────────────────────────────────────────────
   Consistent section heading with display font.
──────────────────────────────────────────────────────────────────────── */
export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-ink dark:text-paper leading-tight">
      {children}
    </h2>
  );
}
