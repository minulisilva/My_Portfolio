"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  Code2, Smartphone, Server, Paintbrush, ShoppingCart,
  Shield, ArrowUpRight, Sparkles, Check,
} from "lucide-react";
import SectionWrapper, { SectionLabel, SectionTitle } from "@/components/SectionWrapper";

/* ─── Types ─────────── */
interface Service {
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  gradient: string;
  iconBg: string;
  border: string;
  glow: string;
}

/* ─── Data ─────── */
const SERVICES: Service[] = [
  {
    icon: Code2,
    title: "Web Development",
    tagline: "Modern & responsive websites",
    description: "I build fast, responsive, and modern websites using React, Next.js, and TypeScript with a focus on performance and user experience.",
    features: ["React / Next.js", "TypeScript", "Responsive UI", "Performance Optimized"],
    gradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
    iconBg: "bg-blue-500/10",
    border: "hover:border-blue-500/40",
    glow: "group-hover:shadow-blue-500/10",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    tagline: "Cross-platform apps",
    description: "I develop mobile applications with smooth performance and clean UI for both Android and iOS platforms.",
    features: ["React Native / Flutter", "API Integration", "UI Optimization", "Cross-platform"],
    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    iconBg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
    glow: "group-hover:shadow-emerald-500/10",
  },
  {
    icon: Server,
    title: "Software Development",
    tagline: "Custom software solutions",
    description: "I create scalable and efficient software solutions tailored to business needs with clean architecture and strong performance.",
    features: ["System Design", "Database Management", "API Development", "Scalable Architecture"],
    gradient: "from-violet-500/10 via-purple-500/5 to-transparent",
    iconBg: "bg-violet-500/10",
    border: "hover:border-violet-500/40",
    glow: "group-hover:shadow-violet-500/10",
  },
  {
    icon: Paintbrush,
    title: "UI / UX Design",
    tagline: "Clean & user-friendly design",
    description: "I design modern, intuitive, and user-focused interfaces that improve usability and deliver great user experiences.",
    features: ["Figma", "Wireframing", "Prototyping", "User Experience Design"],
    gradient: "from-yellow-500/10 via-rose-500/5 to-transparent",
    iconBg: "bg-yellow-500/10",
    border: "hover:border-yellow-500/40",
    glow: "group-hover:shadow-yellow-500/10",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    tagline: "Online stores that sell",
    description: "I build complete e-commerce platforms with secure payments, product management, and modern shopping experiences.",
    features: ["Stripe Integration", "Product Management", "Admin Panel", "Analytics"],
    gradient: "from-orange-500/10 via-amber-500/5 to-transparent",
    iconBg: "bg-orange-500/10",
    border: "hover:border-orange-500/40",
    glow: "group-hover:shadow-orange-500/10",
  },
  {
    icon: Shield,
    title: "Performance & SEO",
    tagline: "Fast & optimized websites",
    description: "I optimize websites for speed, SEO, and performance to ensure better ranking and user experience.",
    features: ["Core Web Vitals", "SEO Optimization", "Lighthouse 90+", "Speed Optimization"],
    gradient: "from-accent/10 via-accent/5 to-transparent",
    iconBg: "bg-accent/10",
    border: "hover:border-accent/40",
    glow: "group-hover:shadow-accent/10",
  },
];

const STATS = [
  { value: "10+", label: "Projects delivered" },
  { value: "1+", label: "Years experience" },
  { value: "100%", label: "Client satisfaction" },
  { value: "24h", label: "Response time" },
];

/* ─── Variants ───────────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── 3D Tilt Card ───────────────────────────────────────────────────────── */
function TiltCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const Icon = service.icon;

  return (
    <motion.div variants={cardVariants} style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative group h-full card-base p-6 cursor-default overflow-hidden transition-all duration-300 ${service.border} ${hovered ? `shadow-2xl ${service.glow}` : ""}`}
      >
        {/* gradient blob */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl`}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* shimmer */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* corner accent that grows on hover */}
        <motion.div
          className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-accent/10"
          animate={{ scale: hovered ? 1.4 : 1, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* icon */}
        <motion.div
          className={`relative z-10 w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center mb-5`}
          animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 8 : 0 }}
          transition={{ duration: 0.35, ease: "backOut" }}
          style={{ transformStyle: "preserve-3d", translateZ: 20 }}
        >
          <Icon size={22} className="text-accent" />
        </motion.div>

        <div className="relative z-10" style={{ transformStyle: "preserve-3d" }}>
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-1">
            {service.tagline}
          </p>
          <h3 className="font-display font-bold text-lg text-ink dark:text-paper mb-3 flex items-center gap-2">
            {service.title}
            <motion.span
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight size={16} className="text-accent" />
            </motion.span>
          </h3>
          <p className="font-body text-sm text-ink dark:text-paper leading-relaxed mb-5">
            {service.description}
          </p>

          {/* feature list — slide-reveal */}
          <ul className="space-y-2">
            {service.features.map((feature, i) => (
              <motion.li
                key={feature}
                className="flex items-center gap-2 text-sm font-body text-ink/85 dark:text-paper/65"
                animate={{ opacity: hovered ? 1 : 0.7, x: hovered ? 0 : -4 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
              >
                <motion.span
                  className="w-4 h-4 rounded-full bg-accent/15 flex items-center justify-center shrink-0"
                  animate={{ scale: hovered ? [1, 1.25, 1] : 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Check size={10} className="text-accent" />
                </motion.span>
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
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

/* ─── Animated counter ───────────────────────────────────────────────────── */
function AnimatedStat({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const numericMatch = stat.value.match(/(\d+)/);
  const numeric = numericMatch ? parseInt(numericMatch[1], 10) : null;
  const suffix = stat.value.replace(/^\d+/, "");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="card-base p-5 text-center hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 relative overflow-hidden group"
    >
      {/* sweep on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

      <p className="font-display font-bold text-3xl text-accent mb-1 relative z-10">
        {numeric !== null ? (
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 + index * 0.08 }}
          >
            <CountUp target={numeric} />
            {suffix}
          </motion.span>
        ) : (
          stat.value
        )}
      </p>
      <p className="text-xs font-body text-ink/55 dark:text-paper/55 relative z-10">
        {stat.label}
      </p>
    </motion.div>
  );
}

/* ─── Simple count-up number ─────────────────────────────────────────────── */
function CountUp({ target }: { target: number }) {
  const [value, setValue] = useState(0);

  return (
    <motion.span
      onViewportEnter={() => {
        const duration = 800;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setValue(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(tick);
          else setValue(target);
        };
        requestAnimationFrame(tick);
      }}
      viewport={{ once: false, amount: 0.5 }}
    >
      {value}
    </motion.span>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function ServicesSection() {
  return (
    <SectionWrapper id="services" className="relative overflow-hidden">

      <Orb className="w-96 h-96 bg-accent top-0 -left-32" />
      <Orb className="w-80 h-80 bg-blue-500 bottom-20 -right-20" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Heading ── */}
        <motion.div
          className="max-w-2xl mb-6"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionLabel>Services</SectionLabel>
          <SectionTitle>
            What I{" "}
            <span className="gradient-text">bring to the table</span>
          </SectionTitle>
          <p className="mt-4 font-body text-ink/60 dark:text-paper/60 leading-relaxed">
            From design to deployment — I cover the full stack. Here&apos;s how I can help
            you build something great.
          </p>
        </motion.div>

        {/* ── Sparkle badge — pulses gently ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.15, duration: 0.4, type: "spring" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm font-mono text-accent mb-12"
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <Sparkles size={12} />
          </motion.span>
          Available for freelance &amp; full-time roles
        </motion.div>

        {/* ── Services Grid ── */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.05 }}
        >
          {SERVICES.map((service, i) => (
            <TiltCard key={service.title} service={service} index={i} />
          ))}
        </motion.div>

        {/* ── Stats Row ── */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 text-center"
        >
          <p className="font-body text-ink/50 dark:text-paper/50 text-sm mb-4">
            Have a project in mind?
          </p>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-accent text-white font-display font-semibold text-sm hover:bg-accent-dark transition-colors overflow-hidden group"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
            >
              <Sparkles size={15} />
            </motion.span>
            Let&apos;s work together
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUpRight size={15} />
            </motion.span>
          </motion.a>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}