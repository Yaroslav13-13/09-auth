// import axios from "axios";

// const baseURL =
//   process.env.NODE_ENV === "development"
//     ? "/api"
//     : process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
//       "https://notehub-api.goit.study";

// export const api = axios.create({
//   baseURL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

import axios from "axios";

const isServer = typeof window === "undefined";

const baseURL = isServer
  ? process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") + "/api"
  : process.env.NODE_ENV === "development"
    ? "/api"
    : process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") + "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("🌐 API baseURL:", baseURL);
