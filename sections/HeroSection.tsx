"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import Button from "@/components/Button";
import Image from "next/image";

/* ─── Typing Roles ─── */
const ROLES = [
  "Software Engineer",
  "Full Stack Developer",
  "React Specialist",
  "Next.js Engineer",
  "UI/UX Enthusiast",
  "Open Source Contributor",
];

function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <span className="text-accent font-display font-bold">
      {displayed}
      <span className="animate-blink">|</span>
    </span>
  );
}

/* ─── Floating decorative blobs ─────────────────────────────────────── */
function Blob({ className }: { className: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
      animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -20, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-[72px]"
    >
      {/* ── Background Decorations ── */}
      <Blob className="w-96 h-96 bg-accent top-20 -right-20" />
      <Blob className="w-64 h-64 bg-accent/80 bottom-32 -left-16" />

      {/* ── Grid Pattern ── */}
      {/*<div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />*/}

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Text Content ── */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper-soft dark:bg-ink-soft border border-paper-muted dark:border-ink-muted text-sm font-mono text-ink/80 dark:text-paper/80 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for new opportunities
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-ink dark:text-paper mb-4"
            >
              Hi, I&apos;m{" "}
              <span className="relative">
                Minuli De Silva
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="absolute bottom-1 left-0 w-full h-[3px] bg-accent origin-left"
                />
              </span>
            </motion.h1>

            {/* Typing Role */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-display text-2xl md:text-3xl text-ink/70 dark:text-paper/70 mb-6 min-h-[2.5rem]"
            >
              <TypingText />
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="font-body text-base md:text-lg text-ink/55 dark:text-paper/80 max-w-md mb-8 leading-relaxed"
            >
              I craft fast, accessible, and pixel-perfect web experiences —
              from concept to deployment.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Button
                as="a"
                href="#contact"
                size="lg"
                variant="primary"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact Me
              </Button>
              <Button
                as="a"
                href="#projects"
                size="lg"
                variant="secondary"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Projects
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-4"
            >
              <span className="text-xs font-mono text-ink/60 dark:text-paper/70 uppercase tracking-widest">
                Find me on
              </span>
              <div className="flex gap-3">
                <a href="https://github.com/minulisilva" target="_blank" rel="noopener noreferrer"
                  className="text-ink/50 dark:text-paper/50 hover:text-ink dark:hover:text-paper transition-colors">
                  <GitHubIcon size={20} />
                </a>
                <a href="https://www.linkedin.com/in/minuli-de-silva" target="_blank" rel="noopener noreferrer"
                  className="text-ink/50 dark:text-paper/50 hover:text-ink dark:hover:text-paper transition-colors">
                  <LinkedInIcon size={20} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── Profile Image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border border-dashed border-accent/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 rounded-full border border-dashed border-accent/15"
              />

              {/* Profile Image container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px] rounded-full overflow-hidden border-4 border-accent/30 animate-float">
                <Image
                  src="/img/profile.jpg"
                  alt="Minuli De Silva"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Floating stats badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -left-14 top-1/3 bg-paper dark:bg-ink-soft border border-paper-muted dark:border-ink-muted rounded-xl px-4 py-3 shadow-lg"
              >
                <p className="font-display font-bold text-xl text-accent">1+</p>
                <p className="font-body text-xs text-ink/60 dark:text-paper/70">Years exp.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute -right-14 bottom-1/3 bg-paper dark:bg-ink-soft border border-paper-muted dark:border-ink-muted rounded-xl px-4 py-3 shadow-lg"
              >
                <p className="font-display font-bold text-xl text-accent">10+</p>
                <p className="font-body text-xs text-ink/60 dark:text-paper/70">Projects done</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Scroll Indicator ── */}
        <motion.button
          onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-ink/60 dark:text-paper/30 hover:text-ink/60 dark:hover:text-paper/60 transition-colors"
        >
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
