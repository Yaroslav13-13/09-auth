import css from "./not-found.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | NoteHub",
  description: "The page you are looking for does not exist on NoteHub.",
  openGraph: {
    title: "404 — Page Not Found | NoteHub",
    description: "This page could not be found on NoteHub.",
    url: "https://notehub.app/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404",
      },
    ],
  },
};

export default function NotFoundPage() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
