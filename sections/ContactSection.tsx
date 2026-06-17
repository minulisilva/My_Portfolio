"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Github, Linkedin, Twitter, Mail, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import SectionWrapper, { SectionLabel, SectionTitle } from "@/components/SectionWrapper";
import Button from "@/components/Button";

/* ─── Social Links ─── */
const SOCIAL_LINKS = [
  { icon: Github, label: "GitHub", href: "https://github.com/minulisilva", handle: "@minulisilva" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/minuli-de-silva", handle: "in/minuli-de-silva" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/minulisilva", handle: "@minulisilva" },
  { icon: Mail, label: "Email", href: "mailto:minulidesilva2003@gmail.com", handle: "minulidesilva2003@gmail.com" },
];

/* ─── Form State ─────────────────────────────────────────────────────────── */
interface FormData { name: string; email: string; message: string; }
interface FormErrors { name?: string; email?: string; message?: string; }
type Status = "idle" | "loading" | "success" | "error";

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email.";
  if (!data.message.trim()) errors.message = "Message is required.";
  else if (data.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
  return errors;
}

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setServerMessage(data.message);
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setServerMessage(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setServerMessage("Network error. Please try again.");
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-xl bg-paper dark:bg-ink border text-sm font-body text-ink dark:text-paper placeholder-ink/30 dark:placeholder-paper/30 outline-none transition-all duration-200 ${
      errors[field]
        ? "border-red-400 focus:border-red-400"
        : "border-paper-muted dark:border-ink-muted focus:border-accent"
    }`;

  return (
    <SectionWrapper id="contact">
      <div className="max-w-7xl mx-auto">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-14"
        >
          <SectionLabel>Contact</SectionLabel>
          <SectionTitle>
            Let&apos;s work{" "}
            <span className="gradient-text">together</span>
          </SectionTitle>
          <p className="mt-4 font-body text-ink/60 dark:text-paper leading-relaxed">
            I&apos;m currently open to new opportunities. Whether you have a project idea,
            a question, or just want to say hi — my inbox is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="card-base p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-14 h-14 rounded-full bg-green-400/15 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle size={28} className="text-green-400" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-display font-bold text-xl text-ink dark:text-paper mb-2"
                  >
                    Message sent!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-body text-ink/60 dark:text-paper/60 text-sm mb-6"
                  >
                    {serverMessage}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button variant="secondary" size="md" onClick={() => setStatus("idle")}>
                      Send another
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-4"
                >
                  {/* Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.05 }}
                  >
                    <label className="block text-xs font-mono text-ink dark:text-paper uppercase tracking-widest mb-1.5">
                      Name
                    </label>
                    <motion.input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your name"
                      className={inputClass("name")}
                      animate={{ scale: focusedField === "name" ? 1.01 : 1 }}
                      transition={{ duration: 0.15 }}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-1 text-xs text-red-400 font-body overflow-hidden"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-xs font-mono text-ink dark:text-paper uppercase tracking-widest mb-1.5">
                      Email
                    </label>
                    <motion.input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="youremail@example.com"
                      className={inputClass("email")}
                      animate={{ scale: focusedField === "email" ? 1.01 : 1 }}
                      transition={{ duration: 0.15 }}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-1 text-xs text-red-400 font-body overflow-hidden"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.15 }}
                  >
                    <label className="block text-xs font-mono text-ink dark:text-paper uppercase tracking-widest mb-1.5">
                      Message
                    </label>
                    <motion.textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      rows={5}
                      placeholder="Tell me about your project..."
                      className={`${inputClass("message")} resize-none`}
                      animate={{ scale: focusedField === "message" ? 1.01 : 1 }}
                      transition={{ duration: 0.15 }}
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-1 text-xs text-red-400 font-body overflow-hidden"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Error banner */}
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -8 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-400/10 border border-red-400/20 text-red-400 text-sm font-body overflow-hidden"
                      >
                        <AlertCircle size={15} className="shrink-0" />
                        {serverMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      icon={
                        status === "loading" ? (
                          <motion.svg
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            width="16" height="16" viewBox="0 0 24 24" fill="none"
                          >
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" />
                          </motion.svg>
                        ) : (
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Send size={15} />
                          </motion.span>
                        )
                      }
                      iconPosition="right"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? "Sending..." : "Send Message"}
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Social Links ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <p className="text-xs font-mono text-ink/40 dark:text-paper/40 uppercase tracking-widest mb-6">
              Or reach out directly
            </p>
            {SOCIAL_LINKS.map(({ icon: Icon, label, href, handle }, i) => (
              <motion.a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16, x: 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="flex items-center gap-4 p-4 card-base dark:bg-ink hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 group relative overflow-hidden"
              >
                {/* shimmer sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative z-10 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors"
                >
                  <Icon size={18} className="text-accent" />
                </motion.div>
                <div className="relative z-10 flex-1">
                  <p className="text-xs font-mono text-ink/40 dark:text-paper/40 uppercase tracking-widest mb-0.5">
                    {label}
                  </p>
                  <p className="font-body font-medium text-sm text-ink dark:text-paper">{handle}</p>
                </div>
                <motion.div
                  className="relative z-10 text-accent"
                  initial={{ opacity: 0, x: -6 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={14} />
                </motion.div>
              </motion.a>
            ))}

            {/* Availability note */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="dark:bg-ink mt-6 p-4 rounded-xl bg-accent/8 border border-accent/20"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-accent uppercase tracking-widest">
                  Available
                </span>
              </div>
              <p className="text-sm font-body text-ink/65 dark:text-paper/65">
                Open to full-time roles and interesting freelance projects.
                Typical response time: 24 hours.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}