"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import Loader from "@/components/Loader/Loader";
import { FiTag, FiCalendar, FiX } from "react-icons/fi";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  noteId: string;
}

const NotePreview: React.FC<NotePreviewProps> = ({ noteId }) => {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note, Error>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;
  if (isError || !note) return <p>Something went wrong.</p>;

  const closeModal = () => router.back();

  return (
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={closeModal}
          className={css.closeButton}
          aria-label="Close details"
          title="Close"
        >
          <FiX size={22} />
        </button>

        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>

        <div className={css.infoBox}>
          {note.tag && (
            <span className={css.tag}>
              <FiTag /> {note.tag}
            </span>
          )}
          <p className={css.date}>
            <FiCalendar /> {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotePreview;
