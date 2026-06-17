"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Code2, ExternalLink, FolderOpen, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import SectionWrapper, { SectionLabel, SectionTitle } from "@/components/SectionWrapper";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Project {
  title: string;
  description: string;
  image?: string;
  tech: string[];
  github?: string;
  demo?: string;
  category: string;
  featured?: boolean;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    title: "Personal Portfolio",
    description: "Designed and developed a responsive personal portfolio website to showcase projects, skills, experience, and professional achievements.",
    image: "project1.jpg",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "TailwindCSS"],
    github: "https://github.com/minulisilva/Personal-Portfolio",
    demo: "https://saas-demo.alexrivera.dev",
    category: "Web App",
    featured: true,
  },
  {
    title: "Quick Stay - Hotel Management System",
    description: "Built a full-stack hotel management platform for handling bookings, payments, room management, and administrative operations.",
    image: "project2.jpg",
    tech: ["React", "Express.js", "Node.js", "MySQL", "TailwindCSS"],
    github: "https://github.com/minulisilva/Quick-Stay",
    category: "Web App",
    featured: true,
  },
  {
    title: "PeerPal - Student Support System",
    description: "Collaborated in a team to develop a full-stack student support platform that helps university students manage assignments, study sessions, and academic resources.",
    image: "project3.jpg",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "TailwindCSS"],
    github: "https://github.com/IT23145016/Copy_Peer_Pal",
    category: "Web App",
    featured: true,
  },
  {
    title: "FMMS - Field Marketing Management System",
    description: "Contributed to a financial management platform that streamlines commission tracking, target management, payment processing, and financial reporting.",
    tech: ["Next.js", "TypeScript", "React", "TailwindCSS", "MySQL"],
    github: "https://github.com/R-Tech-Solutions/FMMS-frontend",
    category: "E-Commerce",
  },
  {
    title: "Weather Analytics Dashboard (Power BI)",
    description: "Developed a real-time weather dashboard that displays current conditions and forecasts using external weather APIs.",
    image: "project5.jpg",
    tech: ["DAX", "Power Query", "Data Visualization"],
    github: "https://github.com/minulisilva/Weather-Dashboard",
    category: "Power BI",
  },
  {
    title: "Spotify Flutter App",
    description: "Built a cross-platform music streaming application inspired by Spotify using Flutter and modern mobile development practices.",
    image: "project6.jpg",
    tech: ["Dart", "Firebase", "Material Design"],
    github: "https://github.com/minulisilva/Spotify-App",
    category: "Mobile App",
  },
  {
    title: "Smart Uni Hub - Smart Campus Operations System",
    description: "Developed a centralized university management platform for handling academic resources, schedules, announcements, and student services.",
    image: "project7.jpg",
    tech: ["React", "Maven", "Spring Boot", "MongoDB"],
    github: "https://github.com/IT23145016/it3030-paf-2026-smart-campus-group23",
    category: "Web App",
  },
  {
    title: "Future Wallet – Personal Finance Tracker",
    description: "Created a personal finance application that helps users manage expenses, savings goals, and financial planning activities.",
    image: "project8.jpg",
    tech: ["Kotlin", "XML", "SharedPreferences"],
    github: "https://github.com/minulisilva/PersonalFinanceTrackerApp",
    category: "Mobile App",
  },
  {
    title: "Glamist – Salon Management System",
    description: "Developed a salon management platform for appointment scheduling, customer management, staff coordination, and service tracking.",
    image: "project9.jpg",
    tech: ["MERN Stack", "TailwindCSS"],
    github: "https://github.com/minulisilva/Glamist",
    category: "Web App",
  },
  {
    title: "Doc Care – E Channeling System",
    description: "Built an online healthcare appointment platform that enables patients to search doctors, schedule consultations, and manage bookings.",
    image: "project10.jpg",
    tech: ["HTML", "CSS", "JavaScript", "MySQL", "Apache Tomcat"],
    github: "https://github.com/minulisilva/E_Channeling",
    category: "Web App",
  },
  {
    title: "Tranquil Safari - Safari Booking Website",
    description: "Developed a responsive website for a safari tour operator that allows users to browse available tours, view details, and make reservations.",
    image: "project11.jpg",
    tech: ["PHP", "MySQL", "JavaScript", "Apache (XAMPP)"],
    github: "https://github.com/minulisilva/Wild_life_safari",
    category: "Web App",
  },
];

const INITIAL_COUNT = 6;
const REVEAL_COUNT = 5;
const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

/* ─── Parallax image wrapper ─────────────────────────────────────────────── */
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-16, 16]);

  return (
    <div ref={ref} className="w-full h-full overflow-hidden">
      <motion.img
        style={{ y }}
        src={src}
        alt={alt}
        className="w-full h-full object-cover scale-110 group-hover:scale-125"
      />
    </div>
  );
}

/* ─── Floating orbs ──────────────────────────────────────────────────────── */
function Orb({ className }: { className: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0], opacity: [0.06, 0.1, 0.06] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ─── Project Card ───────────────────────────────────────────────────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, y: -16 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
      className="card-base overflow-hidden group flex flex-col hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/8 transition-all duration-300 relative"
    >
      {/* ── Image ── */}
      <div className="relative h-48 bg-gradient-to-br from-paper-soft to-paper-muted dark:from-ink-soft dark:to-ink-muted overflow-hidden">
        {project.image && project.image.trim() !== "" ? (
          <ParallaxImage src={`/img/${project.image}`} alt={project.title} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={hovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                <FolderOpen size={28} className="text-accent/60" />
              </div>
              <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-accent/5" />
              <div className="absolute -bottom-3 -left-3 w-7 h-7 rounded-full bg-accent/8" />
            </motion.div>
          </div>
        )}

        {/* overlay on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent pointer-events-none"
        />

        {/* category badge */}
        <motion.span
          animate={{ opacity: hovered ? 0.6 : 1 }}
          className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-paper/80 dark:bg-ink/80 backdrop-blur-sm text-xs font-mono text-ink/60 dark:text-paper/60 border border-paper-muted dark:border-ink-muted"
        >
          {project.category}
        </motion.span>

        {project.featured && (
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.07 + 0.3 }}
            className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-accent text-white text-xs font-mono font-semibold flex items-center gap-1"
          >
            <Sparkles size={10} />
            Featured
          </motion.span>
        )}

        {/* bottom shimmer line */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent origin-left"
        />
      </div>

      {/* ── Body ── */}
      <div className="p-5 flex flex-col flex-1 bg-paper dark:bg-ink border-x border-b border-paper-muted dark:border-ink-muted rounded-b-2xl">

        {/* title */}
        <motion.h3
          animate={{ color: hovered ? "var(--tw-prose-links, #f91665)" : "" }}
          className="font-display font-bold text-lg text-ink dark:text-paper mb-2 group-hover:text-accent transition-colors"
        >
          {project.title}
        </motion.h3>

        <p className="text-sm font-body text-ink/60 dark:text-paper/60 leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {/* tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t, ti) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.07 + ti * 0.04 }}
              whileHover={{ scale: 1.08, y: -1 }}
              className="px-2 py-0.5 rounded-md bg-paper dark:bg-ink border border-paper-muted dark:border-ink-muted text-xs font-mono text-ink/55 dark:text-paper/55 cursor-default hover:border-accent/40 hover:text-accent transition-colors"
            >
              {t}
            </motion.span>
          ))}
        </div>

        {/* links */}
        <div className="flex items-center gap-3 pt-4 border-t border-paper-muted dark:border-ink-muted">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 2 }}
              className="flex items-center gap-1.5 text-xs font-mono text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper transition-colors"
            >
              <Code2 size={14} />
              Code
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: -2 }}
              className="flex items-center gap-1.5 text-xs font-mono text-accent hover:text-accent-dark transition-colors ml-auto"
            >
              Live Demo
              <ExternalLink size={13} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isCollapsing, setIsCollapsing] = useState(false);

  const allFiltered = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const visible = allFiltered.slice(0, visibleCount);
  const hasMore = visibleCount < allFiltered.length;
  const hasExtra = visibleCount > INITIAL_COUNT;

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(INITIAL_COUNT);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + REVEAL_COUNT, allFiltered.length));
  };

  const handleShowLess = async () => {
    setIsCollapsing(true);
    await new Promise((r) => setTimeout(r, 300));
    setVisibleCount(INITIAL_COUNT);
    setIsCollapsing(false);
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SectionWrapper id="projects" className="relative overflow-hidden">

      <Orb className="w-96 h-96 bg-accent top-0 -left-32" />
      <Orb className="w-80 h-80 bg-blue-500 bottom-20 -right-20" />

      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-end justify-between gap-6 mb-10"
        >
          <div>
            <SectionLabel>Projects</SectionLabel>
            <SectionTitle>
              Things I&apos;ve{" "}
              <span className="gradient-text">built</span>
            </SectionTitle>
          </div>

          {/* category filter — staggered buttons */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.2 }}
          >
            {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.1 + i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategory(cat)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-mono ${
                  activeCategory === cat
                    ? "text-white"
                    : "border border-paper-muted dark:border-ink-muted text-ink/60 dark:text-paper/60 hover:border-accent/40"
                }`}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="category-pill"
                    className="absolute inset-0 bg-accent rounded-lg"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Grid ── */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── View More / Show Less ── */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <AnimatePresence mode="wait">
            {hasMore && (
              <motion.button
                key="view-more"
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}
                whileTap={{ scale: 0.97 }}
                onClick={handleShowMore}
                disabled={isCollapsing}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white text-sm font-display font-semibold hover:bg-accent-dark transition-all shadow-lg shadow-accent/20"
              >
                <span>View More Projects</span>
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronDown size={16} />
                </motion.span>
                <motion.span
                  key={allFiltered.length - visibleCount}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-xs font-mono"
                >
                  +{Math.min(REVEAL_COUNT, allFiltered.length - visibleCount)}
                </motion.span>
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {hasExtra && !hasMore && (
              <motion.button
                key="show-less"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleShowLess}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-paper-muted dark:border-ink-muted text-sm font-display font-medium text-ink/60 dark:text-paper/60 hover:border-accent/50 hover:text-accent transition-colors"
              >
                <ChevronUp size={15} />
                Show Less
              </motion.button>
            )}
            {hasExtra && hasMore && (
              <motion.button
                key="show-less-mid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleShowLess}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-ink/35 dark:text-paper/35 hover:text-accent transition-colors"
              >
                <ChevronUp size={12} />
                Collapse
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* ── GitHub CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-14 text-center"
        >
          <p className="font-body text-ink/50 dark:text-paper/50 text-sm mb-4">
            More projects on GitHub
          </p>
          <motion.a
            href="https://github.com/minulisilva"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-ink/15 dark:border-paper/15 text-sm font-display font-medium text-ink/70 dark:text-paper/70 hover:border-accent/50 hover:text-accent transition-all"
          >
            <Code2 size={16} />
            View GitHub Profile
          </motion.a>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}