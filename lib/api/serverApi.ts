import { api } from "./api";
import type { Note, User } from "./clientApi";
import type { AxiosResponse } from "axios";

/* ===================== SERVER FETCH ===================== */
async function serverRequest<T>(
  url: string,
  cookieHeader?: string,
  config: object = {}
): Promise<AxiosResponse<T>> {
  return api.request<T>({
    url,
    withCredentials: true,
    headers: {
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      ...config,
    },
    ...config,
  });
}

/* ===================== NOTES ===================== */
export async function fetchNotesServer(
  params?: { page?: number; perPage?: number; search?: string; tag?: string },
  cookieHeader?: string
): Promise<AxiosResponse<Note[]>> {
  const qs = new URLSearchParams();
  if (params?.page) qs.set("page", String(params.page));
  if (params?.perPage) qs.set("perPage", String(params.perPage));
  if (params?.search) qs.set("search", params.search);
  if (params?.tag) qs.set("tag", params.tag);

  return serverRequest<Note[]>(`/api/notes?${qs.toString()}`, cookieHeader);
}

export async function fetchNoteByIdServer(
  id: string,
  cookieHeader?: string
): Promise<AxiosResponse<Note>> {
  return serverRequest<Note>(`/api/notes/${id}`, cookieHeader);
}

/* ===================== USERS ===================== */
export async function getMeServer(
  cookieHeader?: string
): Promise<AxiosResponse<User>> {
  return serverRequest<User>(`/api/users/me`, cookieHeader);
}

export async function checkSessionServer(
  cookieHeader?: string
): Promise<AxiosResponse<User> | null> {
  try {
    return await serverRequest<User>(`/api/auth/session`, cookieHeader);
  } catch {
    return null;
  }
}
