"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Calendar, Code2, Zap, Layers } from "lucide-react";
import SectionWrapper, { SectionLabel, SectionTitle } from "@/components/SectionWrapper";
import Button from "@/components/Button";

const DETAILS = [
  { icon: MapPin, label: "Location", value: "Kandy, Sri Lanka" },
  { icon: Mail, label: "Email", value: "minulidesilva2003@gmail.com", href: "mailto:minulidesilva2003@gmail.com" },
  /*{ icon: Phone, label: "Phone", value: "+94 75 204 2018", href: "tel:+94752042018" },*/
  { icon: Calendar, label: "Available", value: "Immediately" },
];

const STATS = [
  { icon: Code2, value: "8+", label: "Technologies Used" },
  { icon: Layers, value: "4+", label: "Full-Stack Systems Built" },
  { icon: Zap, value: "99%", label: "System Reliability" },
];

const floatTransition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

// once: false — animations replay every time section scrolls into view
const vp = { once: false, amount: 0.2 };

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <div className="max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: GIF + Details + Quote ── */}
          <div className="space-y-4 order-2 lg:order-1">

            {/* GIF — floats in from top-left */}
            <motion.div
              initial={{ opacity: 0, x: -50, y: -30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={vp}
              transition={{ ...floatTransition, delay: 0.05 }}
              className="bg-transparent overflow-hidden"
            >
              <div className="relative w-full flex justify-center items-center py-4 px-6">
                <img
                  src="/img/coding-girl.gif"
                  alt="Coding illustration"
                  className="w-80 h-80 object-contain rounded-xl"
                />
              </div>
            </motion.div>

            {/* Details grid — floats in from left */}
            <motion.div
              initial={{ opacity: 0, x: -60, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={vp}
              transition={{ ...floatTransition, delay: 0.15 }}
              className="card-base bg-paper-soft dark:bg-ink-soft p-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {DETAILS.map(({ icon: Icon, label, value, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.25 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-paper dark:bg-ink border border-paper dark:border-ink hover:border-accent/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={15} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-ink/40 dark:text-paper/40 uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a href={href} className="text-sm font-body font-medium text-ink dark:text-paper hover:text-accent transition-colors truncate block">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-body font-medium text-ink dark:text-paper">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quote card — floats in from below-left */}
            <motion.div
              initial={{ opacity: 0, x: -40, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ ...floatTransition, delay: 0.35 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-base dark:bg-ink-soft p-6 relative overflow-hidden hover:border-accent/50 transition-colors"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -top-4 -left-2 font-display font-bold text-8xl text-accent/30 select-none"
              >
                &ldquo;
              </motion.span>
              <p className="font-body text-ink/70 dark:text-paper/70 italic leading-relaxed relative z-10">
                First, solve the problem. Then, write the code.
              </p>
              <p className="mt-3 text-xs font-mono text-accent uppercase tracking-widest">
                — John Johnson
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT: Text content ── */}
          <motion.div
            initial={{ opacity: 0, x: 60, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={vp}
            transition={{ ...floatTransition, delay: 0.05 }}
            className="order-1 lg:order-2"
          >
            <SectionLabel>About Me</SectionLabel>
            <SectionTitle>
              Passionate about{" "}
              <span className="gradient-text">great software</span>
            </SectionTitle>

            <div className="mt-6 space-y-4 font-body text-ink/70 dark:text-paper/70 leading-relaxed">
              {[
                "I'm a Full Stack Developer with a passion for building modern, scalable web applications that combine performance, functionality, and great user experiences. I enjoy transforming ideas into reliable digital solutions through clean architecture, intuitive interfaces, and maintainable code.",
                "My experience includes developing applications with React, Next.js, TypeScript, Node.js, Express, and MySQL. I'm continuously expanding my knowledge of full-stack development, system design, and modern software engineering practices while focusing on creating practical, user-centered solutions.",
                "Beyond coding, I enjoy exploring emerging technologies, solving complex problems, and taking on new challenges that help me grow as a developer and engineer.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: 24, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 flex gap-8">
              {STATS.map(({ icon: Icon, value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="flex flex-col gap-1 cursor-default"
                >
                  <div className="flex items-center gap-1.5">
                    <Icon size={14} className="text-accent" />
                    <span className="font-display font-bold text-2xl text-ink dark:text-paper">{value}</span>
                  </div>
                  <span className="text-xs font-body text-ink/50 dark:text-paper/50">{label}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <Button as="a" href="/cv/my-cv.pdf" download="Minuli_De_Silva.pdf" variant="primary" size="lg">
                Download CV
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
}