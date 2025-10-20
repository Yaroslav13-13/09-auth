// import type { Metadata } from "next";
// import CreateNoteClient from "./CreateNote.client";
// import css from "./CreateNote.module.css";

// export const metadata: Metadata = {
//   title: "Create Note | NoteHub",
//   description: "Create a new note in NoteHub and manage your ideas easily.",
//   openGraph: {
//     title: "Create Note | NoteHub",
//     description: "Add a new note to your collection with NoteHub.",
//     url: "https://notehub.app/notes/action/create",
//     images: [
//       {
//         url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
//         width: 1200,
//         height: 630,
//         alt: "NoteHub create note",
//       },
//     ],
//   },
// };

// export default function CreateNotePage() {
//   return (
//     <main className={css.main}>
//       <div className={css.container}>
//         <h1 className={css.title}>Create note</h1>
//         <CreateNoteClient />
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api/clientApi";
import css from "./CreateNote.module.css";

export default function CreateNotePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !tag) {
      setError("Title and Tag are required");
      return;
    }
    try {
      await createNote({ title, content, tag });
      router.push("/notes");
    } catch {
      setError("Failed to create note");
    }
  };

  const handleCancel = () => router.push("/notes");

  return (
    <main className={css.mainContent}>
      <div className={css.noteCard}>
        <h1 className={css.formTitle}>Create Note</h1>
        <form className={css.noteForm} onSubmit={handleSave}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              className={css.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              className={css.textarea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <input
              id="tag"
              type="text"
              className={css.input}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              required
            />
          </div>
          {error && <p className={css.error}>{error}</p>}
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
