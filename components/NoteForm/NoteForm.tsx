"use client";

import React, { useEffect, useState } from "react";
import css from "./NoteForm.module.css";
import { createNote, type CreateNotePayload } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import { useRouter } from "next/navigation";
import { useNoteStore, initialDraft } from "@/lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NoteFormProps {
  onCancel?: () => void;
}

const noteTags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm({ onCancel }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const draft = useNoteStore((s) => s.draft);
  const setDraft = useNoteStore((s) => s.setDraft);
  const clearDraft = useNoteStore((s) => s.clearDraft);

  const [form, setForm] = useState({
    title: draft?.title ?? initialDraft.title,
    content: draft?.content ?? initialDraft.content,
    tag: (draft?.tag as NoteTag) ?? initialDraft.tag,
  });

  useEffect(() => {
    setForm({
      title: draft?.title ?? initialDraft.title,
      content: draft?.content ?? initialDraft.content,
      tag: (draft?.tag as NoteTag) ?? initialDraft.tag,
    });
  }, [draft]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      setDraft({ [name]: value } as Partial<typeof next>);
      return next;
    });
  };

  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (payload: CreateNotePayload) => createNote(payload),
    onSuccess: async () => {
      clearDraft();

      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.back();
    },
    onError: (err: unknown) => {
      setError(err instanceof Error ? err.message : "Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.title || form.title.trim().length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }

    const payload: CreateNotePayload = {
      title: form.title.trim(),
      content: form.content?.trim() || "",
      tag: form.tag,
    };

    mutation.mutate(payload);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else router.back();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.formGroup}>
        Title
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className={css.input}
          placeholder="Enter title"
        />
      </label>

      <label className={css.formGroup}>
        Content
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          className={css.textarea}
          placeholder="Enter content (optional)"
          rows={6}
        />
      </label>

      <label className={css.formGroup}>
        Tag
        <select
          name="tag"
          value={form.tag}
          onChange={handleChange}
          className={css.select}
        >
          {noteTags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      {error && <div className={css.error}>{error}</div>}

      <div className={css.actions}>
        <button
          type="button"
          onClick={handleCancel}
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={mutation.isPending}
          className={css.submitButton}
        >
          {mutation.isPending ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
}
