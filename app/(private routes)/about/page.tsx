import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About NoteHub",
  description:
    "Learn more about NoteHub — a modern note-taking application built with Next.js.",
  openGraph: {
    title: "About NoteHub",
    description: "Learn more about NoteHub — your note organization tool.",
    url: "https://notehub.app/about",
    siteName: "NoteHub",
  },
};

export default function AboutPage() {
  return (
    <main style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>About NoteHub</h1>
      <p>
        NoteHub helps you organize your ideas easily with modern technology.
      </p>
    </main>
  );
}
