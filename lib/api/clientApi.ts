import { api } from "./api";
import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

/* ===================== TYPES ===================== */
export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content?: string;
  tag: NoteTag;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateMeRequest {
  email: string;
  username: string;
}

interface CheckSessionResponse {
  success: boolean;
}

/* ===================== NOTES ===================== */
export const fetchNotes = async (params?: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}): Promise<NotesResponse> => {
  const { data } = await api.get<NotesResponse>("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", payload);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
/* ===================== AUTH ===================== */
export const register = async (body: RegisterRequest): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", body);
  return data;
};

export const login = async (body: LoginRequest): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", body, {
    withCredentials: true,
  });
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout", null, {
    withCredentials: true,
  });
};

export const checkSession = async (): Promise<boolean> => {
  try {
    const { data } = await api.get<CheckSessionResponse>("/auth/session", {
      withCredentials: true,
    });
    return data.success;
  } catch (err) {
    console.error("checkSession error:", err);
    return false;
  }
};

/* ===================== USERS ===================== */
export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me", {
    withCredentials: true,
  });
  return data;
};

export const updateMe = async (body: UpdateMeRequest): Promise<User> => {
  const { data } = await api.patch<User>("/users/me", body, {
    withCredentials: true,
  });
  return data;
};

export type { User } from "@/types/user";
export type { Note } from "@/types/note";
