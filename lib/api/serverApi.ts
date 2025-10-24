import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

/* ===================== NOTES ===================== */
export async function fetchNotesServer(
  params?: { page?: number; perPage?: number; search?: string; tag?: string },
  cookieHeader?: string
): Promise<Note[]> {
  const qs = new URLSearchParams();
  if (params?.page) qs.set("page", String(params.page));
  if (params?.perPage) qs.set("perPage", String(params.perPage));
  if (params?.search) qs.set("search", params.search);
  if (params?.tag) qs.set("tag", params.tag);

  const { data } = await api.get<Note[]>(`/notes?${qs.toString()}`, {
    headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
  });
  return data;
}

export async function fetchNoteByIdServer(
  id: string,
  cookieHeader?: string
): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
  });
  return data;
}

/* ===================== USERS ===================== */
export async function getMeServer(cookieHeader?: string): Promise<User> {
  const { data } = await api.get<User>(`/users/me`, {
    headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
  });
  return data;
}

export async function checkSessionServer(
  cookieHeader?: string
): Promise<User | null> {
  try {
    const { data } = await api.get<User>(`/auth/session`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    });
    return data;
  } catch {
    return null;
  }
}
