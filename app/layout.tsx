import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Background3D from "@/components/Background3D";

/* ─── Metadata ── */
export const metadata: Metadata = {
  title: "Minuli De Silva — Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Next.js, Node.js and modern web technologies. Building fast, beautiful, and scalable digital experiences.",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  keywords: [
  "Full Stack Developer",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Portfolio",
  ],
  authors: [{ name: "Minuli De Silva" }],
  creator: "Minuli De Silva",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://minulidesilva.dev", 
    title: "Minuli De Silva — Full Stack Developer",
    description: "Building fast, beautiful, and scalable digital experiences.",
    siteName: "Minuli De Silva Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Minuli De Silva — Full Stack Developer",
    description: "Building fast, beautiful, and scalable digital experiences.",
    creator: "@minulisilva", 
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon fallback for all browsers */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body>
        <ThemeProvider>
          <Background3D />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
