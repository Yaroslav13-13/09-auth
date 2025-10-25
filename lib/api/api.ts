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

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api" // повний шлях для серверних запитів
    : `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")}/api`;

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
