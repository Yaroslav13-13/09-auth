import css from "./page.module.css";
import Link from "next/link";
import { FaBolt, FaLock, FaFolderOpen } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to NoteHub — your personal space to create, edit, and organize notes with ease. Simple, fast, and built with Next.js.",
  keywords: [
    "NoteHub",
    "note app",
    "create notes",
    "online notes",
    "Next.js",
    "React notes app",
  ],
  openGraph: {
    title: "NoteHub — Your Personal Notes Organizer",
    description:
      "Create and manage your notes effortlessly with NoteHub. Keep all your ideas in one place.",
    url: "https://notehub.app/",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Home Preview",
      },
    ],
  },
};

export default function Home() {
  return (
    <div className={css.app}>
      <main className={css.main}>
        {/* Hero Section */}
        <section className={css.hero}>
          <h1 className={css.title}>Boost Your Productivity with NoteHub</h1>
          <p className={css.subtitle}>
            The smartest way to create, organize and manage your notes — simple,
            fast and modern.
          </p>
          <div className={css.heroActions}>
            <Link href="/notes/filter/All" className={css.ctaButton}>
              Get Started
            </Link>
            <Link href="/about" className={css.secondaryButton}>
              Learn More
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className={css.features}>
          <div className={css.featureCard}>
            <FaBolt className={css.icon} />
            <h3>Lightning Fast</h3>
            <p>Experience instant note creation and browsing.</p>
          </div>
          <div className={css.featureCard}>
            <FaLock className={css.icon} />
            <h3>Secure</h3>
            <p>Your notes are encrypted and private by default.</p>
          </div>
          <div className={css.featureCard}>
            <FaFolderOpen className={css.icon} />
            <h3>Organized</h3>
            <p>Keep everything structured with smart categories.</p>
          </div>
        </section>

        {/* Why Us */}
        <section className={css.whyUs}>
          <h2>Why Choose NoteHub?</h2>
          <p>
            Unlike traditional note apps, NoteHub combines speed, design and
            security into one seamless experience.
          </p>
        </section>
      </main>
    </div>
  );
}
