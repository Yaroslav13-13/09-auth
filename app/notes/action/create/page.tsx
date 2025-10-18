import type { Metadata } from "next";
import CreateNoteClient from "./CreateNote.client";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Create a new note in NoteHub and manage your ideas easily.",
  openGraph: {
    title: "Create Note | NoteHub",
    description: "Add a new note to your collection with NoteHub.",
    url: "https://notehub.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub create note",
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <CreateNoteClient />
      </div>
    </main>
  );
}
