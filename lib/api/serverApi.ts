import { cookies } from "next/headers";
import { api } from "./api";
import type { AxiosResponse } from "axios";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { NotesResponse } from "./clientApi";

/* ===================== USERS ===================== */
export const getMeServer = async (): Promise<User> => {
  const cookieStore = await cookies();

  const res = await api.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
};

/* ===================== AUTH (SESSION) ===================== */
export const checkSessionServer = async (): Promise<
  AxiosResponse<{ user: User }>
> => {
  const cookieStore = await cookies();

  const res = await api.get("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
  return res;
};

/* ===================== NOTES ===================== */
export const fetchNotesServer = async (
  search: string,
  page: number,
  tag?: string
): Promise<NotesResponse> => {
  const cookieStore = await cookies();

  const res = await api.get<NotesResponse>("/notes", {
    params: { search, page, tag },
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const res = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
};
