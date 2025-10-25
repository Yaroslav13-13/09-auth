import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "/api" // ✅ локально піде через проксі (rewrites)
    : process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
      "https://notehub-api.goit.study"; // ✅ на Vercel

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
