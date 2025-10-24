import axios from "axios";

export const api = axios.create({
  baseURL: "/api", // 👈 усі клієнтські запити підуть через Next API
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
