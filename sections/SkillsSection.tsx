"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper, { SectionLabel, SectionTitle } from "@/components/SectionWrapper";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Skill {
  name: string;
  level: number;
  icon: string;
  color: string;
}

interface SkillGroup {
  category: string;
  label: string;
  description: string;
  skills: Skill[];
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "frontend",
    label: "🎨 Frontend",
    description: "UI & user experience",
    skills: [
      { name: "React",       level: 95, icon: "devicon-react-original colored",       color: "#61DAFB" },
      { name: "Next.js",     level: 90, icon: "devicon-nextjs-plain",                 color: "#888" },
      { name: "TailwindCSS", level: 92, icon: "devicon-tailwindcss-plain colored",    color: "#38BDF8" },
      { name: "Angular",     level: 80, icon: "devicon-angularjs-plain colored",      color: "#DD0031" },
      { name: "HTML5",       level: 97, icon: "devicon-html5-plain colored",          color: "#E34F26" },
      { name: "CSS3",        level: 95, icon: "devicon-css3-plain colored",           color: "#1572B6" },
    ],
  },
  {
    category: "backend",
    label: "⚙️ Backend",
    description: "Server-side & APIs",
    skills: [
      { name: "Node.js",     level: 88, icon: "devicon-nodejs-plain colored",         color: "#339933" },
      { name: "Express.js",  level: 82, icon: "devicon-express-original",             color: "#888" },
      { name: "Spring Boot", level: 75, icon: "devicon-spring-plain colored",         color: "#6DB33F" },
      { name: "PHP",         level: 90, icon: "devicon-php-plain colored",            color: "#777BB4" },
      { name: "Java",        level: 68, icon: "devicon-java-plain colored",           color: "#ED8B00" },
    ],
  },
  {
    category: "databases",
    label: "🗄️ Databases",
    description: "Data storage & queries",
    skills: [
      { name: "MySQL",       level: 95, icon: "devicon-mysql-plain colored",          color: "#4479A1" },
      { name: "MongoDB",     level: 78, icon: "devicon-mongodb-plain colored",        color: "#47A248" },
      { name: "Firebase",    level: 72, icon: "devicon-firebase-plain colored",       color: "#FFCA28" },
      { name: "PostgreSQL",  level: 68, icon: "devicon-postgresql-plain colored",     color: "#4169E1" },
    ],
  },
  {
    category: "mobile",
    label: "📱 Mobile",
    description: "Mobile development",
    skills: [
      { name: "Flutter",        level: 75, icon: "devicon-flutter-plain colored",       color: "#54C5F8" },
      { name: "Android Studio", level: 70, icon: "devicon-androidstudio-plain colored", color: "#3DDC84" },
      { name: "Kotlin",         level: 65, icon: "devicon-kotlin-plain colored",        color: "#7F52FF" },
      { name: "Dart",           level: 72, icon: "devicon-dart-plain colored",          color: "#0175C2" },
    ],
  },
  {
    category: "languages",
    label: "💻 Languages",
    description: "Programming languages I write code in",
    skills: [
      { name: "JavaScript", icon: "devicon-javascript-plain colored", color: "#F7DF1E", level: 90 },
      { name: "TypeScript", icon: "devicon-typescript-plain colored", color: "#3178C6", level: 80 },
      { name: "Python",     icon: "devicon-python-plain colored",     color: "#f3f71b", level: 60 },
      { name: "C++",      icon: "devicon-cplusplus-plain colored",      color: "#2681e3", level: 97 }
    ],
  },
];

const TOOLS = [
  { name: "Git",     level: 95, icon: "devicon-git-plain colored",              color: "#F05032" },
  { name: "GitHub",  level: 95, icon: "devicon-github-original",               color: "#888" },
  { name: "Docker",  level: 72, icon: "devicon-docker-plain colored",          color: "#2496ED" },
  { name: "Playwright",     level: 65, icon: "devicon-playwright-plain colored", color: "#2bff00" },
  { name: "Figma",   level: 78, icon: "devicon-figma-plain colored",           color: "#F24E1E" },
  { name: "VS Code", level: 97, icon: "devicon-vscode-plain colored",          color: "#007ACC" },
  { name: "IntelliJ IDEA",    level: 80, icon: "devicon-intellij-plain colored",  color: "#0052CC" },
  { name: "Illustrator", level: 70, icon: "devicon-illustrator-plain", color: "#888" },
  { name: "Postman", level: 65, icon: "devicon-postman-plain colored", color: "#F5794D" },
  { name: "Jira", level: 60, icon: "devicon-jira-plain colored", color: "#31A8FF" }
];

const CATEGORIES = [
  { key: "all",      label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend",  label: "Backend" },
  { key: "databases",label: "Databases" },
  { key: "mobile",   label: "Mobile" },
  { key: "tools",    label: "Tools" },
];

/* ─── Subtle animated progress bar ──────────────────────────────────────── */
function SkillBar({ level, color }: { level: number; color: string }) {
  return (
    <div className="w-full h-1 rounded-full bg-paper-muted dark:bg-ink-muted overflow-hidden mt-1.5">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color, opacity: 0.7 }}
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: false }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />
    </div>
  );
}

/* ─── Single skill card ──────────────────────────────────────────────────── */
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-paper dark:bg-ink border border-paper-muted dark:border-ink-muted hover:border-accent/30 transition-colors group cursor-default"
    >
      {/* icon */}
      <div className="w-10 h-10 flex items-center justify-center">
        <i className={`${skill.icon} text-3xl transition-all duration-300 group-hover:scale-110`} />
      </div>

      {/* name */}
      <p className="text-xs font-mono font-medium text-ink/80 dark:text-paper/80 text-center leading-tight">
        {skill.name}
      </p>

      {/* level bar */}
      <div className="w-full px-1">
        <SkillBar level={skill.level} color={skill.color} />
      </div>

      {/* level number — shows on hover */}
      <motion.p
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="text-xs font-mono text-accent"
      >
        {skill.level}%
      </motion.p>
    </motion.div>
  );
}

/* ─── Tool row badge ───────────────────────────────────────────────────── */
function ToolBadge({ tool, index }: { tool: typeof TOOLS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      className="flex items-center gap-2.5 px-3 py-5 rounded-xl bg-paper dark:bg-ink border border-paper-muted dark:border-ink-muted hover:border-accent/30 transition-colors cursor-default group"
    >
      <i className={`${tool.icon} text-3xl transition-transform duration-300 group-hover:scale-110`} />
      <div className="min-w-0">
        <p className="text-xs font-mono font-medium text-ink/80 dark:text-paper/80 leading-none mb-1.5">
          {tool.name}
        </p>
        <div className="w-12 h-1 rounded-full bg-paper-muted dark:bg-ink-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: tool.color, opacity: 0.7 }}
            initial={{ width: 0 }}
            whileInView={{ width: `${tool.level}%` }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const visibleGroups =
    activeCategory === "all"
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((g) => g.category === activeCategory);

  return (
    <SectionWrapper id="skills">

      {/* devicons via CDN */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
      />

      <div className="max-w-7xl mx-auto overflow-hidden">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-12 ml-auto text-right"
        >
          <div className="flex justify-end">
            <SectionLabel>Skills</SectionLabel>
          </div>
          <SectionTitle>
            My technical{" "}
            <span className="gradient-text">toolkit</span>
          </SectionTitle>
          <p className="mt-4 font-body text-ink/60 dark:text-paper/60 leading-relaxed">
            Technologies and tools I work with — always learning more.
          </p>
        </motion.div>

        {/* ── Category filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.key)}
              className={`relative px-4 py-2 rounded-lg text-xs font-mono ${
                activeCategory === cat.key
                  ? "text-white"
                  : "border border-paper-muted dark:border-ink-muted text-ink/70 dark:text-paper/70 hover:border-accent/60 hover:text-accent"
              }`}
            >
              {activeCategory === cat.key && (
                <motion.span
                  layoutId="skills-category-pill"
                  className="absolute inset-0 bg-accent rounded-lg"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}

              <span className="relative z-10">
                {cat.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* ── Skill group cards ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
              {visibleGroups.map((group, gi) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ delay: gi * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="card-base bg-paper dark:bg-ink p-5 hover:border-accent/60 transition-colors"
                >
                  {/* group header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-display font-bold text-lg text-ink dark:text-paper">
                        {group.label}
                      </h3>
                      <p className="text-sm font-body text-ink/55 dark:text-paper/45 mt-0.5">
                        {group.description}
                      </p>
                    </div>
                    <span className="text-sm font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-lg">
                      {group.skills.length} skills
                    </span>
                  </div>

                  {/* divider */}
                  <div className="h-px bg-paper-muted dark:bg-ink-muted mb-4" />

                  {/* skills grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {group.skills.map((skill, si) => (
                      <SkillCard key={skill.name} skill={skill} index={gi * 6 + si} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Tools section ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="card-base bg-paper dark:bg-ink p-5 hover:border-accent/60 transition-colors"
        >
          {/* header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-lg text-ink dark:text-paper">
                🔧 Tools
              </h3>
              <p className="text-sm font-body text-ink/55 dark:text-paper/45 mt-0.5">
                Tools I use for development
              </p>
            </div>
            <span className="text-sm font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-lg">
              {TOOLS.length} tools
            </span>
          </div>

          <div className="h-px bg-paper-muted dark:bg-ink-muted mb-4" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {TOOLS.map((tool, i) => (
              <ToolBadge key={tool.name} tool={tool} index={i} />
            ))}
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}