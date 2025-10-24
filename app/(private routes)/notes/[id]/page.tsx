import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { fetchNoteByIdServer } from "@/lib/api/serverApi";
import NotesClient from "../filter/[...slug]/Notes.client";
import type { Metadata } from "next";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteByIdServer(id);
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
  } catch {
    return {
      title: "Note | NoteHub",
      description: "Note details not available",
    };
  }
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteByIdServer(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient id={id as string} />
    </HydrationBoundary>
  );
}
