import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreview from "./NotePreview.client";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export default async function NoteModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <TanStackProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreview noteId={id} />
      </HydrationBoundary>
    </TanStackProvider>
  );
}
