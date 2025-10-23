import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_API_URL;
if (!BASE) {
  console.warn("⚠️ NEXT_PUBLIC_API_URL is not defined");
}

export const api = axios.create({
  baseURL: `${BASE ?? "https://notehub-api.goit.study"}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
