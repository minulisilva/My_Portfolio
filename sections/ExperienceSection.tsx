"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, ArrowUpRight, MapPin, Calendar, Code2 } from "lucide-react";
import SectionWrapper, { SectionLabel, SectionTitle } from "@/components/SectionWrapper";

/* ─── Types ──── */
interface Experience {
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  duration: string;
  type: string;
  description: string[];
  tech: string[];
  current?: boolean;
}

/* ─── Data ──── */
const EXPERIENCES: Experience[] = [
  {
    title: "Intern Software Engineer",
    company: "R Tech Solutions (Pvt.) Ltd.",
    companyUrl: "https://www.rtechsl.com/",
    location: "Kandy, Sri Lanka",
    duration: "2025 — 2026",
    type: "Full-time",
    current: true,
    description: [
      "Developed and maintained scalable application functionalities using modern technologies, ensuring reliability and optimal system performance.",
      "Designed and optimized database structures and backend processes to support efficient data management and business operations.",
      "Collaborated with stakeholders and cross-functional teams to translate business requirements into effective technical solutions and successful software deliveries.",
    ],
    tech: ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "AWS"],
  },
];

/* ─── Scroll-tracked left timeline line ───── */
function TimelineLine({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="absolute left-5 md:left-8 top-0 bottom-0 w-px overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-paper-muted dark:bg-ink-muted" />
      <motion.div
        style={{ scaleY, originY: 0 }}
        className="absolute inset-0 bg-gradient-to-b from-accent via-accent/60 to-accent/10"
      />
    </div>
  );
}

/* ─── Animated timeline dot ───── */
function TimelineDot({ current }: { current?: boolean }) {
  return (
    <div className="absolute left-3 md:left-5 top-8 z-10">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shadow-lg
          ${current
            ? "bg-accent border-accent shadow-accent/40"
            : "bg-paper dark:bg-ink border-accent"
          }`}
      >
        {current && <span className="w-2 h-2 rounded-full bg-white" />}
      </motion.div>
    </div>
  );
}

/* ─── Single experience card ─────────────────────────────────────────────── */
function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative pl-16 md:pl-24"
    >
      <TimelineDot current={exp.current} />

      {/* connector dot to card */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.4, delay: index * 0.12 + 0.2, ease: "easeOut" }}
        className="absolute left-8 md:left-[52px] top-[38px] w-6 md:w-8 h-px bg-accent/40 origin-left"
      />

      {/* card */}
      <motion.div
        whileHover={{ x: 6, transition: { duration: 0.2 } }}
        className="card-base overflow-hidden hover:border-accent/80 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 group"
      >
        {/* top accent bar animates in */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: index * 0.12 + 0.3, ease: "easeOut" }}
          className="h-1 bg-gradient-to-r from-accent via-accent/50 to-transparent origin-left"
        />

        <div className="p-6">
          {/* ── Header ── */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
            <div className="flex items-start gap-3">
              {/* icon */}
              <motion.div
                whileHover={{ rotate: -8, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0"
              >
                <Briefcase size={20} className="text-accent" />
              </motion.div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-lg text-ink dark:text-paper">
                    {exp.title}
                  </h3>
                  {exp.current && (
                    <span className="px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-mono font-semibold">
                      ● Current
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body font-semibold text-sm text-accent hover:text-accent-dark transition-colors flex items-center gap-1 group/link"
                    >
                      {exp.company}
                      <ArrowUpRight
                        size={13}
                        className="opacity-0 group-hover/link:opacity-100 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-all"
                      />
                    </a>
                  ) : (
                    <span className="font-body font-semibold text-sm text-accent">
                      {exp.company}
                    </span>
                  )}
                  <span className="text-ink/20 dark:text-paper/20">·</span>
                  <span className="inline-flex items-center gap-1 text-xs font-body text-ink/50 dark:text-paper/50">
                    <MapPin size={10} className="text-accent/60" />
                    {exp.location}
                  </span>
                </div>
              </div>
            </div>

            {/* duration */}
            <div className="text-right shrink-0">
              <p className="inline-flex items-center gap-1.5 text-sm font-mono text-ink/60 dark:text-paper/60">
                <Calendar size={11} className="text-accent" />
                {exp.duration}
              </p>
              <p className="text-xs font-body text-ink/40 dark:text-paper/40 mt-1">
                {exp.type}
              </p>
            </div>
          </div>

          {/* ── Animated divider ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: index * 0.12 + 0.35, ease: "easeOut" }}
            className="h-px bg-gradient-to-r from-accent/30 via-accent/10 to-transparent origin-left mb-5"
          />

          {/* ── Description bullets — staggered ── */}
          <ul className="space-y-3 mb-5">
            {exp.description.map((point, j) => (
              <motion.li
                key={j}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{
                  delay: index * 0.12 + 0.4 + j * 0.08,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex gap-3 text-md font-body text-ink/65 dark:text-paper/65 leading-relaxed"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.12 + 0.4 + j * 0.08, type: "spring" }}
                  className="text-accent mt-1 shrink-0"
                >
                  ▸
                </motion.span>
                {point}
              </motion.li>
            ))}
          </ul>

          {/* ── Tech tags — staggered pop-in ── */}
          <div className="pt-4 border-t border-paper-muted dark:border-ink-muted">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.12 + 0.55 }}
              className="text-xs font-mono text-ink/35 dark:text-paper/35 uppercase tracking-widest mb-3 flex items-center gap-1.5"
            >
              <Code2 size={11} className="text-accent" />
              Tech Stack
            </motion.p>
            <div className="flex flex-wrap gap-2">
              {exp.tech.map((t, ti) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.75, y: 8 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{
                    delay: index * 0.12 + 0.6 + ti * 0.05,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-2.5 py-1 rounded-lg bg-paper dark:bg-ink border border-paper-muted dark:border-ink-muted text-xs font-mono text-ink/60 dark:text-paper/60 cursor-default hover:border-accent/40 hover:text-accent transition-colors"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <SectionWrapper id="experience">
      <div className="max-w-7xl mx-auto">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-14"
        >
          <SectionLabel>Experience</SectionLabel>
          <SectionTitle>
            Where I&apos;ve{" "}
            <span className="gradient-text">worked</span>
          </SectionTitle>
          <p className="mt-4 font-body text-ink/60 dark:text-paper/60 leading-relaxed">
            A timeline of my professional journey building products people love.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative" ref={timelineRef}>
          <TimelineLine containerRef={timelineRef as React.RefObject<HTMLDivElement>} />

          <div className="space-y-10">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard key={`${exp.company}-${i}`} exp={exp} index={i} />
            ))}
          </div>

          {/* bottom "more to come" */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 mt-10 pl-16 md:pl-24"
          >
            <div className="w-5 h-5 rounded-full border-2 border-dashed border-accent/30 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-accent/30" />
            </div>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-px w-8 bg-gradient-to-r from-accent/40 to-transparent"
            />
            <span className="text-xs font-mono text-ink/30 dark:text-paper/30">
              More experience to come...
            </span>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}