import { Note, User } from "./clientApi";

/* ===================== SERVER FETCH ===================== */
async function serverFetch<T>(
  url: string,
  cookieHeader?: string,
  init: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      ...(init.headers || {}),
    },
    credentials: "include",
  });

  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const message =
      typeof data === "object" && data && "message" in data
        ? ((data as { message?: string }).message ?? res.statusText)
        : res.statusText;
    throw new Error(message);
  }

  return data as T;
}

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
  return serverFetch<Note[]>(`/api/notes?${qs.toString()}`, cookieHeader);
}

export async function fetchNoteByIdServer(
  id: string,
  cookieHeader?: string
): Promise<Note> {
  return serverFetch<Note>(`/api/notes/${id}`, cookieHeader);
}

/* ===================== USERS ===================== */
export async function getMeServer(cookieHeader?: string): Promise<User> {
  return serverFetch<User>(`/api/users/me`, cookieHeader);
}

export async function checkSessionServer(
  cookieHeader?: string
): Promise<User | null> {
  try {
    return await serverFetch<User>(`/api/auth/session`, cookieHeader);
  } catch {
    return null;
  }
}
