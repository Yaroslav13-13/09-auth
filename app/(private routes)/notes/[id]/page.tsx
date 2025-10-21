import { fetchNoteById } from "@/lib/clientApi";
import type { Metadata } from "next";

interface NotePageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { id } = params;

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
      twitter: {
        card: "summary_large_image",
        title: `${note.title} | NoteHub`,
        description: short ? `${short}...` : "Note details in NoteHub",
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
      },
    };
  } catch {
    return {
      title: "Note | NoteHub",
      description: "Note details not available",
    };
  }
}

export default async function NotePage({ params }: NotePageProps) {
  const note = await fetchNoteById(params.id);

  return (
    <main style={{ padding: "40px" }}>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <p>
        <strong>Tag:</strong> {note.tag}
      </p>
    </main>
  );
}
