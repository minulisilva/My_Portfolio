"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Award, ExternalLink, MapPin, Calendar, ChevronRight } from "lucide-react";
import SectionWrapper, { SectionLabel, SectionTitle } from "@/components/SectionWrapper";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  year: string;
  grade: string;
  description: string[];
  highlights: string[];
  current?: boolean;
}

interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  url?: string;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const EDUCATION: EducationItem[] = [
  {
    degree: "B.Sc. (Hons) in Information Technology",
    institution: "Sri Lanka Institute of Information Technology (SLIIT)",
    location: "Malabe, Sri Lanka",
    year: "2023 — Present",
    grade: "GPA: 3.2 / 4.0",
    description: [
      "Specialized in Information Technology.",
      "Currently a 4th Year Undergraduate student.",
    ],
    highlights: ["4th Year Undergraduate"],
    current: true,
  },
  {
    degree: "G.C.E. Advanced Level & Ordinary Level",
    institution: "Girls' High School Kandy",
    location: "Kandy, Sri Lanka",
    year: "2008 — 2022",
    grade: "Physical Science Stream",
    description: [
      "Completed G.C.E. Advanced Level Examination in Physical Science stream. (2022)",
      "Completed G.C.E. Ordinary Level Examination. (2018)",
    ],
    highlights: ["Physics", "Chemistry", "Combined Maths"],
  },
];

/*
const CERTIFICATIONS: CertificationItem[] = [
  { name: "AWS Certified Developer", issuer: "Amazon Web Services", year: "2022", url: "https://aws.amazon.com" },
  { name: "Professional Scrum Master I", issuer: "Scrum.org", year: "2021", url: "https://scrum.org" },
  { name: "Google UX Design Certificate", issuer: "Google / Coursera", year: "2020", url: "https://coursera.org" },
];
*/

/* ─── Scroll-tracked vertical line ──────────────────────────────────────── */
function TimelineLine({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 30%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="absolute right-5 top-0 bottom-0 w-px overflow-hidden pointer-events-none hidden md:block">
      <div className="absolute inset-0 bg-paper-muted dark:bg-ink-muted" />
      <motion.div
        style={{ scaleY, originY: 0 }}
        className="absolute inset-0 bg-gradient-to-b from-accent via-accent/60 to-accent/10"
      />
    </div>
  );
}

/* ─── Timeline dot ───────────────────────────────────────────────────────── */
function TimelineDot({ current, index }: { current?: boolean; index: number }) {
  return (
    <div className="absolute right-3 top-8 z-10 hidden md:block">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.1 }}
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

/* ─── Education Card ─────────────────────────────────────────────────────── */
function EducationCard({ edu, index }: { edu: EducationItem; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative md:pr-16"
    >
      <TimelineDot current={edu.current} index={index} />

      {/* connector line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.35, delay: index * 0.12 + 0.2, ease: "easeOut" }}
        className="absolute right-8 top-[38px] w-6 h-px bg-accent/40 origin-right hidden md:block"
      />

      <motion.div
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="card-base dark:bg-ink overflow-hidden hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 group"
      >
        {/* animated top bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: index * 0.12 + 0.25, ease: "easeOut" }}
          className={`h-1 origin-left bg-gradient-to-r ${
            edu.current
              ? "from-accent via-accent/60 to-transparent"
              : "from-accent/60 via-accent/30 to-transparent"
          }`}
        />

        <div className="p-6">
          <div className="flex gap-4">
            {/* icon — rotates on hover */}
            <motion.div
              whileHover={{ rotate: -10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 mt-1"
            >
              <GraduationCap size={22} className="text-accent" />
            </motion.div>

            <div className="flex-1">
              {/* header row */}
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <h3 className="font-display font-bold text-lg text-ink dark:text-paper leading-snug">
                      {edu.degree}
                    </h3>
                    {edu.current && (
                      <span className="px-2 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-mono">
                        ● Current
                      </span>
                    )}
                  </div>
                  <p className="font-body font-medium text-accent text-sm mt-0.5">
                    {edu.institution}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="inline-flex items-center gap-1 text-xs font-mono text-ink/55 dark:text-paper/55">
                    <Calendar size={10} className="text-accent" />
                    {edu.year}
                  </p>
                  {edu.grade && (
                    <p className="text-xs font-body text-accent mt-0.5 font-semibold">
                      ★ {edu.grade}
                    </p>
                  )}
                </div>
              </div>

              {/* location */}
              {edu.location && (
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.12 + 0.3 }}
                  className="inline-flex items-center gap-1 text-xs font-mono text-ink/45 dark:text-paper/45 mb-3"
                >
                  <MapPin size={10} className="text-accent/60" />
                  {edu.location}
                </motion.p>
              )}

              {/* animated divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: index * 0.12 + 0.35, ease: "easeOut" }}
                className="h-px bg-gradient-to-r from-accent/20 to-transparent origin-right mb-3"
              />

              {/* description bullets — staggered */}
              <ul className="mb-4 space-y-2">
                {edu.description.map((line, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{
                      delay: index * 0.12 + 0.4 + i * 0.08,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex gap-2 text-sm font-body text-ink/60 dark:text-paper/60 leading-relaxed"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: index * 0.12 + 0.4 + i * 0.08, type: "spring" }}
                      className="text-accent mt-1 shrink-0"
                    >
                      <ChevronRight size={12} />
                    </motion.span>
                    {line}
                  </motion.li>
                ))}
              </ul>

              {/* highlight tags — pop in */}
              <div className="flex flex-wrap gap-2">
                {edu.highlights.map((h, hi) => (
                  <motion.span
                    key={h}
                    initial={{ opacity: 0, scale: 0.75, y: 6 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{
                      delay: index * 0.12 + 0.55 + hi * 0.06,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-2.5 py-1 rounded-lg bg-paper-soft dark:bg-ink-soft border border-paper-muted dark:border-ink-muted text-xs font-mono text-ink/60 dark:text-paper/60 cursor-default hover:border-accent/40 hover:text-accent transition-colors"
                  >
                    #{h}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Certification Card ─────────────────────────────────────────────────── */
function CertificationCard({ cert, index }: { cert: CertificationItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="card-base p-5 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 group relative overflow-hidden"
    >
      {/* shimmer sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

      <div className="relative z-10 flex items-start gap-4">
        <motion.div
          whileHover={{ rotate: 8, scale: 1.1 }}
          transition={{ duration: 0.25 }}
          className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0"
        >
          <Award size={18} className="text-accent" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="font-body font-semibold text-sm text-ink dark:text-paper leading-snug">
              {cert.name}
            </p>
            {cert.url && (
              <motion.a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="text-ink/30 dark:text-paper/30 hover:text-accent transition-colors shrink-0"
              >
                <ExternalLink size={13} />
              </motion.a>
            )}
          </div>
          <p className="text-xs font-body text-ink/50 dark:text-paper/50 mt-1">{cert.issuer}</p>
          <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-mono">
            ✓ {cert.year}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function EducationSection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* ══ SECTION 1 — Education ══ */}
      <SectionWrapper id="education" className="bg-paper-soft dark:bg-ink-soft">
        <div className="max-w-7xl mx-auto">

          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mb-14 ml-auto text-right"
          >
            <SectionLabel>Education</SectionLabel>
            <SectionTitle>
              Academic{" "}
              <span className="gradient-text">background</span>
            </SectionTitle>
            <p className="mt-4 font-body text-ink/60 dark:text-paper/60 leading-relaxed">
              My formal education and academic journey.
            </p>
          </motion.div>

          {/* timeline */}
          <div ref={timelineRef} className="relative">
            <TimelineLine containerRef={timelineRef as React.RefObject<HTMLDivElement>} />
            <div className="space-y-8">
              {EDUCATION.map((edu, i) => (
                <EducationCard key={edu.degree} edu={edu} index={i} />
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ══ SECTION 2 — Certifications (uncomment when needed) ══
      <SectionWrapper id="certifications">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mb-14"
          >
            <SectionLabel>Certifications</SectionLabel>
            <SectionTitle>
              Licenses &{" "}
              <span className="gradient-text">certificates</span>
            </SectionTitle>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTIFICATIONS.map((cert, i) => (
              <CertificationCard key={cert.name} cert={cert} index={i} />
            ))}
          </div>
        </div>
      </SectionWrapper>
      */}
    </>
  );
}