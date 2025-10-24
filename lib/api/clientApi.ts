import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

/* ===================== NOTES ===================== */
export const fetchNotes = async (params?: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}): Promise<Note[]> => {
  const { data } = await api.get<Note[]>("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (payload: {
  title: string;
  content?: string;
  tag: string;
}): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", payload);
  return data;
};

export const deleteNote = async (id: string): Promise<{ message: string }> => {
  const { data } = await api.delete<{ message: string }>(`/notes/${id}`);
  return data;
};

/* ===================== AUTH ===================== */
export const register = async (
  email: string,
  password: string
): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", { email, password });
  return data;
};

export const login = async (email: string, password: string): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", { email, password });
  return data;
};

export const logout = async (): Promise<{ message: string }> => {
  const { data } = await api.post<{ message: string }>("/auth/logout");
  return data;
};

export const checkSession = async (): Promise<User> => {
  const { data } = await api.get<User>("/auth/session");
  return data;
};

/* ===================== USERS ===================== */
export const getMeClient = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateMeClient = async (payload: Partial<User>): Promise<User> => {
  const { data } = await api.patch<User>("/users/me", payload);
  return data;
};
