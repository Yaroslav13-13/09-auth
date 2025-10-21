// export interface Note {
//   id: string;
//   title: string;
//   content?: string;
//   tag: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface User {
//   email: string;
//   username: string;
//   avatar?: string;
// }

// /* ===================== UNIVERSAL FETCH ===================== */
// async function apiFetch<T>(path: string, opts: RequestInit = {}): Promise<T> {
//   const res = await fetch(path, { credentials: "include", ...opts });
//   const text = await res.text();

//   let data: unknown;
//   try {
//     data = text ? JSON.parse(text) : null;
//   } catch {
//     data = text;
//   }

//   if (!res.ok) {
//     const message =
//       typeof data === "object" && data && "message" in data
//         ? ((data as { message?: string }).message ?? res.statusText)
//         : res.statusText;
//     throw new Error(message);
//   }

//   return data as T;
// }

// /* ===================== NOTES ===================== */
// export async function fetchNotes(params?: {
//   page?: number;
//   perPage?: number;
//   search?: string;
//   tag?: string;
// }): Promise<Note[]> {
//   const qs = new URLSearchParams();
//   if (params?.page) qs.set("page", String(params.page));
//   if (params?.perPage) qs.set("perPage", String(params.perPage));
//   if (params?.search) qs.set("search", params.search);
//   if (params?.tag) qs.set("tag", params.tag);
//   return apiFetch<Note[]>(`/api/notes?${qs.toString()}`);
// }

// export async function fetchNoteById(id: string): Promise<Note> {
//   return apiFetch<Note>(`/api/notes/${id}`);
// }

// export async function createNote(payload: {
//   title: string;
//   content?: string;
//   tag: string;
// }): Promise<Note> {
//   return apiFetch<Note>(`/api/notes`, {
//     method: "POST",
//     body: JSON.stringify(payload),
//     headers: { "Content-Type": "application/json" },
//   });
// }

// export async function deleteNote(id: string): Promise<{ message: string }> {
//   return apiFetch<{ message: string }>(`/api/notes/${id}`, {
//     method: "DELETE",
//   });
// }

// /* ===================== AUTH ===================== */
// export async function register(email: string, password: string): Promise<User> {
//   return apiFetch<User>(`/api/auth/register`, {
//     method: "POST",
//     body: JSON.stringify({ email, password }),
//     headers: { "Content-Type": "application/json" },
//   });
// }

// export async function login(email: string, password: string): Promise<User> {
//   return apiFetch<User>(`/api/auth/login`, {
//     method: "POST",
//     body: JSON.stringify({ email, password }),
//     headers: { "Content-Type": "application/json" },
//   });
// }

// export async function logout(): Promise<{ message: string }> {
//   return apiFetch<{ message: string }>(`/api/auth/logout`, { method: "POST" });
// }

// export async function checkSession(): Promise<User | null> {
//   try {
//     return await apiFetch<User>(`/api/auth/session`);
//   } catch {
//     return null;
//   }
// }

// /* ===================== USERS ===================== */
// export async function getMeClient(): Promise<User> {
//   return apiFetch<User>(`/api/users/me`);
// }

// export async function updateMeClient(payload: Partial<User>): Promise<User> {
//   return apiFetch<User>(`/api/users/me`, {
//     method: "PATCH",
//     body: JSON.stringify(payload),
//     headers: { "Content-Type": "application/json" },
//   });
// }

export interface Note {
  id: string;
  title: string;
  content?: string;
  tag: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  email: string;
  username: string;
  avatar?: string;
}

/* ===================== UNIVERSAL FETCH ===================== */
async function apiFetch<T>(
  path: string,
  opts: RequestInit = {}
): Promise<T | null> {
  const res = await fetch(path, { credentials: "include", ...opts });
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

    // Якщо 401 або 403 — повертаємо null замість помилки
    if (res.status === 401 || res.status === 403) {
      return null;
    }

    throw new Error(message);
  }

  return data as T;
}

/* ===================== NOTES ===================== */
export async function fetchNotes(params?: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}): Promise<Note[]> {
  const qs = new URLSearchParams();
  if (params?.page) qs.set("page", String(params.page));
  if (params?.perPage) qs.set("perPage", String(params.perPage));
  if (params?.search) qs.set("search", params.search);
  if (params?.tag) qs.set("tag", params.tag);
  return apiFetch<Note[]>(`/api/notes?${qs.toString()}`) || [];
}

export async function fetchNoteById(id: string): Promise<Note | null> {
  return apiFetch<Note>(`/api/notes/${id}`);
}

export async function createNote(payload: {
  title: string;
  content?: string;
  tag: string;
}): Promise<Note | null> {
  return apiFetch<Note>(`/api/notes`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
}

export async function deleteNote(
  id: string
): Promise<{ message: string } | null> {
  return apiFetch<{ message: string }>(`/api/notes/${id}`, {
    method: "DELETE",
  });
}

/* ===================== AUTH ===================== */
export async function register(
  email: string,
  password: string
): Promise<User | null> {
  return apiFetch<User>(`/api/auth/register`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
}

export async function login(
  email: string,
  password: string
): Promise<User | null> {
  return apiFetch<User>(`/api/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
}

export async function logout(): Promise<{ message: string } | null> {
  return apiFetch<{ message: string }>(`/api/auth/logout`, { method: "POST" });
}

export async function checkSession(): Promise<User | null> {
  return apiFetch<User>(`/api/auth/session`);
}

/* ===================== USERS ===================== */
export async function getMeClient(): Promise<User | null> {
  return apiFetch<User>(`/api/users/me`);
}

export async function updateMeClient(
  payload: Partial<User>
): Promise<User | null> {
  return apiFetch<User>(`/api/users/me`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
}
