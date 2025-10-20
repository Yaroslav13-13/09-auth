// import { create } from "zustand";

// export type UserState = {
//   email: string;
//   username: string;
//   avatar?: string;
// } | null;

// type AuthStore = {
//   user: UserState;
//   isAuthenticated: boolean;
//   setUser: (user: UserState) => void;
//   clearIsAuthenticated: () => void;
// };

// export const useAuthStore = create<AuthStore>()((set) => ({
//   user: null,
//   isAuthenticated: false,
//   setUser: (user) => set({ user, isAuthenticated: !!user }),
//   clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
// }));

import { create } from "zustand";
import { User } from "../../types/user";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: User) => set({ user, isAuthenticated: true }),
  clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
}));
