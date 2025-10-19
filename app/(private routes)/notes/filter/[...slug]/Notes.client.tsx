"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, type NotesResponse } from "@/lib/api";
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
  tag: NoteTag | "All";
}

type NotificationType = "success" | "error";

const NotesClient: React.FC<NotesClientProps> = ({ tag }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationType, setNotificationType] =
    useState<NotificationType>("success");

  const safeTag: NoteTag | undefined =
    tag !== "All" ? (tag as NoteTag) : undefined;

  const { data, isLoading, isError } = useQuery<NotesResponse, Error>({
    queryKey: ["notes", page, safeTag, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch || undefined,
        tag: safeTag,
      }),
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages: number = data?.totalPages ?? 0;

  useEffect(() => setPage(1), [tag, debouncedSearch]);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 2500);
    return () => clearTimeout(timer);
  }, [notification]);

  useEffect(() => {
    if (
      !isLoading &&
      !isError &&
      (debouncedSearch || tag) &&
      notes.length === 0
    ) {
      setNotification("No notes found");
      setNotificationType("error");
    }
  }, [isLoading, isError, notes.length, debouncedSearch, tag]);

  return (
    <div>
      <div className={css.searchbox}>
        <SearchBox value={search} onChange={setSearch} />
        <Link href="/notes/action/create" className={css.button}>
          + Create note
        </Link>
      </div>

      {isLoading && <Loader />}
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
