export type Note = any;
export type User = any;

const json = async (res: Response) => {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
};

const apiFetch = async (path: string, opts: RequestInit = {}) => {
  const res = await fetch(path, { credentials: "include", ...opts });
  if (!res.ok) {
    const payload = await json(res);
    const err = new Error(
      payload?.message || res.statusText || "Request failed"
    );
    (err as any).payload = payload;
    throw err;
  }
  return json(res);
};

/* Notes */
export async function fetchNotes(params: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.perPage) qs.set("perPage", String(params.perPage));
  if (params.search) qs.set("search", params.search);
  if (params.tag) qs.set("tag", params.tag);
  return apiFetch(`/api/notes?${qs.toString()}`);
}

export async function fetchNoteById(id: string) {
  return apiFetch(`/api/notes/${id}`);
}

export async function createNote(payload: {
  title: string;
  content?: string;
  tag: string;
}) {
  return apiFetch(`/api/notes`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteNote(id: string) {
  return apiFetch(`/api/notes/${id}`, { method: "DELETE" });
}

/* Auth */
export async function register(email: string, password: string) {
  return apiFetch(`/api/auth/register`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
}

export async function login(email: string, password: string) {
  return apiFetch(`/api/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
}

export async function logout() {
  return apiFetch(`/api/auth/logout`, { method: "POST" });
}

export async function checkSession() {
  return apiFetch(`/api/auth/session`, { method: "GET" });
}

/* Users (via local /api/users/me -> proxy to real backend) */
export async function getMeClient() {
  return apiFetch(`/api/users/me`, { method: "GET" });
}

export async function updateMeClient(
  payload: Partial<{ email: string; username: string; avatar?: string }>
) {
  return apiFetch(`/api/users/me`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
}
