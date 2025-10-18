"use client";

import NoteForm from "@/components/NoteForm/NoteForm";

export default function CreateNoteClient() {
  const handleCancel = () => {
    window.history.back();
  };

  return <NoteForm onCancel={handleCancel} />;
}
