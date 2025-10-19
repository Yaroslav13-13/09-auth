import { fetchNoteById } from "@/lib/api";
import type { Metadata } from "next";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const note = await fetchNoteById(id);
    const short = note.content ? note.content.slice(0, 140) : "";
    return {
      title: `${note.title} | NoteHub`,
      description: short ? `${short}...` : "Note details in NoteHub",
      openGraph: {
        title: `${note.title} | NoteHub`,
        description: short ? `${short}...` : "Note details in NoteHub",
        url: `https://notehub.app/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub note details",
          },
        ],
      },
    };
  } catch (error) {
    console.error("Failed to fetch note:", error);
    return {
      title: `Note | NoteHub`,
      description: "Note details",
      openGraph: {
        title: `Note | NoteHub`,
        description: "Note details",
        url: `https://notehub.app/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub note",
          },
        ],
      },
    };
  }
}

export default async function NotePage() {
  // Залишаю місце для клієнтського компонента
  return null;
}
