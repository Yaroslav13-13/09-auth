"use client";

import React from "react";
import Link from "next/link";
import styles from "./NoteCard.module.css";
import type { Note } from "@/types/note";

interface Props {
  note: Note;
  onDelete?: (id: string) => void;
}

const NoteCard: React.FC<Props> = ({ note, onDelete }) => {
  return (
    <li className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <h3 className={styles.title}>{note.title}</h3>
        </div>

        <p className={styles.preview}>
          {note.content
            ? note.content.length > 120
              ? note.content.slice(0, 120) + "..."
              : note.content
            : "No content"}
        </p>

        <div className={styles.controls}>
          <span className={styles.tag}>{note.tag ?? "Todo"}</span>

          <Link href={`/notes/${note.id}`} className={styles.view}>
            View Details
          </Link>

          <button
            type="button"
            className={styles.delete}
            onClick={() => onDelete && onDelete(note.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default NoteCard;
