import { api } from "./api";
import type { AxiosResponse } from "axios";

export async function fetchNotesServer(
  params: { page?: number; perPage?: number; search?: string; tag?: string },
  cookieHeader?: string
) {
  const res: AxiosResponse = await api.get("/notes", {
    params,
    headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
  });
  return res.data;
}

export async function fetchNoteByIdServer(id: string, cookieHeader?: string) {
  const res: AxiosResponse = await api.get(`/notes/${id}`, {
    headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
  });
  return res.data;
}

export async function getMeServer(cookieHeader?: string) {
  const res: AxiosResponse = await api.get("/users/me", {
    headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
  });
  return res.data;
}

export async function checkSessionServer(cookieHeader?: string) {
  const res: AxiosResponse = await api.get("/auth/session", {
    headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
  });
  return res.data;
}
