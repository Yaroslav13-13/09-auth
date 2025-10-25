import axios from "axios";
import { cookies } from "next/headers";
import type { AxiosResponse } from "axios";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { NotesResponse } from "./clientApi";

/* ===================== SERVER API INSTANCE ===================== */
const serverApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
    "https://notehub-api.goit.study",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===================== USERS ===================== */
export const getMeServer = async (): Promise<User> => {
  const cookieStore = await cookies();

  const res = await serverApi.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
};

/* ===================== AUTH (SESSION) ===================== */
export const checkSessionServer = async (): Promise<
  AxiosResponse<{ user: User }>
> => {
  const cookieStore = await cookies();

  const res = await serverApi.get("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
  return res;
};

/* ===================== NOTES ===================== */
export const fetchNotesServer = async ({
  search,
  page,
  tag,
}: {
  search: string;
  page: number;
  tag?: string;
}): Promise<NotesResponse> => {
  const cookieStore = await cookies();

  const res = await serverApi.get<NotesResponse>("/notes", {
    params: { search, page, tag },
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const res = await serverApi.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
};
