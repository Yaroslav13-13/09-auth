"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchNotes,
  fetchNoteById,
  type NotesResponse,
} from "@/lib/api/clientApi";
import NoteList from "@/components/NoteList/NoteList";
import Loader from "@/components/Loader/Loader";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import Notification from "@/components/Notification/Notification";
import { useDebounce } from "use-debounce";
import css from "@/components/SearchBox/SearchBox.module.css";
import type { Note, NoteTag } from "@/types/note";

interface NotesClientProps {
  tag?: NoteTag | "All";
  id?: string;
}

type NotificationType = "success" | "error";

const NotesClient: React.FC<NotesClientProps> = ({ tag, id }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationType, setNotificationType] =
    useState<NotificationType>("success");

  const isSingleNote = Boolean(id);
  const safeTag: NoteTag | undefined =
    tag && tag !== "All" ? (tag as NoteTag) : undefined;

  // ---------- FETCH ----------
  const { data, isLoading, isError } = useQuery<NotesResponse | Note, Error>({
    queryKey: isSingleNote
      ? ["note", id]
      : ["notes", page, safeTag, debouncedSearch],
    queryFn: () =>
      isSingleNote
        ? fetchNoteById(id as string)
        : fetchNotes({
            page,
            perPage: 12,
            search: debouncedSearch || undefined,
            tag: safeTag,
          }),
  });

  // ---------- ЕФЕКТИ ----------
  useEffect(() => setPage(1), [tag, debouncedSearch]);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 2500);
    return () => clearTimeout(timer);
  }, [notification]);

  useEffect(() => {
    if (!isLoading && !isError && (debouncedSearch || tag)) {
      const notes = (data as NotesResponse)?.notes ?? [];
      if (!isSingleNote && notes.length === 0) {
        setNotification("No notes found");
        setNotificationType("error");
      }
    }
  }, [isLoading, isError, data, debouncedSearch, tag, isSingleNote]);

  // ---------- РЕНДЕР ----------
  if (isLoading) return <Loader />;

  if (isSingleNote) {
    const note = data as Note;
    if (isError || !note)
      return <p className={css.message}>Note not found or failed to load.</p>;

    return (
      <div className={css.singleNote}>
        <h1>{note.title}</h1>
        {note.content && <p>{note.content}</p>}
        {note.tag && <p>Tag: {note.tag}</p>}
      </div>
    );
  }

  const notes: Note[] = (data as NotesResponse)?.notes ?? [];
  const totalPages: number = (data as NotesResponse)?.totalPages ?? 0;

  return (
    <div>
      <div className={css.searchbox}>
        <SearchBox value={search} onChange={setSearch} />
        <Link href="/notes/action/create" className={css.button}>
          + Create note
        </Link>
      </div>

      {!isLoading && notes.length > 0 && <NoteList notes={notes} />}

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {notification && (
        <Notification
          message={notification}
          type={notificationType}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default NotesClient;
