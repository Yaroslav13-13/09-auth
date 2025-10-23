import axios from "axios";
import type { Note } from "../types/note";

const API_URL = process.env.NEXT_PUBLIC_NOTEHUB_API_URL;
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!API_URL || !token) {
  console.warn(
    "⚠️ Missing NEXT_PUBLIC_NOTEHUB_API_URL or NEXT_PUBLIC_NOTEHUB_TOKEN"
  );
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<NotesResponse> {
  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;
  if (tag && tag !== "All") params.tag = tag;

  const { data } = await api.get<NotesResponse>("/notes", {
    params,
    headers: { "Cache-Control": "no-cache" },
  });

  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: { "Cache-Control": "no-cache" },
  });
  return data;
}

export interface CreateNotePayload {
  title: string;
  content?: string;
  tag: string;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const { data } = await api.post<Note>("/notes", payload);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}
