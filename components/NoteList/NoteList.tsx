"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import css from "./NoteList.module.css";
import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Note, Error, string>({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <div className={css.cardInner}>
            <div className={css.cardFront}>
              <h2 className={css.title}>{note.title}</h2>
              <div className={css.greenTab}></div>
            </div>

            <div className={css.cardBack}>
              <p className={css.content}>{note.content}</p>

              <div className={css.footer}>
                {note.tag && <span className={css.tag}>{note.tag}</span>}
                <Link href={`/notes/${note.id}`} className={css.viewButton}>
                  View Details
                </Link>

                <button
                  className={css.button}
                  onClick={() => handleDelete(note.id)}
                  disabled={mutation.isPending}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
