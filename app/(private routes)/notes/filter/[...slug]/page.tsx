import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { fetchNotes } from "@/lib/api";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";
import type { NoteTag } from "@/types/note";
import type { Metadata } from "next";

interface FilteredNotesPageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({
  params,
}: FilteredNotesPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] ?? "All";
  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);

  return {
    title: `${capitalizedTag} Notes | NoteHub`,
    description: `View and manage your ${capitalizedTag} notes easily in NoteHub.`,
    openGraph: {
      title: `${capitalizedTag} Notes | NoteHub`,
      description: `Browse your ${capitalizedTag} category in NoteHub.`,
      url: `https://notehub.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub filtered notes",
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const resolvedParams = await params;
  const tag = (resolvedParams.slug?.[0] ?? "All") as NoteTag | "All";
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, tag !== "All" ? tag : undefined],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        tag: tag !== "All" ? tag : undefined,
      }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
