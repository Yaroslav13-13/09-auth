import { create } from "zustand";
import { User } from "../../types/user";
import { logout as apiLogout } from "../../lib/api/clientApi"; // твій api logout

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: User) => set({ user, isAuthenticated: true }),
  clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
  logout: async () => {
    await apiLogout(); // виклик серверного logout
    set({ user: null, isAuthenticated: false });
  },
}));
