"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

/* ─── Button Variants ────────────────────────────────────────────────────── */
type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

type ButtonProps = BaseProps &
  (
    | ({ as?: "button" } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ as: "a" } & AnchorHTMLAttributes<HTMLAnchorElement>)
  );

const variantClasses: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-dark font-semibold border border-transparent",
  secondary:
    "bg-transparent text-ink dark:text-paper border border-ink/20 dark:border-paper/20 hover:border-ink/50 dark:hover:border-paper/50",
  ghost:
    "bg-transparent text-ink/70 dark:text-paper/70 hover:text-ink dark:hover:text-paper border border-transparent",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-7 py-3.5 text-base rounded-xl gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  icon,
  iconPosition = "left",
  as,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-display transition-all duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const inner = (
    <>
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </>
  );

  if (as === "a") {
    return (
      <motion.a
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={classes}
        {...(props as any)}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {inner}
    </motion.button>
  );
}
